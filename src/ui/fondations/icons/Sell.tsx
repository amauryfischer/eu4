import LordIcon from "@/ui/atoms/LordIcon"
import React from "react"

const Sell = (props: Omit<React.ComponentProps<typeof LordIcon>, "name">) => {
	return <LordIcon name="sell" strokeWidth="1rem" width="24px" {...props} />
}

export default Sell
