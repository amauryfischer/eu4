import Flex from "@/ui/atoms/Flex"
import AddButton from "@/ui/atoms/buttons/AddButton"
import MinusButton from "@/ui/atoms/buttons/MinusButton"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { IconButton } from "@mui/material"
import styled from "styled-components"
import { ModuleDescription, ModuleMainName } from "./ModuleShipBuilder.styled"

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 300px 200px;
  padding: 1rem;
`

const ModuleShipBuilder = ({
	module,
	setSelectedModules,
	selectedModules,
}: any) => {
	let countNumberOfModules = 0
	;(selectedModules ?? []).forEach((selectedModule: any) => {
		if (selectedModule.name === module.name) {
			countNumberOfModules += 1
		}
	})
	return (
		<Container>
			<img src={module.img} alt={module.name} width="60px" />

			<Flex direction="column">
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
