import Schema from "@/type/Schema"
import SchemaTypes from "@/type/SchemaTypes"

const employeeSchema: Schema = {
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
}

export default employeeSchema
