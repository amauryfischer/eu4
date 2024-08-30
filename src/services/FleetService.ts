import db from "@/app/db"
import { IFleet } from "@/type/data/IFleet"
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

export default {
	getFleetStats,
}
