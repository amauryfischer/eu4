import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import styled from "styled-components"
import { MenuItem } from "@mui/material"
import Flex from "styles/Flex"
import ConfirmationModal from "components/ConfirmationModal"

// app:javascript:utils:components:buttonMultiComponent:OptionButtonMulti.tsx
const debug = Debug(
  "app:javascript:utils:components:buttonMultiComponent:OptionButtonMulti",
)
debug.log = console.log.bind(console)

const OptionButtonMulti = ({ option, handleClose, setTempHide }) => {
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false)
  if (option?.renderCondition ?? true) {
    return (
      <>
        <MenuItem
          disabled={option?.disabled ?? false}
          key={option.label}
          onClick={() => {
            if (option.requireValidation) {
              setIsOpenModalConfirm(true)
              setTempHide(true)
              return
            }
            option.onClick?.()
            handleClose()
          }}
        >
          <Flex gap="1rem">
            {option.icon}
            {option.label}
          </Flex>
        </MenuItem>
        <ConfirmationModal
          modalShown={isOpenModalConfirm}
          toggler={() => {
            setIsOpenModalConfirm(!isOpenModalConfirm)
            setTempHide(false)
            handleClose()
          }}
          onConfirm={() => {
            option?.onClick()
            setTempHide(false)
            handleClose()
          }}
          message={option.confirmMessage ?? ""}
        />
      </>
    )
  }
  return null
}

export default OptionButtonMulti
