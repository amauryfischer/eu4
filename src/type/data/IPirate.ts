import { IPosition } from "./IPosition"

interface IPirate {
	id?: string
	name: string
	level: number
	position: IPosition
	shipIds: string[]
}

export default IPirate
