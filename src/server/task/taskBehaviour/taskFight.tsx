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
import { IModifier } from "@/type/data/IModule"
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
		let pirates = [] as Array<IPirate>
		if (task.details.pirateIds.length > 0) {
			pirates = (await db.pirate.findMany({
				where: {
					id: { in: task.details.pirateIds }
				}
			})) as unknown as Array<IPirate>
		}

		// make group of ennemies and allies
		// ! todo implement ally fight when same empire
		const allFleet = [...pirates, ...fleets]
		const groups = _(allFleet)
			.groupBy((fleet) => fleet.userId || "neutral")
			.map((fleets, userId) => ({
				userId: userId,
				shipIds: _.flatten(fleets.map((fleet) => fleet.shipIds))
			}))
			.value()
		const initialGroups = _.cloneDeep(groups)

		// turn by turn weapon hit random ship of other group, weapons can hit once
		const destroyedShips: Array<string> = []
		while (_.flattenDeep(groups.map((group) => group.shipIds)).length > 0) {
			// randomize group order
			const groupOrder = _.shuffle(groups.map((group, index) => index))
			for (const groupIndexOrder of groupOrder) {
				// skip group if no weapons or invalid index
				if (
					!groups[groupIndexOrder] ||
					groups[groupIndexOrder].shipIds.length === 0
				) {
					continue
				}
				const shipId = groups[groupIndexOrder].shipIds.pop()

				if (!shipId) {
					continue
				}
				// if weapong belong to a dead ship, skip
				if (destroyedShips.includes(shipId)) {
					continue
				}
				const ship = (await db.ship.findUnique({
					where: {
						id: shipId
					}
				})) as unknown as IShip
				// if ship is dead, skip
				if (ship.coque <= 0) {
					continue
				}
				const targetGroupIndex = _.shuffle(
					groupOrder.filter((index) => index !== groupIndexOrder)
				)[0]
				// randomize target ship
				const targetShipIndex = _.shuffle(
					initialGroups[targetGroupIndex].shipIds.filter(
						(shipId) => !destroyedShips.includes(shipId)
					)
				)[0]
				if (!targetShipIndex) {
					console.log("💥 No target ship in group ", targetGroupIndex)
					console.log(
						"💥 Available ships in group: ",
						initialGroups[targetGroupIndex].shipIds
					)
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

				let laser = 0
				let missile = 0
				ship.modules.forEach((module) => {
					if (
						module.type === IModuleType.WEAPON &&
						module.modifier &&
						module.modifier[IModifier.PRECISION] &&
						module.modifier[IModifier.LASER]
					) {
						const random = Math.random() * 100
						if (random < module.modifier[IModifier.PRECISION]) {
							laser += module.modifier[IModifier.LASER]
						}
					}
					if (
						module.type === IModuleType.WEAPON &&
						module.modifier &&
						module.modifier[IModifier.MISSILE]
					) {
						missile += module.modifier[IModifier.MISSILE]
					}
				})
				// 100% of laser hit shield with 1.5 multiplier, if no shield hit coque with 0.5 multiplier
				// 80% of missile hit shield with 0.5 multiplier, if no shield hit coque with 1.5 multiplier, 20% of missile hit coque with 0.75 multiplier
				if (targetShip.shield > 0) {
					if (laser) {
						logMessage(
							`💥${ship.id} Laser hit ${targetShip.id} for ${laser * 1.5} shield`
						)
						targetShip.shield -= laser * 1.5
					}
					if (missile) {
						targetShip.shield -= missile * 0.5 * 0.8
						targetShip.coque -= missile * 0.75 * 0.2
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
		let remainingPirates = [] as Array<IPirate>
		if (task.details.pirateIds.length > 0) {
			remainingPirates = await db.pirate.findMany({
				where: {
					id: {
						in: pirates.map((pirate) => pirate.id)
					}
				}
			})
		}
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
				.every((shipIds) => shipIds.length === 0) &&
			pirates.length > 0
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

		// check if there is remaining ships
		const newGroups = _([...remainingFleets, ...remainingPirates])
			.groupBy((fleet) => fleet.userId || "neutral")
			.map((fleets, userId) => ({
				userId: userId,
				shipIds: _.flatten(fleets.map((fleet) => fleet.shipIds))
			}))
			.value()
		if (newGroups.length > 1) {
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