import styled from "styled-components"
import { Modal } from "@nextui-org/react"

export const StyledModal = styled(Modal)`
  background-color: hsla(var(--grey-hue),var(--grey-saturation),var(--grey800-lightness),0.8);
  @media (width > 768px) {
    max-width: 80vw;
  }
  & > * {
    color: white;
  }
`
