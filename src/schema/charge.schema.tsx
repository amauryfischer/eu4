import Schema from "@/type/Schema"
import SchemaTypes from "@/type/SchemaTypes"
import { Charge } from "@prisma/client"

const chargeSchema = {
	name: "Charge",
	properties: {
		id: {
			type: SchemaTypes.UUID,
			name: "id",
			label: "Identifiant",
		},

		nom: {
			type: SchemaTypes.STRING,
			name: "nom",
			label: "Nom",
		},
		montant: {
			type: SchemaTypes.NUMBER,
			name: "montant",
			label: "Montant",
		},
		type: {
			type: SchemaTypes.SELECT,
			name: "type",
			label: "Type",
			options: [
				{
					value: "Fixe",
					label: "Fixe",
				},
				{
					value: "Variable",
					label: "Variable",
				},
			],
		},
		frequency: {
			type: SchemaTypes.SELECT,
			name: "frequency",
			label: "Fréquence",
			options: [
				{
					value: "Mensuel",
					label: "Mensuel",
				},
				{
					value: "Annuel",
					label: "Annuel",
				},
				{
					value: "Unique",
					label: "Unique",
				},
			],
		},
		service: {
			name: "service",
			label: "Service",
			type: SchemaTypes.SELECT,
			options: [
				{
					value: "Service production",
					label: "Service production",
					alias: ["Production"],
				},
				{
					value: "Service informatique",
					label: "Service informatique",
					alias: ["Informatique"],
				},
				{
					value: "Service autre",
					label: "Service autre",
					alias: ["Autre"],
				},
			],
		},
		dateDebut: {
			type: SchemaTypes.DATE,
			name: "dateDebut",
			label: "Date de début",
		},
		dateFin: {
			type: SchemaTypes.DATE,
			name: "dateFin",
			label: "Date de fin",
		},

		scenario: {
			type: SchemaTypes.SELECT,
			name: "scenario",
			label: "Scenario",
			options: [
				{
					value: "Scenario 1",
					label: "Scenario 1",
				},
				{
					value: "",
					label: "Aucun scenario",
				},
			],
		},
	},
} as Schema

export default chargeSchema
