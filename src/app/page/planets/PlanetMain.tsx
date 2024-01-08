import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import { setCurrentPlanet } from "@/redux/slice/current.slice"
import Flex from "@/ui/atoms/Flex"
import BButton from "@/ui/atoms/buttons/BButton"
import GalaxyButton from "@/ui/atoms/buttons/GalaxyButton/GalaxyButton"
import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"

const PlanetMain = ({}) => {
	const { id: planetId } = useParams()
	const planets = usePlanets()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const currentPlanet = useCurrentPlayerActivePlanet()
	return (
		<>
			<Flex gap="2rem">
				<BButton
					color="purple"
					variant="bordered"
					onClick={() => navigate(`/design_system`)}
				>
					Design System
				</BButton>
				<BButton
					color="red"
					variant="bordered"
					onClick={() => navigate(`/test`)}
				>
					test
				</BButton>
				<BButton
					color="cyan"
					variant="bordered"
					onClick={() => navigate(`/planets/${planetId}/research`)}
				>
					Centre de recherche
				</BButton>
				<BButton
					onClick={() => navigate(`/planets/${planetId}/shipfactory/choose`)}
				>
					Usine à vaisseaux
				</BButton>
				<Link to={`/planets/${planetId}/mines`}>
					<BButton disabled>Mines</BButton>
				</Link>
				<Link to={`/planets/${planetId}/fabric`}>
					<BButton disabled>Fabrique</BButton>
				</Link>
				<Link to={`/planets/${planetId}/caserne`}>
					<BButton disabled>Caserne</BButton>
				</Link>
				<BButton
					onClick={() => {
						navigate(`/planets/${planetId}/university`)
					}}
					disabled
				>
					Université
				</BButton>
				<BButton
					onClick={() => {
						navigate(`/planets/${planetId}/spatioport`)
					}}
				>
					Spatioport
				</BButton>
				<Link to={`/fleets/list`}>
					<BButton>Fleets</BButton>
				</Link>
				<GalaxyButton
					onClick={() => {
						navigate(`/universe`)
					}}
					title="Univers"
				/>
			</Flex>
		</>
	)
}

export default PlanetMain
