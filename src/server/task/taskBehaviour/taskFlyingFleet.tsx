import { ITaskFlyingFleet, TaskType } from "@/type/data/ITask"
import moment from "moment"
import db from "@/app/db"
import { IFleet } from "@/type/data/IFleet"
import IShip from "@/type/data/IShip"
import UniverseService from "@/services/UniverseService"
import FleetService from "@/services/FleetService"
import IPirate from "@/type/data/IPirate"
import scheduleTask from "../scheduleTask"
import ModulesService from "@/services/ModulesService"
import { IModifier } from "@/type/data/IModule"
import ShipService from "@/services/ShipService"
import _ from "lodash"
const taskFlyingFleet = {
	onCreate: async (task: ITaskFlyingFleet) => {
		const fleet = (await db.fleet.findUnique({
			where: { id: task.details.fleetId }
		})) as unknown as IFleet

		const ships = (await db.ship.findMany({
			where: {
				id: {
					in: fleet?.shipIds as string[]
				}
			}
		})) as unknown as Array<IShip>
		const { timeToAdd } = UniverseService.getDistance({
			positionFinal: task.details.position,
			positionInitial: fleet.position,
			ships
		})
		const fuelConsumption = FleetService.getFuelConsumption({ ships })
		const stat = ShipService.getAllStatFromModules({
			ship: ships[0],
			state: IModifier.CONSO
		})
		const fuelConsumptionTravel = fuelConsumption * timeToAdd

		
		await db.fleet.update({
			where: {
				id: fleet.id
			},
			data: {
				fuel: fleet.fuel - fuelConsumptionTravel
			}
		})
		const fast = process.env.NEXT_PUBLIC_FAST === "true"
		const endDate = moment().add(fast ? 15 : timeToAdd, "seconds")
		return endDate.toDate()
	},
	onDestroy: async (task: ITaskFlyingFleet) => {
		const fleet = (await db.fleet.findUnique({
			where: { id: task.details.fleetId }
		})) as unknown as IFleet

		await db.fleet.update({
			where: {
				id: fleet?.id
			},
			data: {
				position: task.details.position as any
			}
		})
		// check if pirate on same position maybe start a fight
		const pirates = (await db.pirate.findMany({
			where: {
				position: {
					equals: task.details.position as any
				}
			}
		})) as unknown as Array<IPirate>
		if (pirates.length > 0) {
			console.log("⚔️ Fight detected! Fleet vs Pirates, schedule fight 🏴‍☠️")
			// for each pirate initialize the ship
			await Promise.all(
				pirates.map(async (pirate) => {
					const ship = await db.ship.create({
						data: {
							class: "navette",
							name: "Navette 1",
							modules: [ModulesService.getAllModules()["laser1"]],
							coque: 100
						}
					})
					const ship2 = await db.ship.create({
						data: {
							class: "navette",
							name: "Navette 2",
							modules: [ModulesService.getAllModules()["laser1"]],
							coque: 100
						}
					})
					const ship3 = await db.ship.create({
						data: {
							class: "chasseur",
							name: "Chasseur",
							modules: [
								ModulesService.getAllModules()["laser1"],
								ModulesService.getAllModules()["laser1"],
								ModulesService.getAllModules()["laser1"],
								ModulesService.getAllModules()["shield1"]
							],
							coque: 150,
							shield: 200
						}
					})
					// attach ship to pirate
					await db.pirate.update({
						where: { id: pirate.id },
						data: {
							shipIds: [ship.id, ship2.id, ship3.id]
						}
					})
					return { pirate, ship }
				})
			)
			// if fight already scheduled, join, else create
			const allFights = await db.task.findMany({
				where: {
					type: TaskType.FIGHT
				}
			})
			const fightAlreadyScheduled = allFights.find((f) =>
				_.isEqual(f.details.position, task.details.position as any)
			)
			if (fightAlreadyScheduled) {
				await db.task.update({
					where: { id: fightAlreadyScheduled.id },
					data: {
						details: {
							fleetIds: [...fightAlreadyScheduled.details.fleetIds, fleet.id]
						}
					}
				})
			} else {
				scheduleTask({
					type: TaskType.FIGHT,
					endDate: moment().add(1, "seconds").toISOString(),
					details: {
						fleetIds: [fleet.id],
						pirateIds: pirates.map((p) => p.id),
						position: task.details.position
					},
					userId: task.userId
				})
			}
		} else {
			console.log("🚩 No pirate detected at position ", task.details.position)
		}

		// todo : later add check if fleet on same position maybe start a fight
		const fleetSamePosition = await db.fleet.findMany({
			where: {
				position: {
					equals: task.details.position as any
				}
			}
		})
		console.table(fleetSamePosition)
		const fleetDifferentUser = fleetSamePosition.filter(
			(f) => f.userId !== task.userId
		)
		if (fleetDifferentUser.length > 0) {
			console.log("🚩 Fleet detected! Fleet vs Fleet, schedule fight 🏴‍☠️")
			// for each fleet initialize the ship
			// if fight already scheduled, join, else create
			const allFights = await db.task.findMany({
				where: {
					type: TaskType.FIGHT
				}
			})
			const fightAlreadyScheduled = allFights.find((f) =>
				_.isEqual(JSON.parse(f.details).position, task.details.position as any)
			)
			
			if (fightAlreadyScheduled) {
				await db.task.update({
					where: { id: fightAlreadyScheduled.id },
					data: {
						details: {
							fleetIds: [...fightAlreadyScheduled.details.fleetIds, fleet.id]
						}
					}
				})
			} else {
				scheduleTask({
					type: TaskType.FIGHT,
					endDate: moment().add(1, "seconds").toISOString(),
					details: {
						fleetIds: [...fleetSamePosition.map((f) => f.id), fleet.id],
						pirateIds: [],
						position: task.details.position
					},
					userId: task.userId
				})
			}
		} else {
			console.log("🚩 No fleet detected at position ", task.details.position)
		}
	}
}

export default taskFlyingFleet
