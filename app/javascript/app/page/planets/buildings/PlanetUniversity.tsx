import React, { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Debug from "debug"
import styled, { css } from "styled-components"

// app:javascript:app:page:planets:buildings:PlanetUniversity.tsx
const debug = Debug(
  "app:javascript:app:page:planets:buildings:PlanetUniversity",
)
debug.log = console.log.bind(console)

const PlanetUniversity = ({}) => {
  return <>university</>
}

export default PlanetUniversity
