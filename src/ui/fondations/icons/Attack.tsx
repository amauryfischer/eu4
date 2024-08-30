import dynamic from "next/dynamic"
import React from "react"

const DynamicLordIcon = dynamic(() => import("@/ui/atoms/LordIcon"), {
	ssr: false,
}) as any

const Attack = (props: any) => {
	return (
		<DynamicLordIcon name="attack" strokeWidth="2rem" width="24px" {...props} />
	)
}

export default Attack
