import dynamic from "next/dynamic"
import React from "react"
const DynamicLordIcon = dynamic(() => import("@/ui/atoms/LordIcon"), {
	ssr: false,
}) as any

const Mine = (props: any) => {
	return (
		<DynamicLordIcon name="mine" strokeWidth="0.8rem" width="32px" {...props} />
	)
}

export default Mine
