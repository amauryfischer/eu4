"use client"
import Add from "@/ui/fondations/icons/Add"
import ArrowDown from "@/ui/fondations/icons/ArrowDown"
import {
	Button,
	Dropdown,
	DropdownItem,
	Kbd,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useHover, useHoverDirty } from "react-use"
import { styled } from "styled-components"
import DropDownTopBar from "./DropDownTopBar"
import Bitcoin from "@/ui/fondations/icons/BitCoin"
import CreditCard from "@/ui/fondations/icons/CrreditCard"
import Sell from "@/ui/fondations/icons/Sell"
import Loan from "@/ui/fondations/icons/Loan"
import People from "@/ui/fondations/icons/People"

const SNavbar = styled(Navbar)`
	background-color: white !important;
	z-index: 999 !important;
`

const TopBar = () => {
	const router = useRouter()
	const pathName = usePathname()
	const ref = useRef(null)
	// shortcut
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "a") {
				router.push("/employees")
			}
			if (e.key === "b") {
				router.push("/charges_fixes")
			}
			if (e.key === "c") {
				router.push("/charges_variables")
			}
		}
		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [])
	return (
		<SNavbar isBordered variant="sticky">
			<NavbarBrand>
				<div className="flex items-center gap-2">
					<img
						src="https://numerisk.fr/wp-content/themes/understrap/img/logo.png"
						width="30px"
						height="30px"
					/>
					<div>Numérisk</div>
				</div>
			</NavbarBrand>
			<NavbarContent className="">
				<NavbarItem
					className="min-w-16"
					as={Link}
					isActive={pathName === "/dashboard"}
					color="foreground"
					href="/dashboard"
					onClick={() => {
						//router.push("/dashboard")
					}}
				>
					Dashboard
				</NavbarItem>
				<DropDownTopBar
					title="Charges"
					isActive={
						pathName === "/employees" ||
						pathName === "/charges_fixes" ||
						pathName === "/charges_variables"
					}
				>
					<DropdownItem
						key="/employees"
						description="ACME scales apps to meet user demand, automagically, based on load."
						startContent={
							<People
								noLoop
								width="40px"
								strokeWidth="1.4rem"
								color="blue600"
							/>
						}
						shortcut="A"
					>
						Employées
					</DropdownItem>
					<DropdownItem
						key="/charges_fixes"
						description="ACME scales apps to meet user demand, automagically, based on load."
						startContent={<Bitcoin noLoop width="40px" strokeWidth="1.4rem" />}
						shortcut="Z"
					>
						Charges fixes
					</DropdownItem>
					<DropdownItem
						key="/charges_variables"
						description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
						shortcut="E"
						startContent={
							<CreditCard
								noLoop
								width="40px"
								strokeWidth="1.4rem"
								color="purple700"
							/>
						}
					>
						Charges variables
					</DropdownItem>
				</DropDownTopBar>
				<DropDownTopBar
					isActive={pathName === "/clients" || pathName === "/autres"}
					title="Revenue"
				>
					<DropdownItem
						key="/clients"
						shortcut={<Kbd className="w-20">Ctrl + K</Kbd>}
						description="ACME scales apps to meet user demand, automagically, based on load."
						startContent={
							<Sell
								noLoop
								width="40px"
								strokeWidth="1.4rem"
								color="emerald600"
							/>
						}
					>
						Clients
					</DropdownItem>
					<DropdownItem
						key="autres"
						description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
						startContent={
							<Loan noLoop width="40px" strokeWidth="1.4rem" color="cyan400" />
						}
					>
						Autres
					</DropdownItem>
				</DropDownTopBar>
				<NavbarItem
					className="min-w-16 flex-1"
					as={Link}
					color="foreground"
					href="#"
				>
					Login
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem as={Link} color="foreground" href="#">
					<Button variant="light" href="#">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent>
		</SNavbar>
	)
}

export default TopBar
