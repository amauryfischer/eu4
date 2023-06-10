"use client"

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
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
				<TableHeader>
					<TableColumn>Commune</TableColumn>
					<TableColumn>Type de prestation</TableColumn>
					<TableColumn>Facturation</TableColumn>
					<TableColumn>Prix</TableColumn>
					<TableColumn>Payé jusqu&apos;à année</TableColumn>
					<TableColumn>Date de signature</TableColumn>
					<TableColumn>Date de fin de contrat</TableColumn>
					<TableColumn>Paiement annuel</TableColumn>
					<TableColumn>Nb années license</TableColumn>
					<TableColumn>Nb jours avant paiement</TableColumn>
					<TableColumn>Prix annuel</TableColumn>
				</TableHeader>
				<TableBody>
					{sortedClients.map((client) => {
						return (
							<TableRow key={client.Commune + client["Type de prestation"]}>
								<TableCell>{client.Commune}</TableCell>
								<TableCell>
									<div
										className={prestationStyle(client["Type de prestation"])}
									>
										{client["Type de prestation"]}
									</div>
								</TableCell>
								<TableCell>{client.Facturation}</TableCell>
								<TableCell>{client.Prix}</TableCell>
								<TableCell>{client["Payé jusqu'à année"]}</TableCell>
								<TableCell>
									{Moment(client["Date de signature"]).format("DD/MM/YYYY")}
								</TableCell>
								<TableCell>
									{Moment(client["Date de fin de contrat"]).format(
										"DD/MM/YYYY",
									)}
								</TableCell>
								<TableCell>{client["Paiement annuel"]}</TableCell>
								<TableCell>{client["Nb années license"]}</TableCell>
								<TableCell>
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
								</TableCell>
								<TableCell>{client["Prix annuel"]}</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

export default ClientPage
