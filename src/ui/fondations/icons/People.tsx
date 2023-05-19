import LordIcon from "@/ui/atoms/LordIcon"
import React from "react"

const People = (props: Omit<React.ComponentProps<typeof LordIcon>, "name">) => {
	return <LordIcon name="people" strokeWidth="1rem" width="24px" {...props} />
}

export default People
