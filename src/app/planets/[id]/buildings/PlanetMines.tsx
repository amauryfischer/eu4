import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import Button from "@/ui/atoms/buttons/Button"
import {
	Card,
	Image,
	ModalBody,
	ModalContent,
	ModalHeader,
	Table,
	TableBody,
	TableColumn,
	TableHeader,
	TableRow,
	TableCell,
	ModalFooter
} from "@nextui-org/react"
import React, { useState } from "react"
import moment from "moment"
import { TaskType } from "@prisma/client"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import BModal from "@/ui/molecules/modal/BModal"
const PlanetMines = () => {
	const user = useCurrentUser()
	const allResources = ResourcesService.getAllResources()
	const activePlanet = useCurrentPlayerActivePlanet()
	const currentResource = activePlanet?.resources
	const [isOpen, setIsOpen] = useState<RESOURCE_TYPES | null>(null)
	const { createTask, fetchTasks } = useTasksActions()
	const { fetchPlanets } = usePlanetsActions()
	const tasks = useTasks()
	const tailwindColorPercentage = (percentage: number) => {
		const red = "text-danger"
		const yellow = "text-warning"
		const green = "text-success"

		if (percentage < 30) {
			return red
		} else if (percentage < 70) {
			return yellow
		} else {
			return green
		}
	}
	const handleUpgrade = (resource: RESOURCE_TYPES) => {
		createTask({
			type: TaskType.UPGRADE_RESOURCE,
			endDate: moment()
				.add(activePlanet?.mines[resource] * 30, "seconds")
				.toISOString(),
			userId: user.id,
			details: {
				resource: resource,
				level: activePlanet?.mines[resource] || 1,
				planetId: activePlanet?.id
			}
		})
		setIsOpen(null)
		fetchTasks()
		fetchPlanets()
	}
	return (
		<div className="grid grid-cols-4 gap-4">
			{Object.values(allResources).map((resource) => (
				<Card
					key={resource.name}
					isFooterBlurred
					radius="lg"
					isPressable
					className="border-none"
					onClick={() => setIsOpen(resource.name)}
				>
					<Image
						alt="Woman listing to music"
						className="object-cover h-full"
						src={resource.img}
					/>
					<div className="flex flex-col absolute bottom-0 right-0 p-4 h-full justify-between">
						<div className="flex flex-col gap-1 items-end">
							<div
								className={`text-4xl font-bold flex items-baseline ${tailwindColorPercentage(
									activePlanet?.resourcesMultiplier[resource.name] * 100
								)}`}
							>
								{ResourcesService.calculateResourceSpeed({
									percentage:
										activePlanet?.resourcesMultiplier[resource.name] * 100,
									level: activePlanet?.mines[resource.name] || 1
								})}
								<div className="text-sm">/ minutes</div>
							</div>
							<div className="text-white text-xs">
								efficacité :{" "}
								{Math.round(
									activePlanet?.resourcesMultiplier[resource.name] * 100
								)}
								%
							</div>
						</div>
						{Object.values(tasks || []).some(
							(task) =>
								task.type === TaskType.UPGRADE_RESOURCE &&
								task.details.resource === resource.name
						) ? (
							<Button
								className="text-tiny text-white bg-black/20 border-primary/80 border-1"
								variant="flat"
								color="default"
								radius="lg"
								size="sm"
							>
								<div className="strike">
									Niveau {activePlanet?.mines[resource.name]}
								</div>{" "}
								{" => "}
								<div>Niveau {activePlanet?.mines[resource.name] + 1}</div>
							</Button>
						) : (
							<Button
								className="text-tiny text-white bg-black/20 border-white/20 border-1"
								variant="flat"
								color="default"
								radius="lg"
								size="sm"
								onClick={() => setIsOpen(resource.name)}
							>
								Niveau {activePlanet?.mines[resource.name]}
							</Button>
						)}
					</div>
				</Card>
			))}
			<BModal isOpen={!!isOpen} onClose={() => setIsOpen(null)} size="4xl">
				<ModalContent>
					<ModalHeader>Monter de niveau</ModalHeader>
					<ModalBody>
						<div className="flex gap-4 w-full">
							<Image
								alt="Resource image"
								src={allResources[isOpen]?.img}
								width={400}
							/>
							<div className="flex flex-col gap-2 w-full">
								<div className="text-lg font-bold">
									Niveau actuel: {activePlanet?.mines[isOpen]}
								</div>
								<Table aria-label="Resource Costs">
									<TableHeader>
										<TableColumn>Resource</TableColumn>
										<TableColumn>Cost</TableColumn>
									</TableHeader>
									<TableBody>
										{Object.values(allResources).map((resource) => {
											const asEnoughtResources =
												activePlanet?.resources[resource.name] >=
												ResourcesService.costToUpgrade(
													activePlanet?.mines[resource.name] || 1,
													resource.name
												)
											return (
												<TableRow key={resource.name}>
													<TableCell>
														<div className="flex items-center gap-2">
															<Image
																alt={resource.name}
																className="object-cover h-8 w-8"
																src={resource.img}
															/>

															{resource.name}
														</div>
													</TableCell>
													<TableCell>
														<div
															className={`${asEnoughtResources ? "text-success" : "text-danger"}`}
														>
															{Math.floor(
																ResourcesService.costToUpgrade(
																	activePlanet?.mines[isOpen] || 1,
																	resource.name
																)
															)}
														</div>
													</TableCell>
												</TableRow>
											)
										})}
									</TableBody>
								</Table>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="light"
							color="error"
							onClick={() => setIsOpen(null)}
						>
							Fermer
						</Button>
						{Object.values(tasks || []).some(
							(task) =>
								task.type === TaskType.UPGRADE_RESOURCE &&
								task.details.resource === isOpen
						) ? (
							<Button
								color="success"
								variant="bordered"
								isDisabled={ResourcesService.allResources.some(
									(resource) =>
										activePlanet?.resources[resource.name] <
										ResourcesService.costToUpgrade(
											activePlanet?.mines[resource.name] || 1,
											resource.name
										)
								)}
							>
								Niveau {activePlanet?.mines[isOpen]} en cours de construction
							</Button>
						) : (
							<Button
								color="primary"
								variant="bordered"
								onClick={() => handleUpgrade(isOpen as RESOURCE_TYPES)}
								isDisabled={ResourcesService.allResources.some(
									(resource) =>
										activePlanet?.resources[resource.name] <
										ResourcesService.costToUpgrade(
											activePlanet?.mines[resource.name] || 1,
											resource.name
										)
								)}
							>
								Monter de niveau
							</Button>
						)}
					</ModalFooter>
				</ModalContent>
			</BModal>
		</div>
	)
}

export default PlanetMines
