import Schema from "@/type/Schema"
import SchemaTypes from "@/type/SchemaTypes"

const employeeSchema: Schema = {
	name: "Employée",
	properties: {
		id: {
			name: "id",
			label: "Identifiant",
			type: SchemaTypes.UUID,
		},
		nom: {
			name: "nom",
			label: "Nom",
			type: SchemaTypes.STRING,
		},
		salaire: {
			name: "salaire",
			label: "Salaire",
			type: SchemaTypes.NUMBER,
		},
		type: {
			name: "type",
			label: "Type",
			type: SchemaTypes.SELECT,
			options: [
				{
					value: "CDI",
					label: "CDI",
					alias: ["C.D.I"],
				},
				{
					value: "Alternance",
					label: "Alternance",
				},
				{
					value: "Stage",
					label: "Stage",
				},
				{
					value: "Gérant",
					label: "Gérant",
					alias: ["Directeur", "PDG", "CEO"],
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
			name: "dateDebut",
			label: "Date de début",
			type: SchemaTypes.DATE,
		},
		dateFin: {
			name: "dateFin",
			label: "Date de fin",
			type: SchemaTypes.DATE,
		},
		scenario: {
			name: "scenario",
			label: "Scenario",
			type: SchemaTypes.SELECT,
			options: [
				{
					value: "Scenario 1",
					label: "Scénario 1",
				},
				{
					value: "",
					label: "Pas de scenario",
					alias: ["Aucun", "Pas de scénario"],
				},
			],
			isMulti: false,
		},
	},
}

export default employeeSchema
