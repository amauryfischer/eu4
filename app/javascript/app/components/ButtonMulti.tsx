/* eslint-disable react/jsx-key */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { ButtonGroup } from "@mui/material"
import Menu from "@mui/material/Menu"
import React, { useState } from "react"
import styled from "styled-components"
import { BlueButton } from "styles/button"
import OptionButtonMulti from "./superReactTable/OptionButtonMulti"

const SMenu = styled(Menu)`
  display: ${(props: any) => (props.tempHide ? "none" : "initial")};
`
const StyledMenu = styled((props: any) => (
  <SMenu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    tempHide={props.tempHide}
    {...props}
  />
))`
  & .MuiPaper-root {
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
      0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  }
  & .MuiMenuItem-root:hover {
    background-color: var(--primary100);
  }
`

const SPrimaryOutlinedButton = styled(BlueButton)`
  width: none;
`
const SPrimaryButton = styled(BlueButton)`
  width: none;
`

const SButtonGroup = styled(ButtonGroup)`
  & > *:first-child {
    flex-grow: 1;
  }
`

const ButtonMulti = ({
  buttonLabel,
  options,
  secondary = false,
  onClick = undefined,
  icon = undefined,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [tempHide, setTempHide] = useState(false)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const ButtonContainer = secondary ? SPrimaryOutlinedButton : SPrimaryButton

  return (
    <>
      {onClick ? (
        <SButtonGroup variant="outlined" aria-label="split button">
          <BlueButton onClick={onClick} startIcon={icon}>
            {buttonLabel}
          </BlueButton>
          <BlueButton
            color="primary"
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleClick}
          >
            <KeyboardArrowDownIcon />
          </BlueButton>
        </SButtonGroup>
      ) : (
        <ButtonContainer
          aria-expanded={open ? "true" : undefined}
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {buttonLabel}
        </ButtonContainer>
      )}
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        tempHide={tempHide}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <OptionButtonMulti
            key={option.label}
            option={option}
            setTempHide={setTempHide}
            handleClose={handleClose}
          />
        ))}
      </StyledMenu>
    </>
  )
}

export default ButtonMulti
