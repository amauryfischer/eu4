import { text } from "@/ui/fondations/text"
import colored from "@/utils/colored"
import styled from "styled-components"

export const SCard = colored(styled.div`
  filter: unset !important;
  height: 100%;
  border: 2px var(--color) solid;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`)

export const CardImageContainer = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  position: relative;
  overflow: hidden;
`

export const CardImage = styled.img`
  transition: all 0.3s ease-in-out;
  border-radius: 1rem 1rem 0 0;
  object-fit: cover;
  ${SCard}:hover & {
    filter: brightness(1.5);
    transform: scale(1.1);
  }
`
export const GridCardContent = styled.div`
  display: grid;
  grid-template-rows: 1fr 70px;
  height: 100%;
`
export const GridResources = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 30px 1fr 30px 1fr;
  grid-gap: 0.25rem;
  justify-items: center;
  font-size: 0.7rem;
`

export const EditionText = text(
	styled.div`
    --font-size: var(--font-size-1);
    position: absolute;
    width: 250px;
    min-height: 32px;
    bottom: 0;
    left: 0;
    padding: 0.5rem;
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
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  color: hsl(var(--color-hue), var(--color-saturation), calc(var(--color-lightness) + 20%) );
`)

export const ExtendedCard = styled.div`
  height: 100%;
  width: 0px;
  max-width: 0px;
  padding: 0px;
  overflow: hidden;
  background: linear-gradient(
    0deg,
    var(--grey800) 0%,
    var(--grey900) 100%
  );
  ${SCard}:hover & {
    transition: all 0.6s ease-in;
    max-width: fit-content;
    width: 100%;
    padding: 0.5rem;
  }
`
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
  background-color: var(--grey800);
  width: auto;
  padding: 0.5rem;
  padding-left: 1.5rem;
`

export const CardContentBottom = styled.div`
  background-color: var(--grey800);
  backdrop-filter: blur(5px);
  padding: 1rem;
`
