import { TextField } from "@mui/material"
import { Modal, ModalFooter } from "reactstrap"
import styled, { css } from "styled-components"

export const SBaseModal = styled(Modal)<{
  $baseHeight?: number
  $baseWidth?: number
}>`
  transition: all 0.3s ease-in !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px !important;
  max-width: var(--modal-max-width) !important;
  ${({ forceFullWidth }) => forceFullWidth && "width: 100% !important;"}
  max-width: initial !important;
  overflow: hidden;
  && .modal-content {
    transition: 0.3s;
    max-width: var(--modal-max-width) !important;

    ${({ $baseWidth }) =>
      $baseWidth
        ? css`
            width: min(var(--modal-width), ${$baseWidth}px) !important;
          `
        : css`
            width: var(--modal-width) !important;
          `}

    ${({ $baseHeight }) =>
      $baseHeight
        ? css`
            height: min(var(--modal-max-height), ${$baseHeight}px);
          `
        : css`
            max-height: var(--modal-max-height);
          `}
  }
  && .modal-content .modal-header {
    color: var(--primary999) !important;
  }
  && .modal-content .modal-body {
    transition: 0.3s;
    overflow: auto;
  }
`

/**
 * # Bigger Modal from reactstrap
 * * <b>isOpen</b>: boolean
 * * <b>toggle</b>: function
 */
export const StyledModal = styled(SBaseModal)`
  padding: 0 !important;
`

export const SmallModal = styled(SBaseModal)`
  padding: 0 !important;
  max-width: 800px !important;
`

export const StyledTextField = styled(TextField)`
  width: 100%;
`

export const MediumStyledModal = styled(SBaseModal)`
  padding: 0 !important;
  max-width: 1400px !important;
`

export const MaxStyledModal = styled(SBaseModal)`
  width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  max-width: 100% !important;
`

export const BigStyledModal = styled(SBaseModal)`
  padding: 0 !important;
  max-width: 90% !important;
`

export const SModalFooter = styled(ModalFooter)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem !important;
  gap: 0.5rem;

  & > * {
    margin: 0 !important;
  }
`
