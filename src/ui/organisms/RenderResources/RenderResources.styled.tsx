import styled from "styled-components"

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 30px 200px 1fr;
    grid-gap: 0.5rem;
    max-width: fit-content;
    background-color: var(--grey800);
    border-radius: 1rem;
    padding: 1rem;
`
