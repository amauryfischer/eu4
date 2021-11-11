// const addResources = ({ resources, dispatch }) => {
//   const { resources: newResources } = resources
//   Object.keys(resources).forEach((resource) => {
//     dispatch(
//       addResource({
//         type: resource,
//         amount: Math.floor(Math.random() * 10),
//       }),
//     )
//   })
// }

import PlanetsActions from "reducer/planets/PlanetsActions"

const gameLoop = async (state, dispatch) => {
  dispatch(PlanetsActions.fetchPlanets())
}

export default { gameLoop }
