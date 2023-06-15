import LordIcon from "@/ui/atoms/LordIcon"
import React from "react"

const Delete = (props: Omit<React.ComponentProps<typeof LordIcon>, "name">) => {
	return <LordIcon name="delete" strokeWidth="1rem" width="24px" {...props} />
}

export default Delete
