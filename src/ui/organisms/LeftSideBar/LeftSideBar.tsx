import usePlanets from "@/hooks/data/entity/use-planets.hook"
import { setCurrentPlayerActivePlanetId } from "@/redux/slice/current.slice"
import Flex from "@/ui/atoms/Flex"
import { Avatar } from "@nextui-org/react"
import { useParams } from "next/navigation"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import styled from "styled-components"

const PlanetName = styled.div`
    // transition with delay to make it appear after the width transition
    transition: all 0.3s ease-in-out;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    max-width: var(--width-internal);
    overflow: hidden;
    text-transform: capitalize;
    
`
const LeftSideBarContainer = styled.div`
    width: var(--leftbar-width);
    height: 100vh;
    background-color: black;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    transition: all 0.3s ease-in-out;
    --width-internal: 0%;
    max-height:100vh;
    overflow-y: auto;
    &:hover {
        width: 200px;
        --width-internal: 100%;
        ${PlanetName} {
            padding-left: 1rem;
        }
    }
    display: flex;
    flex-direction: column;
    align-items: left;
    padding-top: calc(var(--topbar-height) + 1rem);
`
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
        gap: 0.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        ${PlanetName} {
            padding-left: 1.5rem;
        }
    }
    margin-bottom: 0.5rem;
`

const types = [
	"atmo",
	"ceres",
	"earth",
	"eris",
	"fictio",
	"haumea",
	"jupiter",
	"mars",
	"mercury",
	"moon",
	"neptune",
	"saturn",
	"uranus",
	"venus",
]

const LeftSideBar = () => {
	const { id: planetId } = useParams()
	const planets = usePlanets()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	return (
		<LeftSideBarContainer>
			{Object.values(planets).map((el) => {
				return (
					<PlanetWithNameContainer
						$selected={el.id === planetId}
						onClick={() => {
							dispatch(setCurrentPlayerActivePlanetId(el.id))
							navigate(`/planets/${el.id}`)
						}}
					>
						<Avatar src={`/images/planets/${el.type}.jpg`} size="md" />
						<PlanetName>{el.name}</PlanetName>
					</PlanetWithNameContainer>
				)
			})}
		</LeftSideBarContainer>
	)
}

export default LeftSideBar
