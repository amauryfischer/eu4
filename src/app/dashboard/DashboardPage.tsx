"use client"

import { Charge, Employee } from "@prisma/client"
import { Client } from "../clients/ClientPage"
import { useMemo } from "react"
import Moment from "moment"
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ReferenceLine,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import moment from "moment"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { styled } from "styled-components"
import { FormProvider, useForm } from "react-hook-form"
import FSelect from "@/ui/molecules/forms/FSelect"

interface DashboardPageProps {
	clients: Client[]
	charges: Charge[]
	employees: Employee[]
}

const NUMBER_YEARS = 2

const DashboardPageContainer = styled.div`
`

const isInDateRange = (
	currentDate: Moment.Moment,
	startDate: Moment.Moment,
	endDate: Moment.Moment,
) => {
	return (
		currentDate.isSameOrAfter(startDate) && currentDate.isSameOrBefore(endDate)
	)
}
// price format is "€1,350.00" or "€450.00"
const calculatePrix = (prix: string) => {
	return parseFloat(prix.replace("€", "").replace(",", ""))
}

const DashboardPage = ({ clients, charges, employees }: DashboardPageProps) => {
	const methods = useForm()
	const scenario = methods.watch("scenario") as string
	const calculatedCostEachMonths = useMemo(() => {
		const withScenario = scenario !== ""
		const costs = [
			{
				cost: 88000,
				time: Moment().add(-1, "month").unix(),
				logs: [{ type: "charge", details: "Initialisation" }],
			},
		] as {
			cost: number
			time: number
			logs: {
				type: string
				details: string
			}[]
		}[]
		let currentDate = Moment().startOf("month")
		for (let i = 0; i < NUMBER_YEARS * 12; i++) {
			const logs = [] as {
				type: string
				details: string
			}[]

			/**
			 * Charges
			 **/
			const costCharges = charges.reduce((acc, charge) => {
				if (charge.scenario !== "") {
					if (scenario !== charge.scenario) {
						return acc
					}
				}
				// if not in date range, return acc
				if (
					!isInDateRange(
						currentDate,
						Moment(charge.dateDebut, "DD/MM/YYYY"),
						Moment(charge.dateFin, "DD/MM/YYYY"),
					)
				)
					return acc
				switch (charge.frequency) {
					case "Mensuel":
						logs.push({
							type: "charges",
							details: charge.nom + "(mensuel) : " + charge.montant,
						})
						return acc + charge.montant
					case "Annuel":
						logs.push({
							type: "charges",
							details: charge.nom + "(annuel) : " + charge.montant / 12,
						})
						return acc + charge.montant / 12
					case "Unique":
						if (
							Moment(charge.dateDebut, "DD/MM/YYYY").month() ===
								currentDate.month() &&
							Moment(charge.dateDebut, "DD/MM/YYYY").year() ===
								currentDate.year() &&
							Moment(charge.dateFin, "DD/MM/YYYY").month() ===
								currentDate.month() &&
							Moment(charge.dateFin, "DD/MM/YYYY").year() === currentDate.year()
						) {
							logs.push({
								type: "charges",
								details: charge.nom + "(unique) : " + charge.montant,
							})
							return acc + charge.montant
						}
						return acc
					default:
						return acc
				}
			}, 0)

			/**
			 * Clients
			 **/
			const costClients = clients.reduce((acc, client) => {
				const dateSignature = Moment(client["Date de signature"])
				const dateFinContrat = Moment(client["Date de fin de contrat"])

				/**
				 * Clients : Licence
				 **/
				if (client["Type de prestation"].includes("Licence")) {
					if (!isInDateRange(currentDate, dateSignature, dateFinContrat))
						return acc

					if (!client["Paiement annuel"]) {
						if (
							dateSignature.month() === currentDate.month() &&
							dateSignature.year() === currentDate.year()
						) {
							logs.push({
								type: "clients",
								details:
									client["Type de prestation"] +
									" " +
									client.Commune +
									"(paiement unique) : " +
									calculatePrix(client.Prix),
							})
							return acc + calculatePrix(client.Prix)
						}
					}

					if (
						dateSignature.month() === currentDate.month() &&
						dateSignature.year() === currentDate.year()
					) {
						logs.push({
							type: "clients",
							details:
								client["Type de prestation"] +
								" " +
								client.Commune +
								"(annuel) : " +
								calculatePrix(client.Prix) / client["Nb années license"],
						})
						return (
							acc + calculatePrix(client.Prix) / client["Nb années license"]
						)
					}

					return acc

					/**
					 * Clients : Prestation unique
					 **/
				} else {
					if (client.Facturation === "ENCAISSÉ") {
						return acc
					}
					if (!client["Date de signature"]) {
						// only if last month of current year
						if (
							moment().year() === currentDate.year() &&
							currentDate.month() === 11
						) {
							logs.push({
								type: "clients",
								details:
									client["Type de prestation"] +
									" " +
									client.Commune +
									"Prestation unique sans date de signature : " +
									calculatePrix(client.Prix),
							})
							return acc + calculatePrix(client.Prix)
						}
						return acc
					}
					if (dateSignature.isBefore(Moment())) {
						throw new Error("Date de signature is before today")
					}
					if (
						dateSignature.month() === currentDate.month() &&
						dateSignature.year() === currentDate.year()
					) {
						logs.push({
							type: "clients",
							details:
								client["Type de prestation"] +
								" " +
								client.Commune +
								"Prestation unique avec date de signature : " +
								calculatePrix(client.Prix),
						})
						return acc + calculatePrix(client.Prix)
					}
				}
				return acc
			}, 0)

			/**
			 * Employees
			 **/
			const costEmployees = employees.reduce((acc, employee) => {
				if (employee.scenario !== "") {
					if (scenario !== employee.scenario) {
						return acc
					}
				}

				const dateDebut = Moment(employee.dateDebut, "DD/MM/YYYY")
				const dateFin = Moment(employee.dateFin, "DD/MM/YYYY")
				if (!isInDateRange(currentDate, dateDebut, dateFin)) return acc

				if (employee.type === "CDI") {
					return acc - employee.salaire * 2
				} else if (employee.type === "Alternance") {
					return acc - employee.salaire * 1.1
				} else if (employee.type === "Stage") {
					return acc - employee.salaire * 1.1
				} else if (employee.type === "Gérant") {
					return acc - employee.salaire * 1.4
				}
				return acc
			}, 0)
			logs.push({ type: "salaires", details: "Salaires : " + costEmployees })

			costs.push({
				cost:
					(costs[costs.length - 1]?.cost || 0) +
					costCharges +
					costClients +
					costEmployees,
				time: currentDate.unix(),
				logs,
			})
			currentDate = currentDate.add(1, "month")
		}
		return costs
	}, [clients, charges, employees, scenario])

	return (
		<DashboardPageContainer>
			<div className="container flex justify-between w-full mx-auto flex-col gap-4 my-16">
				<div className="container flex justify-between w-full mx-auto">
					<h1 className="text-4xl font-bold text-center text-gray-900">
						Dashboard
					</h1>
					<FormProvider {...methods}>
						<FSelect
							name="scenario"
							label="Scénario"
							options={[
								{ label: "Scénario 1", value: "Scenario 1" },
								{ label: "Pas de scénario", value: "" },
							]}
							placeholder="Pas de scénario"
						/>
					</FormProvider>
				</div>
				<LineChart
					height={600}
					data={calculatedCostEachMonths}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<XAxis
						dataKey="time"
						scale="time"
						tickFormatter={(unixTime) =>
							Moment.unix(unixTime).format("MM/YYYY")
						}
						type="number"
						domain={["dataMin", "dataMax"]}
						ticks={calculatedCostEachMonths.map((cost) => cost.time)}
					/>
					<Tooltip
						labelFormatter={(unixTime) =>
							Moment.unix(unixTime).format("MM/YYYY")
						}
						formatter={(value) => `${value}€`}
						content={(props: any) => {
							return (
								<div style={{ backgroundColor: "white", padding: 10 }}>
									<h3
										className={
											props.payload[0]?.value > 0
												? "text-green-500"
												: "text-red-500"
										}
									>
										{Math.round(props.payload[0]?.value)}€
									</h3>
									<div>{Moment.unix(props.label).format("MM/YYYY")}</div>
									{props.payload[0]?.payload.logs.map(
										(log: { details: string; type: string }) => (
											<div key={log.details}>{log.details}</div>
										),
									)}
								</div>
							)
						}}
					/>
					<YAxis />
					<Legend />
					<ReferenceLine y={0} stroke="#000" />
					<Line
						type="natural"
						dataKey="cost"
						stroke="#8884d8"
						strokeWidth={"3px"}
					/>
				</LineChart>
				<Table>
					<TableHeader>
						<TableColumn>Mois</TableColumn>
						<TableColumn>Coût</TableColumn>
						<TableColumn>Logs charges</TableColumn>
						<TableColumn>Logs clients</TableColumn>
						<TableColumn>Logs salaires</TableColumn>
						<TableColumn>Total</TableColumn>
					</TableHeader>
					<TableBody>
						{calculatedCostEachMonths.map((cost, index) => (
							<TableRow key={index}>
								<TableCell>
									{Moment.unix(cost.time).format("MM/YYYY")}
								</TableCell>
								<TableCell>
									<div
										className={
											Math.round(cost.cost) > 0
												? "text-green-500"
												: "text-red-500"
										}
									>
										{Math.round(cost.cost)}€
									</div>
								</TableCell>
								<TableCell>
									<div className="flex flex-col">
										{cost.logs
											.filter((log) => log.type.includes("charges"))
											.map((log) => (
												<div key={log.details}>{log.details}</div>
											))}
									</div>
								</TableCell>
								<TableCell>
									<div className="flex flex-col">
										{cost.logs
											.filter((log) => log.type.includes("clients"))
											.map((log) => (
												<div key={log.details}>{log.details}</div>
											))}
									</div>
								</TableCell>
								<TableCell>
									<div className="flex flex-col">
										{cost.logs
											.filter((log) => log.type.includes("salaires"))
											.map((log) => (
												<div key={log.details}>{log.details}</div>
											))}
									</div>
								</TableCell>

								<TableCell>
									<b>
										Total :{" "}
										{Math.round(
											cost.cost - calculatedCostEachMonths[index - 1]?.cost,
										)}
										€
									</b>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</DashboardPageContainer>
	)
}

export default DashboardPage
