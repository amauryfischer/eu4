import { Progress } from "@nextui-org/react"
import { BaseProgress } from "./BProgress.styled"

const BProgress = (props: React.ComponentProps<typeof Progress>) => {
	return <BaseProgress {...props} />
}

export default BProgress
