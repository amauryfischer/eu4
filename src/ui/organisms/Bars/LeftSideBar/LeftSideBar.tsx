"use client";
import usePlanets from "@/hooks/data/entity/use-planets.hook";
import { setCurrentPlayerActivePlanetId } from "@/redux/slice/current.slice";
import ResourcesService from "@/services/ResourcesService";
import Flex from "@/ui/atoms/Flex";
import { SmallText, SubTitle, Text } from "@/ui/fondations/text";
import PlanetCanvas from "@/ui/molecules/entity/planets/PlanetCanvas";
import BProgress from "@/ui/molecules/progress/BProgress";
import { Avatar, Spacer, Tooltip } from "@nextui-org/react";
import { redirect, useParams, useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const PlanetName = styled.div`
    // transition with delay to make it appear after the width transition
    transition: all 0.3s ease-in-out;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    max-width: var(--width-internal);
    overflow: hidden;
    text-transform: capitalize;
    
`;
const TooltipContent = styled.div`
	background-color: hsla(var(--grey-hue),var(--grey-saturation),var(--grey800-lightness),0.8);
	padding: 0.5rem;
	color: white;
	border-radius: 0.5rem;
    padding: 0.5rem 2rem; 
`;
const LeftSideBarContainer = styled.div`
    width: var(--leftbar-width);
    background-color: black;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    transition: all 0.3s ease-in-out;
    --width-internal: 0%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: left;
    padding-top: calc(var(--topbar-height) + 1rem);
`;
const PlanetWithNameContainer = styled(Flex)<{ $selected: boolean }>`
    align-items: center;
    transition: all 0.3s ease-in-out;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    --gradient-background-grey-dark: linear-gradient(
        270deg,
        var(--grey700) 10%,
        var(--grey800) 100%
    );
    ${({ $selected }) =>
			$selected
				? "background-color: var(--gradient-background-grey-dark);"
				: ""}
    border-radius: 0.5rem;
    &:hover {
        background: var(--gradient-background-grey-dark);
        cursor: pointer;
    }
    margin-bottom: 0.5rem;
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr 30px;
    gap: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    align-items: center;
    justify-items: center;
`;
const CanvasContainer = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 0.5rem;
    padding: 2rem;
`;

const LeftSideBar = () => {
	const { id: planetId } = useParams();
	const planets = usePlanets();
	const dispatch = useDispatch();
	const { push } = useRouter();
	return (
		<LeftSideBarContainer>
			{Object.values(planets).map((planet) => {
				return (
					<Tooltip
						key={planet.id}
						showArrow
						placement="right"
						content={
							<TooltipContent>
								<Flex direction="column" gap="0.5rem">
									<Spacer y={4} />
									<SubTitle>{planet.name}</SubTitle>
									<Flex
										alignItems="center"
										gap="0.5rem"
										justifyContent="center"
									>
										<CanvasContainer>
											<PlanetCanvas planet={planet} sizeMultiplier={3} />
										</CanvasContainer>
										<Flex direction="column" gap="0.5rem">
											<Text>
												Position: {planet.position.system}:
												{planet.position.systemPosition.x}:
												{planet.position.systemPosition.y}:
												{planet.position.systemPosition.z}
											</Text>
											<Grid>
												{Object.values(ResourcesService.getAllResources()).map(
													(resource) => {
														let color = "primary";
														if (
															planet.resourcesMultiplier[resource.name] < 0.5
														) {
															color = "warning";
														}
														if (
															planet.resourcesMultiplier[resource.name] < 0.2
														) {
															color = "danger";
														}
														if (
															planet.resourcesMultiplier[resource.name] > 0.8
														) {
															color = "success";
														}
														return (
															<React.Fragment key={resource.name}>
																<img
																	alt={resource.name}
																	src={resource.img}
																	width={30}
																	height={30}
																/>
																<BProgress
																	value={
																		planet.resourcesMultiplier[resource.name] *
																		100
																	}
																/>
																<SmallText>
																	{Math.floor(
																		planet.resourcesMultiplier[resource.name] *
																			100,
																	)}
																</SmallText>
															</React.Fragment>
														);
													},
												)}
											</Grid>
										</Flex>
									</Flex>
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
						<PlanetWithNameContainer
							$selected={planet.id === planetId}
							onClick={() => {
								dispatch(setCurrentPlayerActivePlanetId(planet.id));
								push(`/planets/${planet.id}`);
							}}
						>
							<Avatar src={`/images/planets/${planet.type}.jpg`} size="md" />
							<PlanetName>{planet.name}</PlanetName>
						</PlanetWithNameContainer>
					</Tooltip>
				);
			})}
		</LeftSideBarContainer>
	);
};

export default LeftSideBar;
