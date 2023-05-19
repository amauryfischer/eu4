import LordIcon from "@/ui/atoms/LordIcon"
import React from "react"

const Bitcoin = (
	props: Omit<React.ComponentProps<typeof LordIcon>, "name">,
) => {
	return <LordIcon name="bitcoin" strokeWidth="1rem" width="24px" {...props} />
}

export default Bitcoin
