import Add from "@/ui/fondations/icons/Add"
import { Dropdown } from "@nextui-org/react"
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
		<Dropdown.Item
			key={key}
			showFullDescription
			description={description}
			icon={icon}
		>
			{title}
		</Dropdown.Item>
	)
}

export default DropDownItem
