"use client"

import { Table } from "@nextui-org/react"
import React from "react"
interface Client {
	Archivé: boolean
	"Challenge SMACL": boolean
	Commune: string
	"Date de fin de contrat": string
	"Date de signature": string
	Facturation: string
	"Nb années license": string
	"Nb jours avant paiement": string
	Note: string
	"Paiement annuel": boolean
	"Payé jusqu'à année": string
	Prix: string
	"Prix annuel": string
	"Redevance Smacl": string
	Smacl: boolean
	"Type de prestation": string
}
const ClientPage = ({ clients }: { clients: Client[] }) => {
	return (
		<div>
			<Table>
				<Table.Header>
					<Table.Column>Commune</Table.Column>
					<Table.Column>Type de prestation</Table.Column>
					<Table.Column>Facturation</Table.Column>
					<Table.Column>Prix</Table.Column>
					<Table.Column>Redevance Smacl</Table.Column>
					<Table.Column>Payé jusqu'à année</Table.Column>
					<Table.Column>Date de signature</Table.Column>
					<Table.Column>Date de fin de contrat</Table.Column>
					<Table.Column>Archivé</Table.Column>
					<Table.Column>Challenge SMACL</Table.Column>
					<Table.Column>Paiement annuel</Table.Column>
					<Table.Column>Nb années license</Table.Column>
					<Table.Column>Nb jours avant paiement</Table.Column>
					<Table.Column>Prix annuel</Table.Column>
					<Table.Column>Smacl</Table.Column>
					<Table.Column>Note</Table.Column>
				</Table.Header>
				<Table.Body>
					{clients.map((client) => {
						return (
							<Table.Row>
								<Table.Cell>{client.Commune}</Table.Cell>
								<Table.Cell>{client["Type de prestation"]}</Table.Cell>
								<Table.Cell>{client.Facturation}</Table.Cell>
								<Table.Cell>{client.Prix}</Table.Cell>
								<Table.Cell>{client["Redevance Smacl"]}</Table.Cell>
								<Table.Cell>{client["Payé jusqu'à année"]}</Table.Cell>
								<Table.Cell>{client["Date de signature"]}</Table.Cell>
								<Table.Cell>{client["Date de fin de contrat"]}</Table.Cell>
								<Table.Cell>{client.Archivé}</Table.Cell>
								<Table.Cell>{client["Challenge SMACL"]}</Table.Cell>
								<Table.Cell>{client["Paiement annuel"]}</Table.Cell>
								<Table.Cell>{client["Nb années license"]}</Table.Cell>
								<Table.Cell>{client["Nb jours avant paiement"]}</Table.Cell>
								<Table.Cell>{client["Prix annuel"]}</Table.Cell>
								<Table.Cell>{client.Smacl}</Table.Cell>
								<Table.Cell>{client.Note}</Table.Cell>
							</Table.Row>
						)
					})}
				</Table.Body>
			</Table>
		</div>
	)
}

export default ClientPage
