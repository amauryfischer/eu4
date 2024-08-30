import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import Flex from "@/ui/atoms/Flex"
import { GridContainer } from "./RenderResources.styled"

interface RenderResourcesProps {
	resources?: Record<RESOURCE_TYPES, number>
}

const RenderResources = ({ resources }: RenderResourcesProps) => {
	return (
		<GridContainer>
			{Object.values(ResourcesService.getAllResources()).map((resource) => (
				<>
					<img src={resource.img} width={25} height={25} />
					<div>{resource.name}</div>
					<div>
						{ResourcesService.renderResources(resources?.[resource.name] ?? 0)}
					</div>
				</>
			))}
		</GridContainer>
	)
}

export default RenderResources
