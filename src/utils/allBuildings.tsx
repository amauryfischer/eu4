import { BUILDING_TYPE } from "@/type/data/IPlanet"

const getAllBuildings = (planetId: string) => [
	{
		name: "Centre de recherche",
		src: "/images/buildings/research.png",
		link: `/planets/${planetId}/research`,
		width: 8,
		height: 8,
		row: 1,
		percentage: 12,
		type: BUILDING_TYPE.RESEARCH
	},
	{
		name: "Usine",
		src: "/images/buildings/usine.png",
		link: `/planets/${planetId}/research`,
		disabled: true,
		width: 10,
		height: 10,
		row: 1,
		percentage: 58,
		type: BUILDING_TYPE.FACTORY
	},
	{
		name: "Centre de communication",
		src: "/images/buildings/communication.png",
		link: `/planets/${planetId}/research`,
		disabled: true,
		width: 12,
		height: 12,
		row: 2,
		percentage: 34,
		type: BUILDING_TYPE.COMMUNICATION
	},
	{
		name: "Mine",
		src: "/images/buildings/mine.webp",
		link: `/planets/${planetId}/research`,
		disabled: false,
		width: 15,
		height: 15,
		row: 2,
		percentage: 60,
		type: BUILDING_TYPE.MINES
	},
	{
		name: "Hangar",
		src: "/images/buildings/hangar.webp",
		link: `/planets/${planetId}/spatioport`,
		width: 10,
		height: 8,
		row: 2,
		persentage: 85,
		type: BUILDING_TYPE.HANGAR
	},
	{
		name: "Manufacture",
		src: "/images/buildings/manufacturing.webp",
		link: `/planets/${planetId}/shipfactory/choose`,
		width: 13,
		height: 10,
		row: 3,
		percentage: 21,
		type: BUILDING_TYPE.SHIP_FACTORY
	},
	{
		name: "Université",
		src: "/images/buildings/university.webp",
		link: `/planets/${planetId}/research`,
		disabled: true,
		width: 8,
		height: 10,
		row: 3,
		percentage: 78,
		type: BUILDING_TYPE.UNIVERSITY
	}
]

export default getAllBuildings
