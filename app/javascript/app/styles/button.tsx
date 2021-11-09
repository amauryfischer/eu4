import Button from "@mui/material/Button"
import React from "react"
import styled, { css } from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"

/**
 * New buttons
 */

export const StandardButton = styled(Button)`
  transition: all 0.3s !important;
  color: ${({ textColor }: any) =>
    textColor ? textColor : "white"} !important;
  font-size: 14px !important;
  text-transform: none !important;
  border-radius: 4px;
  font-weight: 400 !important;
  padding-right: 16px !important;
  padding-left: 16px !important;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  height: fit-content !important;
  &:hover {
    transition: all 0.3s !important;
    //transform: scale(1.05);
  }
` as any

const buildVar = (color: string, suffix = "") => `var(--${color}${suffix})`

const createColorButton = (color: string) => styled(StandardButton)`
  transition: 0.3s;
  background-color: ${buildVar(color, "700")} !important;
  &:hover {
    background-color: ${buildVar(color, "850")} !important;
    box-shadow: 0 14px 26px -12px ${buildVar(color, "850t42")},
      0 4px 23px 0px rgb(0 0 0 / 12%),
      0 8px 10px -5px ${buildVar(color, "850t20")};
  }
`

const createOutlinedColorButton = (color: string) => styled(StandardButton)`
  transition: 0.3s;
  color: ${buildVar(color, "700")} !important;
  border: 1px solid ${buildVar(color, "700t42")} !important;
  &:hover {
    border: 1px solid ${buildVar(color, "700")} !important;
  }
`

export const PrimaryButton = createColorButton("primary") as any
export const RedButton = createColorButton("red") as any
export const GreenButton = createColorButton("green") as any
export const OrangeButton = createColorButton("orange") as any
export const YellowButton = createColorButton("yellow") as any
export const PrimaryOutlinedButton = createOutlinedColorButton("primary") as any
export const GreenOutlinedButton = createOutlinedColorButton("green") as any
export const RedOutlinedButton = createOutlinedColorButton("red") as any

export const CreateButton = (props: any) => (
  <PrimaryButton {...props} startIcon={<AddIcon />}>
    Créer
  </PrimaryButton>
)

export const ModifyOutlinedButton = (props: any) => (
  <PrimaryOutlinedButton {...props}>Modifier</PrimaryOutlinedButton>
)

export const EditButton = (props: any) => (
  <PrimaryButton {...props}>Enregistrer</PrimaryButton>
)

export const DeleteButton = (props: any) => (
  <StandardButton variant="outlined" textColor="black" {...props}>
    Supprimer
  </StandardButton>
)

export const CancelButton = (props: any) => (
  <Button variant="text" {...props}>
    Annuler
  </Button>
)
