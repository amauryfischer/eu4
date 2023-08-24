import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import Flex from "@/ui/atoms/Flex/Flex"
import React from "react"
import styled from "styled-components"
export const CostText = styled.div`
  color: var(--grey300);
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DisplaySingleResource = ({
	cost,
	resource,
}: {
	cost: number
	resource: RESOURCE_TYPES
}) => {
	return (
		<>
			<CostText>{cost}</CostText>
			<img
				src={ResourcesService.getAllResources()[resource].img}
				alt="coin"
				width="25px"
				height="25px"
			/>
		</>
	)
}

export default DisplaySingleResource
