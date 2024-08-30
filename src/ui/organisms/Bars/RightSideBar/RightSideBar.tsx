"use client";
import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet";
import Flex from "@/ui/atoms/Flex";
import City from "@/ui/fondations/icons/City";
import First from "@/ui/fondations/icons/First";
import Galaxy from "@/ui/fondations/icons/Galaxy";
import Mails from "@/ui/fondations/icons/Mails";
import Orga from "@/ui/fondations/icons/Orga";
import Planet from "@/ui/fondations/icons/Planet";
import SolarSystem from "@/ui/fondations/icons/SolarSystem";
import Spaceship from "@/ui/fondations/icons/Spaceship";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const RightSideBarContainer = styled.div`
    transition: all 0.3s ease-in-out;
    margin-top: var(--topbar-height);
    height: calc(100vh - var(--topbar-height));
    width: 74px;
    background-color: black;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: start;
    --width-internal: 0%;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    &:hover {
        width: 200px;
        --width-internal: 100%;
    }
`;
const PlanetName = styled.div`
    // transition with delay to make it appear after the width transition
    transition: all 0.3s ease-in-out;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    max-width: var(--width-internal);
    overflow: hidden;
    text-transform: capitalize;
    padding-left: 0.5rem;
    
`;
const PlanetWithNameContainer = styled(Flex)`
    align-items: center;
    transition: all 0.3s ease-in-out;
    margin-right: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    --gradient-background-grey-dark: linear-gradient(
        270deg,
        var(--grey700) 10%,
        var(--grey800) 100%
    );
    border-radius: 0.5rem;
    &:hover {
        background: var(--gradient-background-grey-dark);
        gap: 0.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        ${PlanetName} {
            padding-left: 1rem;
        }
    }
    margin-bottom: 0.5rem;
`;

const RightSideBar = () => {
	const planet = useCurrentPlayerActivePlanet();
	const { push } = useRouter();

	const menus = {
		city: {
			icon: <City width="42px" color="red200" />,
			name: "Bâtiments",
			url: `/planets/${planet?.id}`,
		},
		planet: {
			icon: <Planet width="42px" />,
			name: "Orbite",
			url: "/",
		},
		solarSystem: {
			icon: <SolarSystem color="yellow400" width="42px" />,
			name: "Système solaire",
			url: `/system/${planet?.position?.system}`,
		},
		universe: {
			icon: <Galaxy color="cyan500" width="42px" />,
			name: "Univers",
			url: "/universe",
		},
		spaceships: {
			icon: <Spaceship width="42px" color="caramel400" />,
			name: "Flottes",
			url: "/fleets",
		},
		empire: {
			icon: <Orga width="42px" color="emerald200" />,
			name: "Empire",
			url: "/empire",
		},
		classement: {
			icon: <First width="42px" color="purple200" />,
			name: "Classement",
			url: "/classement",
		},
		mails: {
			icon: <Mails width="42px" color="blue500" />,
			name: "Messagerie",
			url: "/mails",
		},
	};
	return (
		<RightSideBarContainer>
			{Object.values(menus).map((el) => {
				return (
					<PlanetWithNameContainer
						onClick={() => {
							push(el.url);
						}}
						key={el.name}
					>
						{el.icon}
						<PlanetName>{el.name}</PlanetName>
					</PlanetWithNameContainer>
				);
			})}
		</RightSideBarContainer>
	);
};

export default RightSideBar;
