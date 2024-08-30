import dynamic from "next/dynamic"
import React from "react"


const DynamicLordIcon = dynamic(() => import("@/ui/atoms/LordIcon"), {
	ssr: false,
}) as any


const Delete = (props: any) => {
	return <DynamicLordIcon name="delete" strokeWidth="0.5rem" width="24px" {...props} />
}

export default Delete
