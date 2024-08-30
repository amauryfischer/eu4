import { Progress } from "@nextui-org/react"
import styled from "styled-components"

export const BaseProgress = styled(Progress)<{ value: number }>`
    --color: ${({ value }) => {
			if (value < 15) {
				return "var(--error)"
			}
			if (value < 30) {
				return "var(--warning)"
			}
			if (value < 50) {
				return "var(--yellow)"
			}
			if (value < 70) {
				return "var(--primary)"
			}
			if (value < 85) {
				return "var(--emerald300)"
			}
			if (value <= 100) {
				return "var(--success)"
			}
			return "var(--error)"
		}};
    &  .bg-primary {
        background-color: var(--color);
    }
`
