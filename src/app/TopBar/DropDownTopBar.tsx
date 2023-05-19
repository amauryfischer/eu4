import Add from "@/ui/fondations/icons/Add"
import ArrowDown from "@/ui/fondations/icons/ArrowDown"
import { Dropdown, Navbar } from "@nextui-org/react"
import { useRef, useState } from "react"
import { useHover, useHoverDirty } from "react-use"
import DropDownItem from "./DropDownItem"
import { useRouter } from "next/navigation"

const DropDownTopBar = ({
	selectedKey,
	title,
	children,
	setSelectedKeys,
}: {
	selectedKey: string
	title: string
	children: any
	setSelectedKeys: any
}) => {
	const ref = useRef(null)
	const router = useRouter()
	const isHovering = useHoverDirty(ref)
	const [isDropDownOpen, setIsDropDownOpen] = useState(false)
	return (
		<Dropdown
			isBordered
			onOpenChange={(e) => {
				return setIsDropDownOpen(e)
			}}
		>
			<Navbar.Item>
				<Dropdown.Button
					auto
					light
					ref={ref}
					css={{
						px: 0,
						dflex: "center",
						svg: { pe: "none" },
					}}
					iconRight={
						<ArrowDown
							color="grey900"
							isHovering={isHovering}
							shouldRotate={isDropDownOpen}
						/>
					}
					ripple={false}
				>
					{title}
				</Dropdown.Button>
			</Navbar.Item>
			<Dropdown.Menu
				aria-label="ACME features"
				disallowEmptySelection
				selectionMode="single"
				css={{
					$$dropdownMenuWidth: "340px",
					$$dropdownItemHeight: "70px",
					"& .nextui-dropdown-item": {
						py: "$4",
						// dropdown item left icon
						svg: {
							color: "$secondary",
							mr: "$4",
						},
						// dropdown item title
						"& .nextui-dropdown-item-content": {
							w: "100%",
							fontWeight: "$semibold",
						},
					},
				}}
				onSelectionChange={(e) => {
					// @ts-ignore
					setSelectedKeys(e.currentKey)
					// @ts-ignore
					router.push(`${e.currentKey}`)
				}}
				selectedKeys={selectedKey}
			>
				{children}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default DropDownTopBar
