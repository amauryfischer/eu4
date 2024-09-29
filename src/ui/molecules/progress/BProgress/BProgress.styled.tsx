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
export const ShieldProgress = styled(Progress)<{ value: number }>`
    --color: ${({ value }) => {
			if (value < 10) {
				return "var(--red500)"
			}
			if (value < 20) {
				return "var(--red200)"
			}
			if (value < 30) {
				return "var(--caramel500)"
			}
			if (value < 40) {
				return "var(--cyan200)"
			}
			if (value < 50) {
				return "var(--cyan300)"
			}
			if (value < 60) {
				return "var(--cyan300)"
			}
			if (value < 70) {
				return "var(--blue200)"
			}
			if (value < 80) {
				return "var(--blue300)"
			}
			if (value < 90) {
				return "var(--blue400)"
			}
			if (value < 100) {
				return "var(--blue400)"
			}
			return "var(--blue900)"
		}};
				&  .bg-primary {
        background-color: var(--color);
    }
`
