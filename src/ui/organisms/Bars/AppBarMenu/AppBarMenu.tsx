"use client"
import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import useGameLoop from "@/hooks/use-game-loop"
import {
	setCurrentPlayerActivePlanetId,
	setCurrentUser
} from "@/redux/slice/current.slice"
import AnimatedNumber from "react-animated-number"
import ResourcesService from "@/services/ResourcesService"
import Flex from "@/ui/atoms/Flex/Flex"
import Button from "@/ui/atoms/buttons/Button"
import HomeIconButton from "@/ui/atoms/iconButtons/HomeIconButton/HomeIconButton"
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Navbar,
	NavbarContent,
	NavbarItem,
	Skeleton,
	User
} from "@nextui-org/react"
import { Tooltip } from "@nextui-org/tooltip"
import { signOut, useSession } from "next-auth/react"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
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
  margin-top: calc(-1 * var(--navbar-height));
  z-index: 1000;
  & > header {
    max-width: none !important;
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
  }
`

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: calc(-1 * var(--navbar-height));
`

const TooltipContent = styled.div`
  background-color: hsla(
    var(--grey-hue),
    var(--grey-saturation),
    var(--grey600-lightness),
    0.3
  );
  padding: 0.5rem;
  color: white;
  border-radius: 0.5rem;
`

export default function AppBarMenu() {
	const planets = usePlanets()
	const gameLoop = useGameLoop()
	const currentPlanet = useCurrentPlayerActivePlanet()
	const dispatch = useDispatch()
	const currentUser = useCurrentUser()
	useEffect(() => {
		if (!currentPlanet) {
			dispatch(
				setCurrentPlayerActivePlanetId(
					Object.values(planets).filter(
						(p) => p?.userId === currentUser?.id
					)?.[0]?.id
				)
			)
		}
	}, [planets, currentPlanet])
	useEffect(() => {
		setInterval(() => gameLoop(), 20_000)
	}, [])
	const allResources = ResourcesService.getAllResources()
	const { data } = useSession()

	if (!currentPlanet) return <StyledSkeleton className="w-full h-16" />
	return (
		<StyledAppBar position="static">
			<NavbarContent>
				<Flex
					gap="1.5rem"
					alignItems="center"
					justifyContent="space-between"
					grow={1}
				>
					<Flex gap="1rem" alignItems="center">
						<Avatar
							src={`/images/planets/${currentPlanet?.type}.jpg`}
							size="md"
						/>
						<>{currentPlanet?.name}</>
					</Flex>
					<Flex gap="3rem">
						{Object.values(allResources).map((resource) => {
							return (
								<Tooltip
									showArrow
									key={resource.name}
									placement="bottom"
									content={
										<TooltipContent>
											<Flex alignItems="center" gap="0.5rem">
												<img
													src={resource.img}
													width={50}
													height={50}
													alt={resource.name}
												/>

												<AnimatedNumber
													component="text"
													value={currentPlanet?.resources?.[resource.name]}
													style={{
														transition: "0.8s ease-out",
														fontSize: 48,
														transitionProperty:
															"background-color, color, opacity"
													}}
													duration={1000}
													formatValue={(n) =>
														ResourcesService.renderResources(n)
													}
												/>
												<div className="text-xl text-purple-600">
													{resource.name}
												</div>
											</Flex>
										</TooltipContent>
									}
									classNames={{
										base: [
											"backdrop-filter backdrop-blur-sm bg-opacity-10 bg-red-900 p-0"
										],
										content: [
											// tailwind glassmorphism
											"bg-red-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-300 text-success-600 p-0"
										]
									}}
								>
									<ResourcesBox key={resource.name}>
										<Flex alignItems="center" gap="0.5rem">
											<img
												src={resource.img}
												width={25}
												height={25}
												alt={resource.name}
											/>
											<AnimatedNumber
												component="text"
												value={currentPlanet?.resources?.[resource.name]}
												style={{
													transition: "0.8s ease-out",
													fontSize: 16,
													transitionProperty: "background-color, color, opacity"
												}}
												duration={1000}
												formatValue={(n) => ResourcesService.renderResources(n)}
											/>
										</Flex>
									</ResourcesBox>
								</Tooltip>
							)
						})}
					</Flex>
					<Flex gap="1rem">
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								<User
									as="button"
									avatarProps={{
										src: data?.user?.image
									}}
									name={data?.user?.name}
									//   size="md"
								/>
							</DropdownTrigger>
							<DropdownMenu
								aria-label="Profile Actions"
								variant="flat"
								onAction={(key: React.Key) => {
									switch (key) {
										case "logout":
											signOut()
											break

										default:
											break
									}
								}}
							>
								<DropdownItem key="logout" color="danger">
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Flex>
				</Flex>
			</NavbarContent>
		</StyledAppBar>
	)
}
