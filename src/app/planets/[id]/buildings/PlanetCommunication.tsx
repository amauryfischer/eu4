import React, { useState, useRef } from "react"
import styled from "styled-components"
import Xarrow from "react-xarrows"

const data = [
	{
		id: "cargom",
		title: "Répartition de la charge",
		children: [
			{
				id: "cargol",
				title: "Structure de stockage en alliage de titane renforcé",
				children: [
					{
						id: "cargoxl",
						title: "Système de stockage par confinement magnétique avancé",
						children: [
							{
								id: "cargo_xl_adv",
								title: "Conteneur de stockage ultra avancé",
								children: []
							},
							{
								id: "cargo_xl_adv2",
								title: "Conteneur de stockage ultra avancé",
								children: []
							}
						]
					},
					{
						id: "cargo_xl_adv3",
						title: "Conteneur de stockage ultra avancé",
						children: []
					}
				]
			},
			{
				id: "cargoter",
				title: "Conteneur de stockage amélioré",
				children: []
			},
			{
				id: "suivi",
				title: "Suivi de la charge",
				children: []
			},
			{
				id: "laser2",
				title: "Amélioration de la focalisation laser",
				children: [
					{
						id: "laser39",
						title: "Amplificateur de rayon laser",
						children: []
					}
				]
			},
			{
				id: "laser3",
				title: "Amplificateur de rayon laser",
				children: []
			}
		]
	}
]

const NodeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`

const Node = styled.div<{ selected: boolean }>`
	padding: 1rem;
	margin: 1rem;
	border: 1px solid #000;
	border-radius: 8px;
	cursor: pointer;
	transition: transform 0.2s;
	transform: ${({ selected }) => (selected ? "scale(1.05)" : "scale(1)")};
`

const ChildrenContainer = styled.div`
	display: flex;
	margin-top: 1rem;
	position: relative;
`

const PlanetCommunication = () => {
	const [selectedSkills, setSelectedSkills] = useState<string[]>([])

	const handleSkillClick = (id: string) => {
		setSelectedSkills((prev) => [...prev, id])
	}

	const renderNode = (node, isChild = false, parentId = null) => (
		<NodeContainer key={node.id}>
			<Node
				selected={selectedSkills.includes(node.id)}
				onClick={() => handleSkillClick(node.id)}
				id={node.id}
			>
				{node.title}
			</Node>
			{node.children.length > 0 && (
				<ChildrenContainer>
					{node.children.map((child, index) => (
						<React.Fragment key={child.id}>
							{renderNode(child, true, node.id)}
							<Xarrow
								start={node.id}
								end={child.id}
								color="black"
								startAnchor={"bottom"}
								endAnchor={"top"}
								strokeWidth={2}
								curveness={0.5}
								showTail={false}
							/>
						</React.Fragment>
					))}
				</ChildrenContainer>
			)}
		</NodeContainer>
	)

	return (
		<ChildrenContainer>
			{data.map((node) => renderNode(node))}
		</ChildrenContainer>
	)
}

export default PlanetCommunication
