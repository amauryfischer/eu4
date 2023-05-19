import LordIcon from "@/ui/atoms/LordIcon"
import React from "react"

const ArrowDown = (
	props: Omit<React.ComponentProps<typeof LordIcon>, "name">,
) => {
	return (
		<LordIcon name="arrow-down" {...props} strokeWidth="1rem" width="24px" />
	)
}

export default ArrowDown
