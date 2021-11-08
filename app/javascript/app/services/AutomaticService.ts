import { addResource } from "../redux/resources/resourcesReducer"

const addResources = ({ resources, dispatch }) => {
  Object.keys(resources).forEach((resource) => {
    dispatch(
      addResource({
        type: resource,
        amount: Math.floor(Math.random() * 10),
      }),
    )
  })
}

const gameLoop = async (state, dispatch) => {
  addResources({ resources: state.resources, dispatch })
}

export default { gameLoop }
