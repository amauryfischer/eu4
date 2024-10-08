import BProgress from "@/ui/molecules/progress/BProgress"
import styled from "styled-components"

export const StyledProgress = styled(BProgress)`
    width: 100%;
    width: 100%;
    height: 0.9rem;
    border-radius: 0.5rem;
    & > div {
        border-radius: 0.5rem;
    }
`
const FuelBar = ({
	progress,
	className
}: { progress: number; className?: string }) => {
	return (
		<div className="flex items-center gap-2">
			<StyledProgress
				aria-label="Loading..."
				value={Math.floor(progress * 100) / 100}
				className={`max-w-md min-w-[200px] ${className}`}
			/>
			<span className="text-white">{Math.floor(progress * 100) / 100}%</span>
		</div>
	)
}

export default FuelBar
