import dynamic from "next/dynamic"
import React from "react"

const DynamicLordIcon = dynamic(() => import("@/ui/atoms/LordIcon"), {
    ssr: false,
}) as any

const Mails = (props: any) => {
    return (
        <DynamicLordIcon name="mails" strokeWidth="0.3rem" width="24px" {...props} />
    )
}

export default Mails
