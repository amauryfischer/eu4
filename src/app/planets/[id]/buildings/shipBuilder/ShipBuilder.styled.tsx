import { Avatar } from "@nextui-org/react"
import styled from "styled-components"

export const Simg = styled.img`
  border-radius: 50%;
  width: 25px;
  height: 25px;
`
export const CustomGridResources = styled.div`
	display: grid;
	grid-template-columns: 30px 100px 1fr;
`
export const Container = styled.div<{}>`
  padding: var(--size-8);
`

export const BackgroundImage = styled.div<{
	img: string
}>`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.img});
  background-size: cover;
  z-index: -100;
  filter: blur(1px) brightness(0.2) opacity(0.5);
`

export const ShipPropertyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 15fr);
  column-gap: 2em;
  row-gap: 1em;
`
export const SAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
`
export const ColoredAvailableResource = styled.div<{ $available?: boolean }>`
	color: ${({ $available }) => !$available && "var(--error)"};
`
export const FullContainer = styled.div`
  position: relative;
`
export const RedIfTooMuch = styled.div<{ $tooMuch?: boolean }>`
  color: ${({ $tooMuch }) => $tooMuch && "var(--error)"};
`
