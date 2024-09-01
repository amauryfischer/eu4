"use client"

import styled from "styled-components"

export const ChildrenContainer = styled.div`
	margin-top: var(--navbar-height);
	height: calc(100vh - var(--navbar-height));
	width: calc(100vw - var(--leftbar-width) - var(--rightbar-width));
	margin-left: var(--leftbar-width);
`
