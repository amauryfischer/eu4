"use client"
import Add from "@/ui/fondations/icons/Add"
import ArrowDown from "@/ui/fondations/icons/ArrowDown"
import { Button, Dropdown, Navbar, Text } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useHover, useHoverDirty } from "react-use"
import { styled } from "styled-components"
import DropDownTopBar from "./DropDownTopBar"
import Bitcoin from "@/ui/fondations/icons/BitCoin"
import CreditCard from "@/ui/fondations/icons/CrreditCard"
import Sell from "@/ui/fondations/icons/Sell"
import Loan from "@/ui/fondations/icons/Loan"
import People from "@/ui/fondations/icons/People"

const SNavbar = styled(Navbar)`
	--nextui--navbarContainerMaxWidth: 100%;
`

const TopBar = () => {
	const router = useRouter()
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	const ref = useRef(null)
	const isHovering = useHoverDirty(ref)
	const [isDropDownOpen, setIsDropDownOpen] = useState(false)
	return (
		<SNavbar isBordered variant="sticky">
			<Navbar.Brand>
				<div className="flex items-center gap-2">
					<img
						src="https://numerisk.fr/wp-content/themes/understrap/img/logo.png"
						width="30px"
						height="30px"
					/>
					<Text b color="inherit">
						Numérisk
					</Text>
				</div>
			</Navbar.Brand>
			<Navbar.Content
				enableCursorHighlight
				activeColor="secondary"
				hideIn="xs"
				variant="underline"
			>
				<DropDownTopBar
					selectedKey="/employees"
					title="Charges"
					setSelectedKeys={setSelectedKeys}
				>
					<Dropdown.Item
						key="/employees"
						showFullDescription
						description="ACME scales apps to meet user demand, automagically, based on load."
						icon={
							<People
								noLoop
								width="40px"
								strokeWidth="1.4rem"
								color="blue600"
							/>
						}
					>
						Employées
					</Dropdown.Item>
					<Dropdown.Item
						key="/charges_fixes"
						showFullDescription
						description="ACME scales apps to meet user demand, automagically, based on load."
						icon={<Bitcoin noLoop width="40px" strokeWidth="1.4rem" />}
					>
						Charges fixes
					</Dropdown.Item>
					<Dropdown.Item
						key="/charges_variables"
						showFullDescription
						description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
						icon={
							<CreditCard
								noLoop
								width="40px"
								strokeWidth="1.4rem"
								color="yellow600"
							/>
						}
					>
						Charges variables
					</Dropdown.Item>
				</DropDownTopBar>
				<DropDownTopBar
					selectedKey="/employees"
					title="Revenue"
					setSelectedKeys={setSelectedKeys}
				>
					<Dropdown.Item
						key="/clients"
						showFullDescription
						description="ACME scales apps to meet user demand, automagically, based on load."
						icon={
							<Sell
								noLoop
								width="40px"
								strokeWidth="1.4rem"
								color="emerald600"
							/>
						}
					>
						Clients
					</Dropdown.Item>
					<Dropdown.Item
						key="autres"
						showFullDescription
						description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
						icon={
							<Loan noLoop width="40px" strokeWidth="1.4rem" color="cyan400" />
						}
					>
						Autres
					</Dropdown.Item>
				</DropDownTopBar>
			</Navbar.Content>
			<Navbar.Content>
				<Navbar.Link color="inherit" href="#">
					Login
				</Navbar.Link>
				<Navbar.Item>
					<Button auto flat href="#">
						Sign Up
					</Button>
				</Navbar.Item>
			</Navbar.Content>
		</SNavbar>
	)
}

export default TopBar
