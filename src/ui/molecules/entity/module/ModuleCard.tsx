import { IModule } from "@/type/data/IModule"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import React from "react"

export interface ModuleCardProps {
	module: IModule
	actions: JSX.Element
}
const ModuleCard = ({ module, actions }: ModuleCardProps) => {
	return (
		<Card>
			<CardHeader>
				<h3>{module.name}</h3>
			</CardHeader>
			<CardBody>
				<p>{module.description}</p>
				<p>Coût: {JSON.stringify(module.cost)}</p>
				<p>Modifier: {JSON.stringify(module.modifier)}</p>
			</CardBody>
			<CardFooter>{actions}</CardFooter>
		</Card>
	)
}

export default ModuleCard
