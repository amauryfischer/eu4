import React from "react"
import { ModalBody, ModalHeader } from "reactstrap"
import { BlueButton } from "styles/button"
import { SmallModal, SModalFooter } from "styles/modal"

const ConfirmationModal = ({
  modalShown,
  toggler,
  onConfirm,
  onConfirmName = "Confirmer",
  secondConfirmChoice = undefined,
  secondConfirmChoiceName = "Seconde Action",
  message,
}) => {
  return (
    <SmallModal isOpen={modalShown} toggle={toggler}>
      <ModalHeader>Confirmation</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <SModalFooter>
        <BlueButton onClick={toggler} />
        {secondConfirmChoice && (
          <BlueButton onClick={secondConfirmChoice}>
            {secondConfirmChoiceName}
          </BlueButton>
        )}
        <BlueButton onClick={onConfirm}>{onConfirmName}</BlueButton>
      </SModalFooter>
    </SmallModal>
  )
}

export default ConfirmationModal
