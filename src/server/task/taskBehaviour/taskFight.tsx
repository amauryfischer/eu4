import { ITaskFight, ITaskFlyingFleet, TaskType } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"
import { IFleet } from "@/type/data/IFleet"
import IShip from "@/type/data/IShip"
import UniverseService from "@/services/UniverseService"
import FleetService from "@/services/FleetService"
import IPirate from "@/type/data/IPirate"
import scheduleTask from "../scheduleTask"
import { IModuleType } from "@/services/ModulesService"
import _ from "lodash"
const taskFight = {
	onCreate: async (task: ITaskFight) => {
		return moment(task.endDate).toDate()
	},
	onDestroy: async (task: ITaskFight) => {
		const log = task.details.log || []
		const logMessage = (message: string) => {
			console.log(message)
			log.push(message)
		}

		logMessage("💥 Fight turn starting 💥")
		const fleets = (await db.fleet.findMany({
			where: {
				id: {
					in: task.details.fleetIds
				}
			}
		})) as unknown as Array<IFleet>
		const pirates = (await db.pirate.findMany({
			where: {
				id: { in: task.details.pirateIds }
			}
		})) as unknown as Array<IPirate>

		// make group of ennemies and allies
		// ! todo implement ally fight when same empire
		const groups = [...pirates, ...fleets]

		// filter out empty groups
		const nonEmptyGroups = groups.filter((group) => group.shipIds.length > 0)

		// build groups weapons
		const groupsWeapons = await Promise.all(
			nonEmptyGroups.map(async (group, index) => {
				return _.shuffle(
					_.flattenDeep(
						await Promise.all(
							group.shipIds.map(async (shipId) => {
								const ship = (await db.ship.findUnique({
									where: {
										id: shipId
									}
								})) as unknown as IShip
								const weapons = ship.modules.filter(
									(module) => module.type === IModuleType.WEAPON
								)
								return weapons.map((weapon) => {
									return {
										laser: weapon.modifier?.laser,
										precision: weapon.modifier?.precision,
										missile: weapon.modifier?.missile,
										ion: weapon.modifier?.ion,
										ship: ship,
										groupIndex: index
									}
								})
							})
						)
					)
				)
			})
		)
		// turn by turn weapon hit random ship of other group, weapons can hit once
		const destroyedShips: Array<string> = []
		while (_.flattenDeep(groupsWeapons).length > 0) {
			// randomize group order
			const groupOrder = _.shuffle(groups.map((group, index) => index))
			for (const groupIndexOrder of groupOrder) {
				// skip group if no weapons or invalid index
				if (
					!groupsWeapons[groupIndexOrder] ||
					groupsWeapons[groupIndexOrder].length === 0
				) {
					continue
				}
				const weapon = groupsWeapons[groupIndexOrder].pop()

				if (!weapon) {
					continue
				}
				// if weapong belong to a dead ship, skip
				if (destroyedShips.includes(weapon.ship.id)) {
					continue
				}
				const { laser, precision, missile, ship, groupIndex } = weapon
				// if ship is dead, skip
				if (ship.coque <= 0) {
					continue
				}
				const targetGroupIndex = _.shuffle(
					groupOrder.filter((index) => index !== groupIndexOrder)
				)[0]
				// randomize target ship
				const targetShipIndex = _.shuffle(
					groups[targetGroupIndex].shipIds.filter(
						(shipId) => !destroyedShips.includes(shipId)
					)
				)[0]
				if (!targetShipIndex) {
					console.log("💥 No target ship in group ", targetGroupIndex)
					continue
				}
				const targetShip = (await db.ship.findUnique({
					where: {
						id: targetShipIndex
					}
				})) as unknown as IShip
				// hit target ship
				// laser hit
				// precision hit
				if (!precision) {
					continue
				}
				const random = Math.random() * 100
				if (random < precision) {
					if (targetShip.shield > 0) {
						if (laser) {
							logMessage(
								`💥${ship.id} Laser hit ${targetShip.id} for ${laser * 1.5} shield`
							)
							targetShip.shield -= laser * 1.5
						}
						if (missile) {
							logMessage(
								`💥${ship.id} Missile hit ${targetShip.id} for ${missile * 0.5} shield`
							)
							targetShip.shield -= missile * 0.5
						}
					} else {
						if (laser) {
							logMessage(
								`💥${ship.id} Laser hit ${targetShip.id} for ${laser * 0.5} coque`
							)
							targetShip.coque -= laser * 0.5
						}
						if (missile) {
							logMessage(
								`💥${ship.id} Missile hit ${targetShip.id} for ${missile * 1.5} coque`
							)
							targetShip.coque -= missile * 1.5
						}
					}
				} else {
					logMessage(`${ship.id} Missed target`)
				}
				if (targetShip.coque <= 0) {
					groups[targetGroupIndex].shipIds = groups[
						targetGroupIndex
					].shipIds.filter((shipId) => shipId !== targetShipIndex)
					logMessage(`💥 ${targetShip.id} destroyed 💥`)
					await db.ship.delete({
						where: {
							id: targetShipIndex
						}
					})
					destroyedShips.push(targetShipIndex)
				} else {
					await db.ship.update({
						where: {
							id: targetShipIndex
						},
						data: {
							coque: targetShip.coque,
							shield: targetShip.shield
						}
					})
				}
			}
		}
		// update fleet destroyed ships
		await Promise.all(
			task.details.fleetIds.map(async (fleetId) => {
				const fleet = await db.fleet.findUnique({
					where: {
						id: fleetId
					}
				})
				if (fleet) {
					fleet.shipIds = fleet.shipIds.filter(
						(shipId) => !destroyedShips.includes(shipId)
					)
					if (fleet.shipIds.length === 0) {
						await db.fleet.delete({
							where: { id: fleetId }
						})
					} else {
						await db.fleet.update({
							where: { id: fleetId },
							data: fleet
						})
					}
				}
			})
		)
		// update pirates destroyed ships
		await Promise.all(
			task.details.pirateIds.map(async (pirateId) => {
				const pirate = await db.pirate.findUnique({
					where: { id: pirateId }
				})
				if (pirate) {
					pirate.shipIds = pirate.shipIds.filter(
						(shipId) => !destroyedShips.includes(shipId)
					)
					if (pirate.shipIds.length === 0) {
						await db.pirate.delete({
							where: { id: pirateId }
						})
					} else {
						await db.pirate.update({
							where: { id: pirateId },
							data: pirate
						})
					}
				}
			})
		)
		logMessage("💥 Fight turn finished 💥")
		const remainingFleets = await db.fleet.findMany({
			where: {
				id: {
					in: fleets.map((fleet) => fleet.id)
				}
			}
		})
		console.log("💥 Remaining fleets shipIds 💥")
		console.table(
			_.flattenDeep(
				await Promise.all(
					remainingFleets.map(async (fleet) => {
						return await db.ship.findMany({
							where: {
								id: {
									in: fleet.shipIds
								}
							}
						})
					})
				)
			)
		)
		if (
			remainingFleets
				.map((fleet) =>
					fleet.shipIds.filter((shipId) => !destroyedShips.includes(shipId))
				)
				.every((shipIds) => shipIds.length === 0)
		) {
			// if not remaining ships delete fleet
			logMessage("💥 Fleet destroyed 💥")
			const fleetToDelete = await db.fleet.findUnique({
				where: { id: task.details.fleetIds[0] }
			})
			if (fleetToDelete) {
				await db.fleet.delete({
					where: { id: task.details.fleetIds[0] }
				})
			}
		}
		if (remainingFleets.length === 0) {
			return
		}
		const remainingPirates = await db.pirate.findMany({
			where: {
				id: {
					in: pirates.map((pirate) => pirate.id)
				}
			}
		})
		console.log("💥 Remaining pirates shipIds 💥")
		console.table(
			_.flattenDeep(
				await Promise.all(
					remainingPirates.map(async (pirate) => {
						return await db.ship.findMany({
							where: {
								id: {
									in: pirate.shipIds
								}
							}
						})
					})
				)
			)
		)
		if (
			remainingPirates
				.map((pirate) =>
					pirate.shipIds.filter((shipId) => !destroyedShips.includes(shipId))
				)
				.every((shipIds) => shipIds.length === 0)
		) {
			logMessage("💥 Pirate destroyed 💥")
			const pirateToDelete = await db.pirate.findUnique({
				where: { id: task.details.pirateIds[0] }
			})
			if (pirateToDelete) {
				await db.pirate.delete({
					where: { id: task.details.pirateIds[0] }
				})
			}
		}
		if (groups.filter((group) => group.shipIds.length > 0).length > 1) {
			// if 2 groups not empty, create new fight
			const newTask = {
				type: TaskType.FIGHT,
				endDate: moment()
					.add(Math.random() * 30 + 30, "seconds")
					.toISOString(),
				details: {
					fleetIds: remainingFleets.map((fleet) => fleet.id),
					pirateIds: remainingPirates.map((pirate) => pirate.id),
					position: task.details.position,
					log: log
				},
				userId: task.userId
			}
			logMessage("💥 New fight scheduled 💥")
			scheduleTask(newTask)
		}
	}
}
export default taskFight