import LordIcon from "@/ui/atoms/LordIcon"
import React from "react"

const CreditCard = (
	props: Omit<React.ComponentProps<typeof LordIcon>, "name">,
) => {
	return (
		<LordIcon name="credit-card" strokeWidth="1rem" width="24px" {...props} />
	)
}

export default CreditCard
