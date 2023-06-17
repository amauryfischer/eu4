import Add from "@/ui/fondations/icons/Add"
import ArrowDown from "@/ui/fondations/icons/ArrowDown"
import {
	Button,
	Dropdown,
	DropdownMenu,
	DropdownTrigger,
	Navbar,
	NavbarItem,
} from "@nextui-org/react"
import { useRef, useState } from "react"
import { useHover, useHoverDirty } from "react-use"
import DropDownItem from "./DropDownItem"
import { useRouter } from "next/navigation"

const DropDownTopBar = ({
	title,
	children,
	isActive,
}: {
	title: string
	children: any
	isActive: boolean
}) => {
	const ref = useRef(null)
	const router = useRouter()
	const isHovering = useHoverDirty(ref)
	const [isDropDownOpen, setIsDropDownOpen] = useState(false)
	return (
		<Dropdown
			onOpenChange={(e) => {
				return setIsDropDownOpen(e)
			}}
		>
			<NavbarItem isActive={isActive}>
				<DropdownTrigger>
					<Button
						variant="light"
						ref={ref}
						className="text-base w-16"
						endIcon={
							<ArrowDown
								color="grey900"
								isHovering={isHovering}
								shouldRotate={isDropDownOpen}
								width="16px"
							/>
						}
					>
						{title}
					</Button>
				</DropdownTrigger>
			</NavbarItem>
			<DropdownMenu
				aria-label="ACME features"
				disallowEmptySelection
				selectionMode="single"
				className="w-96 gap-2"
				onSelectionChange={(e) => {
					// @ts-ignore
					router.push(`${e.currentKey}`)
				}}
			>
				{children}
			</DropdownMenu>
		</Dropdown>
	)
}

export default DropDownTopBar
