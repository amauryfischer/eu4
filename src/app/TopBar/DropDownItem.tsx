import Add from "@/ui/fondations/icons/Add"
import { Dropdown, DropdownItem } from "@nextui-org/react"
import { title } from "process"
import { useRef } from "react"
import { useHoverDirty } from "react-use"

interface DropDownItemProps {
	key: string
	title: string
	description: string
	icon: any
}

const DropDownItem = ({ key, title, description, icon }: DropDownItemProps) => {
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)

	return (
		<DropdownItem key={key} description={description}>
			{title}
		</DropdownItem>
	)
}

export default DropDownItem
