import styled from "styled-components"
import React from "react"
import colored from "@/utils/colored"

const BTitle = styled.h1`
  --font-size: 5rem;
`
export const BSubTitle = styled.h2`
  --font-size: 3.75rem;
`
export const BSubSubTitle = styled.h3`
  --font-size: 2.25rem;
`
export const BText = styled.div`
  --font-size: 1rem;
`
export const BSmallText = styled.div`
  --font-size: 0.875rem;
`
export const BTinyText = styled.div`
  --font-size: 0.75rem;
`

export const text = (Component: React.ComponentType) =>
	colored(styled(Component)`
    color: var(--text-color);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
  `)

export const Title = text(BTitle)
export const SubTitle = text(BSubTitle)
export const SubSubTitle = text(BSubSubTitle)
export const Text = text(BText)
export const SmallText = text(BSmallText)
export const TinyText = text(BTinyText)
