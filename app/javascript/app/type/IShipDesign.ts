interface IShipDesign {
  class: string
  cost?: { [name: string]: number }
  img: string
  emplacement: number
  fuelSpace: number
  multiplier: { warp: number; impulse: number; conso: number }
  baseCoque: number
}

export default IShipDesign
