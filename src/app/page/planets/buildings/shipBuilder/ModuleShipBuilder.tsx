import Flex from "@/ui/atoms/Flex"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { IconButton } from "@mui/material"
import styled from "styled-components"

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 1fr 1fr;
  padding: 1rem;
`
const StyledAddIcon = styled(AddIcon)<{ disabled?: boolean }>`
  color: white;
`
const StyledRemoveIcon = styled(RemoveIcon)<{ disabled?: boolean }>`
  color: white;
`
const StyledIconButton = styled(IconButton)<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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
			<p>{module.name}</p>
			<i>{module.description}</i>
			<Flex gap="1rem" alignItems="center">
				<StyledIconButton
					onClick={() => {
						setSelectedModules([...selectedModules, module])
					}}
				>
					<StyledAddIcon />
				</StyledIconButton>
				<div>{countNumberOfModules}</div>
				<StyledIconButton
					disabled={countNumberOfModules === 0}
					onClick={() => {
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
				>
					<StyledRemoveIcon />
				</StyledIconButton>
			</Flex>
		</Container>
	)
}

export default ModuleShipBuilder
