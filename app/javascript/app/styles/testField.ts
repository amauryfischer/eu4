import { TextField } from "@mui/material"
import styled from "styled-components"

export const YellowTextField = styled(TextField)`
  & > div {
    color: yellow !important;
  }
  & fieldset {
    border-color: yellow !important;
  }
  & span {
    color: yellow !important;
  }
  & label {
    color: yellow !important;
  }
`
