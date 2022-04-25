import { Button } from "@mui/material"
import styled, { css } from "styled-components"
import React from "react"

const BaseButton = styled(Button)<{
  $color: string
  $textColor: string
  disabled: boolean
}>`
  transition: 0.2s !important;
  box-shadow: 0 0 4px #999;
  text-transform: none !important;
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
  width: fit-content;
  height: fit-content;
  text-decoration: none !important;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `}
  ${({ $color }) =>
    css`
      background: !important;
      background: linear-gradient(
          to left,
          var(--${$color}500) 50%,
          var(--${$color}700) 50%
        )
        right !important;
    `};

  color: ${({ $textColor }) =>
    $textColor ? `var(--${$textColor}900)` : "white"} !important;

  background-size: 200% !important;

  &:hover {
    transform: translateY(-0.2rem);
    background-position: left !important;
    ${({ $color }) =>
      css`
        box-shadow: rgba(var(--${$color}500-rgb), 0.5) 0px 3px 6px -2px,
          rgba(var(--${$color}500-rgb), 0.2) 0px 8px 10px 0px,
          rgba(var(--${$color}500-rgb), 0.1) 0px 2px 20px 0px;
      `};
  }

  &:active {
    transform: scale(0.9);
    ${({ $color }) =>
      css`
        box-shadow: rgba(var(--${$color}500-rgb), 0.2) 0px 1px 3px -1px,
          rgba(var(--${$color}500-rgb), 0.18) 0px 4px 5px 0px,
          rgba(var(--${$color}500-rgb), 0.12) 0px 1px 10px 0px;
      `};
  }
`

export const BlueButton = (props: any) => {
  return <BaseButton {...props} $color="blue" />
}
export const PurpleButton = (props: any) => {
  return <BaseButton {...props} $color="purple" />
}
export const GreenButton = (props: any) => {
  return <BaseButton {...props} $color="green" />
}
export const YellowButton = (props: any) => {
  return <BaseButton {...props} $color="yellow" />
}
export const RedButton = (props: any) => {
  return <BaseButton {...props} $color="red" />
}
export const CyanButton = (props: any) => {
  return <BaseButton {...props} $color="cyan" $textColor="grey" />
}
export const PinkButton = (props: any) => {
  return <BaseButton {...props} $color="pink" />
}
export const GreyButton = (props: any) => {
  return <BaseButton {...props} $color="grey" />
}
