import { text } from "@/ui/fondations/text"
import colored from "@/utils/colored"
import { Card } from "@nextui-org/react"
import styled from "styled-components"

export const CardImageContainer = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  position: relative;
  overflow: hidden;
`

export const GridCardContent = styled.div`
`
export const GridResources = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 30px 1fr 30px 1fr;
  grid-gap: 0.25rem;
  justify-items: center;
  align-items: center;
  font-size: 0.7rem;
`

export const EditionText = text(
	styled.div`
    --font-size: var(--font-size-0);
    position: absolute;
    width: 250px;
    min-height: 32px;
    bottom: 0;
    left: 0;
    padding: var(--size-1);
    background-color: hsla(
      var(--grey-hue),
      var(--grey-saturation),
      var(--grey900-lightness),
      0.3
    );
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-right-radius: 1rem;
    & > * {
      color: var(--text-color);
    }
    text-transform: uppercase;
  `,
)
export const SDiv = styled.div`
  min-width: 32px;
`
export const DisplayResourcesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
`

export const ShipVariantTitle = colored(styled.div`
  font-size: var(--font-size);
  text-transform: uppercase;
  color: hsl(var(--color-hue), var(--color-saturation), calc(var(--color-lightness) + 20%) );
`)

export const ExtendedCard = styled.div`
  position: absolute;
  right: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  height: 100%;
  width: 0px;
  max-width: 0px;
  padding: 0px;
  background: var(--neutral900)

`
export const SCard = colored(styled(Card)`
  filter: unset !important;
  position: relative;
  height: 120px;
  border: 2px var(--color) solid;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  &:hover {
    ${ExtendedCard} {
      width: 80px;
      padding: 0.5rem;
      max-width: 80px;
    }
  }
`)
export const ShipTitle = styled.div<{ $textColor: string }>`
  color: ${({ $textColor }) => `var(--${$textColor})`};
  font-size: 1.5rem;
  font-weight: 800;
`
export const ShipClass = styled.div<{ $textColor: string }>`
  color: ${({ $textColor }) => `var(--${$textColor})`};
  font-size: 0.8rem;
`
export const CardContent = styled.div`
  width: auto;
  padding: 0.5rem;
  padding-left: 1.5rem;
`

export const CardContentBottom = styled.div`
  background-color: var(--grey800);
  backdrop-filter: blur(5px);
  padding: 1rem;
`
export const CardImage = styled.img`
  transition: all 0.3s ease-in-out;
  border-radius: 1rem 1rem 0 0;
  ${SCard}:hover & {
    filter: brightness(1.5);
    transform: scale(1.1);
  }
`
