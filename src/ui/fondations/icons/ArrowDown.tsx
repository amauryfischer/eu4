import dynamic from "next/dynamic"
import React from "react"
const DynamicLordIcon = dynamic(() => import("@/ui/atoms/LordIcon"), {
	ssr: false,
}) as any
const ArrowDown = (props: any) => {
	return (
		<DynamicLordIcon
			name="arrow-down"
			strokeWidth="1rem"
			width="24px"
			{...props}
		/>
	)
}

export default ArrowDown
