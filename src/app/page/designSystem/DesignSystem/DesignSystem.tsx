import React from "react"
import ShipService from "@/services/ShipService"
import styled from "styled-components"
import Flex from "@/ui/atoms/Flex/Flex"
import BButton from "@/ui/atoms/buttons/BButton/BButton"
import ShipCard from "@/ui/molecules/entity/ship/ShipCard/ShipCard"

const Container = styled.div`
  width: 300px;
  height: 500px;
`
const Container2 = styled.div`
  width: 500px;
  height: 300px;
`
const DesignSystem = ({}) => {
	return (
		<Flex direction="column" gap="3rem">
			<h1>Design System</h1>

			<Flex direction="column" gap="2rem">
				<span>Primary Button</span>
				<Flex gap="2rem">
					<BButton $color="blue">Primary Button</BButton>
					<BButton $color="blue" variant="outlined">
						Secondary Button
					</BButton>
					<BButton $color="blue" variant="text">
						Ternary Button
					</BButton>
				</Flex>
			</Flex>
			<Flex direction="column" gap="2rem">
				<span>Dark button</span>
				<Flex gap="2rem">
					<BButton $color="blue800">Dark button</BButton>
					<BButton $color="blue800" variant="outlined">
						Secondary Button
					</BButton>
					<BButton $color="blue800" variant="text">
						Ternary Button
					</BButton>
				</Flex>
			</Flex>
			<Flex direction="column" gap="2rem">
				<span>Light Button</span>
				<Flex gap="2rem">
					<BButton $color="blue100">Light Button</BButton>
					<BButton $color="blue100" variant="outlined">
						Secondary Button
					</BButton>
					<BButton $color="blue100" variant="text">
						Ternary Button
					</BButton>
				</Flex>
			</Flex>
			<Flex direction="column" gap="2rem">
				<span>Disabled Button</span>
				<BButton $color="blue" disabled>
					Disabled Button
				</BButton>
			</Flex>
			<Flex direction="column" gap="2rem">
				<span>Disabled Button</span>
				<BButton $color="blue" disabled variant="outlined">
					Disabled Button
				</BButton>
			</Flex>

			<Flex direction="column" gap="2rem">
				<span>Ship card</span>
				<Container2>
					<ShipCard
						ship={Object.values(ShipService.getAllShips())[0]}
						onClick={() => {}}
					/>
				</Container2>
			</Flex>
		</Flex>
	)
}

export default DesignSystem
