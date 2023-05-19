import LordIcon from "@/ui/atoms/LordIcon"
import React from "react"

const Add = (props: Omit<React.ComponentProps<typeof LordIcon>, "name">) => {
	return <LordIcon name="add" strokeWidth="1rem" width="24px" {...props} />
}

export default Add
