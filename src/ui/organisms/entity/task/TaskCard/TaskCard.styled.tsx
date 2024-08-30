import { Card } from "@nextui-org/react"
import { styled } from "styled-components"

export const TaskCardContainer = styled.div`
    
`
export const StyledTaskCard = styled(Card)`
    background-color: transparent !important;
    box-shadow: none !important;
    width: calc(${window.innerWidth / window.innerHeight} * 100vh / 12) !important;
`
