import React from "react"
import styled, { css } from "styled-components"
const Flex = styled.div<{ gap: string }>`
  display: flex;
  ${({ gap }) =>
    gap &&
    css`
      gap: ${gap};
    `}
`
export default Flex
