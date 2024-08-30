import LordIcon from "@/ui/atoms/LordIcon/LordIcon"
import dynamic from "next/dynamic"
import React from "react"
const DynamicLordIcon = dynamic(() => import("@/ui/atoms/LordIcon"), {
	ssr: false,
}) as any
const Add = (props: any) => {
	return <DynamicLordIcon name="add" strokeWidth="1rem" width="24px" {...props} />
}

export default Add
