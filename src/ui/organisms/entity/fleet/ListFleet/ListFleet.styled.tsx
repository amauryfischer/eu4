import styled from "styled-components"

export const FleetGridContainer = styled.div<{ numberOfRows: number }>`
    display: grid;
    grid-template-columns: repeat(${({ numberOfRows }) => numberOfRows}, 1fr);
    padding: 1rem;
    justify-items: center; // Center items horizontally
    align-items: center;   // Center items vertically

`