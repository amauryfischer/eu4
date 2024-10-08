import Flex from "@/ui/atoms/Flex"
import AddButton from "@/ui/atoms/buttons/AddButton"
import MinusButton from "@/ui/atoms/buttons/MinusButton"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { IconButton } from "@mui/material"
import styled from "styled-components"
import { ModuleDescription, ModuleMainName } from "./ModuleShipBuilder.styled"
import { IModule } from "@/type/data/IModule"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import { Image } from "@nextui-org/react"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  gap: 3rem;
  &:hover {
    cursor: pointer;
	img {
		opacity: 0.8;
	}
  }
`

const ModuleShipBuilder = ({
	module,
	setSelectedModules,
	selectedModules
}: {
	module: IModule
	setSelectedModules: (selectedModules: Array<IModule>) => void
	selectedModules: Array<IModule>
}) => {
	let countNumberOfModules = 0
	const user = useCurrentUser()
	;(selectedModules ?? []).forEach((selectedModule: any) => {
		if (selectedModule.name === module.name) {
			countNumberOfModules += 1
		}
	})
	const requiredResearch = module?.requiredResearch ?? []
	if (
		requiredResearch.some((researchId) => !user.research.includes(researchId))
	) {
		return null
	}
	return (
		<Container
			onClick={() => {
				setSelectedModules([...selectedModules, module])
			}}
		>
			<Image
				isBlurred
				src={module.img}
				alt={module.name}
				width={80}
				className="m-4 w-20 max-w-20"
				classNames={{
					blurredImg: "w-28 max-w-28"
				}}
			/>

			<Flex direction="column" className="w-[300px] max-w-[300px]">
				<ModuleMainName>{module.name}</ModuleMainName>
				<ModuleDescription>{module.description}</ModuleDescription>
			</Flex>
			<Flex gap="1rem" alignItems="center" direction="row-reverse">
				<AddButton
					onPress={() => {
						setSelectedModules([...selectedModules, module])
					}}
					color="primary"
				/>
				<div>{countNumberOfModules}</div>
				<MinusButton
					onPress={() => {
						let hasBeenRemoved = false
						const result = [] as any
						selectedModules.forEach((m: any) => {
							if (m.name === module.name && !hasBeenRemoved) {
								hasBeenRemoved = true
								return
							} else {
								result.push(m)
							}
						})
						setSelectedModules(result)
					}}
					color="primary"
				/>
			</Flex>
		</Container>
	)
}

export default ModuleShipBuilder
