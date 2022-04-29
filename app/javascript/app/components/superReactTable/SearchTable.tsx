import { IconButton, TextField } from "@mui/material"
import InputAdornment from "@mui/material/InputAdornment"
import ClearIcon from "@mui/icons-material/Clear"
import SearchIcon from "@mui/icons-material/Search"
import Debug from "debug"
import React from "react"
import styled from "styled-components"

const debug = Debug("app:javascript:utils:components:tables:SearchTable")
debug.log = console.log.bind(console)

const STextField = styled(TextField)`
  min-width: 250px;
  && input {
    padding: 8px !important;
  }
  flex-grow: 1;
`

const SearchTable = ({ globalFilter, setGlobalFilter }) => {
  return (
    <STextField
      type="search"
      placeholder="Rechercher"
      value={globalFilter || ""}
      onChange={(e) => {
        setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <>
            {globalFilter && (
              <InputAdornment position="start">
                <IconButton onClick={() => setGlobalFilter(undefined)}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )}
          </>
        ),
      }}
    />
  )
}

export default SearchTable
