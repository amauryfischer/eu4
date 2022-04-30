export const TITANE = {
  name: "Titane",
  img: "/images/resources/ti.png",
}
export const AZOTE = {
  name: "Azote",
  img: "/images/resources/azote.png",
}
export const ALUMINUM = {
  name: "Aluminium",
  img: "/images/resources/alu.png",
}
export const CUIVRE = {
  name: "Cuivre",
  img: "/images/resources/cuivre.png",
}
export const FER = {
  name: "Fer",
  img: "/images/resources/fer.png",
}
export const URANIUM = {
  name: "Uranium",
  img: "/images/resources/ura.png",
}
export const HYDROGENE = {
  name: "Hydrogène",
  img: "/images/resources/hydro.png",
}
export const SILICIUM = {
  name: "Silicium",
  img: "/images/resources/sili.png",
}
const getAllResources = () => {
  return {
    [TITANE.name]: TITANE,
    [CUIVRE.name]: CUIVRE,
    [FER.name]: FER,
    [ALUMINUM.name]: ALUMINUM,
    [SILICIUM.name]: SILICIUM,
    [URANIUM.name]: URANIUM,
    [AZOTE.name]: AZOTE,
    [HYDROGENE.name]: HYDROGENE,
  }
}
export default {
  getAllResources,
}
