"use client";
import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet";
import usePlanets from "@/hooks/data/entity/use-planets.hook";
import useGameLoop from "@/hooks/use-game-loop";
import { setCurrentPlayerActivePlanetId } from "@/redux/slice/current.slice";
import ResourcesService from "@/services/ResourcesService";
import Flex from "@/ui/atoms/Flex/Flex";
import Button from "@/ui/atoms/buttons/Button";
import HomeIconButton from "@/ui/atoms/iconButtons/HomeIconButton/HomeIconButton";
import {
	Avatar,
	Input,
	Navbar,
	NavbarContent,
	NavbarItem,
	Skeleton,
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
const ResourcesBox = styled.div`
  width: fit-content;
`;

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
`;

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: calc(-1 * var(--navbar-height));
`;

const TooltipContent = styled.div`
	background-color: hsla(var(--grey-hue),var(--grey-saturation),var(--grey600-lightness),0.3);
	padding: 0.5rem;
	color: white;
	border-radius: 0.5rem;
`;

export default function AppBarMenu() {
	const planets = usePlanets();
	const gameLoop = useGameLoop();
	const currentPlanet = useCurrentPlayerActivePlanet();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!currentPlanet) {
			//navigate(`/planets/${planets[0]?.id}`)
			dispatch(setCurrentPlayerActivePlanetId(Object.keys(planets)[0]));
		}
	}, [planets, currentPlanet]);
	useEffect(() => {
		setInterval(() => gameLoop(), 20000);
	}, []);
	const allResources = ResourcesService.getAllResources();

	if (!currentPlanet) return <StyledSkeleton className="w-full h-16" />;

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
												<div>
													{ResourcesService.renderResources(
														currentPlanet?.resources?.[resource.name],
													)}
												</div>
												<div className="text-xl text-purple-600">
													{resource.name}
												</div>
											</Flex>
										</TooltipContent>
									}
									classNames={{
										base: [
											"backdrop-filter backdrop-blur-sm bg-opacity-10 bg-red-900 p-0",
										],
										content: [
											// tailwind glassmorphism
											"bg-red-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-300 text-success-600 p-0",
										],
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
											<div>
												{ResourcesService.renderResources(
													currentPlanet?.resources?.[resource.name],
												)}
											</div>
										</Flex>
									</ResourcesBox>
								</Tooltip>
							);
						})}
					</Flex>
				</Flex>
			</NavbarContent>
		</StyledAppBar>
	);
}
