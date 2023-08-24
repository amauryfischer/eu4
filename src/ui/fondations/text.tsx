import styled from "styled-components"
import React from "react"
import colored from "@/utils/colored"

export const text = (Component: React.ComponentType) =>
	colored(styled(Component)`
    color: var(--text-color);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
  `)

export const Text = text("div" as any)
