import React, { useState, useEffect, useMemo } from "react"
import Debug from "debug"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { useParams } from "react-router"
import ParcelService from "services/ParcelService"

// app:javascript:app:page:universe:ParcelDetails.tsx
const debug = Debug("app:javascript:app:page:universe:ParcelDetails.tsx")
debug.log = console.log.bind(console)

const ParcelDetails = ({}) => {
  const { id, parcelId } = useParams()

  return <>yo</>
}

export default ParcelDetails
