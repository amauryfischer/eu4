import BProgress from "@/ui/molecules/progress/BProgress"
import { Image } from "@nextui-org/react"
import styled from "styled-components"

export const TaskContainer = styled.div<{ $color: string }>`
    position: relative;
    margin: 0.5rem;
    transition: all 0.3s ease-in-out;
    border-radius: var(--nextui-radius-large);
    ${({ $color }) => `border: 1px solid var(--${$color});`}
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
`
export const StyledProgress = styled(BProgress)`

    position: absolute;
    bottom: 1rem;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 0.5rem;
    border-radius: 0.5rem;
    background-color: hsla(var(--default-hue),var(--default-saturation),var(--default-lightness),0.8);
    & > div {
        border-radius: 0.5rem;
    }
`
export const RemainingTime = styled.div`
    position: absolute;
    left: 0;
    z-index: 15;
    color: white;
    font-weight: 600;
    padding: 0rem 0.5rem;
    font-size: 1rem;
    text-shadow: 0 0 1rem black;
    bottom: 0rem;
    background-color: hsla(var(--grey-hue),var(--grey-saturation),var(--grey800-lightness),0.8);
    width: 100%;
    font-size: 0.75rem;
    border-bottom-left-radius: var(--nextui-radius-large);
    border-bottom-right-radius: var(--nextui-radius-large);
`
export const SImage = styled(Image)`
	width: 100%;
	height: 100px;
	object-fit: cover;
	max-width: 100% !important;
	& > div {
		max-width: 100% !important;
	}
`
