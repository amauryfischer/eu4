import {
	Avatar,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Tabs,
	Tab,
	Chip
} from "@nextui-org/react"
import React from "react"
import ResearchService from "@/services/ResearchService"
import styled from "styled-components"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import { TaskType } from "@prisma/client"
import moment from "moment"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import Button from "@/ui/atoms/buttons/Button"

const SGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
`

const PlanetResearch = () => {
	const { createTask, fetchTasks } = useTasksActions()
	const user = useCurrentUser()
	const startResearch = (researchId: string) => {
		createTask({
			type: TaskType.RESEARCH,
			endDate: moment()
				.add(ResearchService.allResearch[researchId].time, "minutes")
				.toISOString(),
			userId: user?.id,
			details: {
				research: researchId,
				time: ResearchService.allResearch[researchId].time
			}
		})
		fetchTasks()
	}
	return (
		<>
			<Tabs color="primary">
				<Tab key="todo" title="A faire">
					<div className="grid grid-cols-3 gap-4">
						{ResearchService.getAllResearch()
							.filter((research) => !user?.research.includes(research.id))
							.map((research) => (
								<Card key={research.name} className="max-w-[500px]">
									<CardHeader className="justify-between">
										<div className="flex gap-5">
											<Avatar
												isBordered
												radius="full"
												size="md"
												src={ResearchService.researchTypeToImage(research.type)}
											/>
											<div className="flex flex-col gap-1 items-start justify-center">
												<h4 className="text-small font-semibold leading-none text-default-600">
													{research.name}
												</h4>
											</div>
										</div>
										<Button
											size="sm"
											variant="bordered"
											onPress={() => startResearch(research.id)}
											isDisabled={research.required.some(
												(required) => !user?.research.includes(required)
											)}
										>
											Commencer
										</Button>
									</CardHeader>
									<CardBody className="px-3 py-0 text-small text-default-400">
										<p>{research.description}</p>
									</CardBody>
									<CardFooter className="gap-3">
										{research.required.map((required) => (
											<Chip
												key={required}
												size="sm"
												color={
													user?.research.includes(required)
														? "success"
														: "danger"
												}
												variant="bordered"
											>
												{ResearchService.allResearch[required].name}
											</Chip>
										))}
									</CardFooter>
								</Card>
							))}
					</div>
				</Tab>
				<Tab key="done" title="Terminé">
					<div className="flex flex-wrap gap-4">
						{ResearchService.getAllResearch()
							.filter((research) => user?.research.includes(research.id))
							.map((research) => (
								<Card key={research.name} className="max-w-[500px]">
									<CardHeader className="justify-between">
										<div className="flex gap-5">
											<Avatar
												isBordered
												radius="full"
												size="md"
												src={ResearchService.researchTypeToImage(research.type)}
											/>
											<div className="flex flex-col gap-1 items-start justify-center">
												<h4 className="text-small font-semibold leading-none text-default-600">
													{research.name}
												</h4>
											</div>
										</div>
										<Button
											radius="full"
											size="sm"
											color="success"
											variant="bordered"
											onPress={() => startResearch(research.id)}
										>
											Terminé
										</Button>
									</CardHeader>
									<CardBody className="px-3 py-0 text-small text-default-400">
										<p>{research.description}</p>
									</CardBody>
									<CardFooter className="gap-3" />
								</Card>
							))}
					</div>
				</Tab>
			</Tabs>
		</>
	)
}

export default PlanetResearch
