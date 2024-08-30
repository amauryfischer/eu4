import styled from "styled-components"

export const FleetGridContainer = styled.div<{ numberOfRows: number }>`
    display: grid;
    grid-template-columns: repeat(${({ numberOfRows }) => numberOfRows}, 1fr);
    grid-gap: .5rem;
`
