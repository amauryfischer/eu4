import ShipService from "@/services/ShipService"
import { IModifier } from "@/type/data/IModule"
import IShip from "@/type/data/IShip"
import _ from "lodash"

const getFleetStats = ({
	ships,
	modifier,
}: { ships: Array<IShip>; modifier: IModifier }) => {
	const cumulatedStat = _.sumBy(ships, (s) =>
		_.sumBy(s.modules, (m) => m.modifier?.[modifier] ?? 0),
	)
	return cumulatedStat
}

const getTotalFuel = ({ ships }: { ships: Array<IShip> }) => {
	if (ships.some((s) => s === undefined)) {
		return 0
	}
	const allClass = ShipService.getAllShips()
	let totalFuel = _.sumBy(ships, (s) => allClass[s.class].fuelSpace)
	ships.forEach((s) => {
		totalFuel += ShipService.getAllStatFromModules({
			ship: s,
			state: IModifier.FUEL
		})
	})
	return totalFuel
}

const getFuelConsumption = ({ ships }: { ships: Array<IShip> }) => {
	const allClass = ShipService.getAllShips()
	let totalFuelConsumption = 0
	ships.forEach((s) => {
		totalFuelConsumption +=
			(ShipService.getAllStatFromModules({
				ship: s,
				state: IModifier.CONSO
			}) *
				allClass[s.class].multiplier.conso) /
			10
	})
	return totalFuelConsumption
}

export default {
	getFleetStats,
	getTotalFuel,
	getFuelConsumption
}
