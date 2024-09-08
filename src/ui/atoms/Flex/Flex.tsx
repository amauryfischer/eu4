import React from "react"
import styled, { css } from "styled-components"
const Flex = styled.div<{
	direction?: "row" | "column" | "row-reverse" | "column-reverse"
	wrap?: "nowrap" | "wrap" | "wrap-reverse"
	justifyContent?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
	alignContent?: "start" | "end" | "center" | "between" | "around" | "stretch"
	alignItems?: "start" | "end" | "center" | "baseline" | "stretch"
	gap?: string
	fullWidth?: boolean
	fullHeight?: boolean
	grow?: 0 | 1
}>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  height: ${({ fullHeight }) => (fullHeight ? "100%" : "auto")};
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "stretch"};
  align-content: ${({ alignContent }) => alignContent || "stretch"};
  gap: ${({ gap }) => gap || "0"};
  flex-grow: ${({ grow }) => grow || "0"};
`

export default Flex
