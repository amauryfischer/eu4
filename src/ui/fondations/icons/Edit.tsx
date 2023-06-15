import LordIcon from "@/ui/atoms/LordIcon"
import React from "react"

const Edit = (props: Omit<React.ComponentProps<typeof LordIcon>, "name">) => {
	return <LordIcon name="edit" strokeWidth="1rem" width="24px" {...props} />
}

export default Edit
