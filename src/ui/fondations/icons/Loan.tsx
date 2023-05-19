import LordIcon from "@/ui/atoms/LordIcon"
import React from "react"

const Loan = (props: Omit<React.ComponentProps<typeof LordIcon>, "name">) => {
	return <LordIcon name="loan" strokeWidth="1rem" width="24px" {...props} />
}

export default Loan
