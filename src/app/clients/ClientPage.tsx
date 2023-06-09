"use client"

import { Table } from "@nextui-org/react"
import React, { useMemo } from "react"
import Moment from "moment"

export enum IPrestation {
	INTEGRATION = "Intégration de données",
	DECOUVERTE = "Licence DECOUVERTE",
	STANDARD = "Licence STANDARD",
	PREMIUM = "Licence PREMIUM",
	PICS = "Licence PICS",
	EXERCICE = "Exercice de GC",
	PICRIM = "Picrim",
}
export interface Client {
	Archivé: boolean
	"Challenge SMACL": boolean
	Commune: string
	"Date de fin de contrat": string
	"Date de signature": string
	Facturation: string
	"Nb années license": number
	"Nb jours avant paiement": string
	Note: string
	"Paiement annuel": boolean
	"Payé jusqu'à année": string
	Prix: string
	"Prix annuel": string
	"Redevance Smacl": string
	Smacl: boolean
	"Type de prestation": IPrestation
}
const prestationStyle = (prestation: IPrestation) => {
	switch (prestation) {
		case IPrestation.INTEGRATION:
			return "border border-blue-500 text-blue-500 rounded-full px-2"
		case IPrestation.DECOUVERTE:
			return "border border-green-500 text-green-500 rounded-full px-2"
		case IPrestation.STANDARD:
			return "border border-yellow-500 text-yellow-500 rounded-full px-2"
		case IPrestation.PREMIUM:
			return "border border-cyan-500 text-cyan-500 rounded-full px-2"
		case IPrestation.PICS:
			return "border border-purple-500 text-purple-500 rounded-full px-2"
		case IPrestation.EXERCICE:
			return "border border-pink-500 text-pink-500 rounded-full px-2"
		case IPrestation.PICRIM:
			return "border border-indigo-500 text-indigo-500 rounded-full px-2"
	}
}

const ClientPage = ({ clients }: { clients: Client[] }) => {
	const nbJoursAvantPaiement = (client: Client) => {
		return Math.round(parseFloat(client["Nb jours avant paiement"]))
	}
	const sortedClients = useMemo(() => {
		// sort by nbJoursAvantPaiement
		return clients.sort((a, b) => {
			if (!a["Nb jours avant paiement"]) return 1
			if (!b["Nb jours avant paiement"]) return -1
			if (a["Nb jours avant paiement"] < b["Nb jours avant paiement"]) return -1
			if (a["Nb jours avant paiement"] > b["Nb jours avant paiement"]) return 1
			return 0
		})
	}, [clients])

	return (
		<div>
			<Table>
				<Table.Header>
					<Table.Column>Commune</Table.Column>
					<Table.Column>Type de prestation</Table.Column>
					<Table.Column>Facturation</Table.Column>
					<Table.Column>Prix</Table.Column>
					<Table.Column>Payé jusqu&apos;à année</Table.Column>
					<Table.Column>Date de signature</Table.Column>
					<Table.Column>Date de fin de contrat</Table.Column>
					<Table.Column>Paiement annuel</Table.Column>
					<Table.Column>Nb années license</Table.Column>
					<Table.Column>Nb jours avant paiement</Table.Column>
					<Table.Column>Prix annuel</Table.Column>
				</Table.Header>
				<Table.Body>
					{sortedClients.map((client) => {
						return (
							<Table.Row key={client.Commune + client["Type de prestation"]}>
								<Table.Cell>{client.Commune}</Table.Cell>
								<Table.Cell>
									<div
										className={prestationStyle(client["Type de prestation"])}
									>
										{client["Type de prestation"]}
									</div>
								</Table.Cell>
								<Table.Cell>{client.Facturation}</Table.Cell>
								<Table.Cell>{client.Prix}</Table.Cell>
								<Table.Cell>{client["Payé jusqu'à année"]}</Table.Cell>
								<Table.Cell>
									{Moment(client["Date de signature"]).format("DD/MM/YYYY")}
								</Table.Cell>
								<Table.Cell>
									{Moment(client["Date de fin de contrat"]).format(
										"DD/MM/YYYY",
									)}
								</Table.Cell>
								<Table.Cell>{client["Paiement annuel"]}</Table.Cell>
								<Table.Cell>{client["Nb années license"]}</Table.Cell>
								<Table.Cell>
									{nbJoursAvantPaiement(client) < 0 && (
										<div className="text-red-500">
											{nbJoursAvantPaiement(client)} jours
										</div>
									)}
									{nbJoursAvantPaiement(client) > 0 && (
										<div className="text-green-500">
											{nbJoursAvantPaiement(client)} jours
										</div>
									)}
								</Table.Cell>
								<Table.Cell>{client["Prix annuel"]}</Table.Cell>
							</Table.Row>
						)
					})}
				</Table.Body>
			</Table>
		</div>
	)
}

export default ClientPage
