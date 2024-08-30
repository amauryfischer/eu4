import ModulesService from "@/services/ModulesService"
import ShipService from "@/services/ShipService"
import IShip from "@/type/data/IShip"
import Flex from "@/ui/atoms/Flex"
import { useMemo } from "react"

const ShipNumberModules = ({ ship }: { ship: IShip }) => {
	const currentShipClass = ShipService.getAllShips()[ship.class]
	const numberModulePerName = useMemo(() => {
		let tmpNumberModulePerName = {} as { [key: string]: number }
		ship.modules.forEach((module) => {
			if (tmpNumberModulePerName[module.id]) {
				tmpNumberModulePerName[module.id] += 1
			} else {
				tmpNumberModulePerName[module.id] = 1
			}
		})
		return tmpNumberModulePerName
	}, [ship])

	return (
		<Flex direction="column" gap="0.25rem">
			<div>Emplacements : {currentShipClass.emplacement}</div>
			{Object.keys(numberModulePerName).map((moduleId) => (
				<Flex align-items="center" gap="0.5rem" key={moduleId}>
					<img
						src={ModulesService.getAllModules()[moduleId].img}
						width="25px"
					/>
					<div>
						{numberModulePerName[moduleId]} x{" "}
						{ModulesService.getAllModules()[moduleId].name}
					</div>
				</Flex>
			))}
		</Flex>
	)
}

export default ShipNumberModules
