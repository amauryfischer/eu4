import { Avatar } from "@nextui-org/react"
import styled from "styled-components"

export const SAvatar = styled(Avatar)`
    ${({ onClick }) =>
			onClick &&
			`
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
            transition: transform 0.2s ease-in-out;
        }
    `}
`
