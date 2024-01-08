import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import useGameLoop from "@/hooks/use-game-loop"
import { setCurrentPlayerActivePlanetId } from "@/redux/slice/current.slice"
import ResourcesService from "@/services/ResourcesService"
import Flex from "@/ui/atoms/Flex/Flex"
import HomeIconButton from "@/ui/atoms/iconButtons/HomeIconButton/HomeIconButton"
import { Avatar, Navbar, NavbarContent } from "@nextui-org/react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
const ResourcesBox = styled.div`
  width: fit-content;
`

const StyledAppBar = styled(Navbar)`
  padding: 0.25rem;
  background-color: black !important;
  position: fixed !important;
  box-shadow: 0px 3px 3px -2px rgb(255 255 255 / 20%),
    0px 3px 4px 0px rgb(255 255 255 / 14%),
    0px 1px 8px 0px rgb(255 255 255 / 12%) !important;
  height: var(--navbar-height) !important;
  margin-top: -4rem;
  z-index: 1000;
  & > header {
	max-width: none !important;
	padding-left: 0.75rem !important;
	padding-right: 0.75rem !important;
  }
`

export default function PrimarySearchAppBar() {
	const planets = usePlanets()
	const navigate = useNavigate()
	const gameLoop = useGameLoop()
	const currentPlanet = useCurrentPlayerActivePlanet()
	const dispatch = useDispatch()
	useEffect(() => {
		if (!currentPlanet) {
			navigate(`/planets/${planets[0]?.id}`)
			dispatch(setCurrentPlayerActivePlanetId(Object.keys(planets)[0]))
		}
	}, [planets])
	useEffect(() => {
		setInterval(() => gameLoop(), 20000)
	}, [])
	const allResources = ResourcesService.getAllResources()

	return (
		<StyledAppBar position="static">
			<NavbarContent>
				<Flex gap="1.5rem" alignItems="center" justifyContent="space-between">
					<Flex gap="1rem" alignItems="center">
						<Avatar
							src={`/images/planets/${currentPlanet?.type}.jpg`}
							size="md"
						/>
						{currentPlanet?.name}

						<HomeIconButton
							handleClick={() => {
								navigate(`/planets/${currentPlanet?.id}`)
							}}
						/>
					</Flex>
					<Flex gap="3rem">
						{Object.values(allResources).map((resource) => {
							return (
								<ResourcesBox key={resource.name}>
									<Flex alignItems="center" gap="0.5rem">
										<img src={resource.img} width={25} height={25} />
										<div>{resource.name}</div>
										<div>
											{ResourcesService.renderResources(
												currentPlanet?.resources?.[resource.name],
											)}
										</div>
									</Flex>
								</ResourcesBox>
							)
						})}
					</Flex>
				</Flex>
			</NavbarContent>
		</StyledAppBar>
	)
}
