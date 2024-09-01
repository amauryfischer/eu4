import {
	createServerData,
	deleteServerData,
	fetchServerData,
	updateServerData
} from "@/server/dataServer"
import {
	addData,
	deleteData,
	setData,
	updateData
} from "@/redux/slice/data.slice"
import { Prisma } from "@prisma/client"
import { startTransition } from "react"
import { useDispatch } from "react-redux"

const useFetchDataAction = (type: Prisma.ModelName) => {
	const dispatch = useDispatch()

	const fetchDataAction = async () => {
		startTransition(() => {
			const fetchServer = async () => {
				console.log("Fetching", type)
				const data = await fetchServerData(type)
				console.log("Fetched", data)
				dispatch(setData({ type, dataId: data?.id, data }))
			}
			fetchServer()
		})
	}

	return fetchDataAction
}

const useUpdateDataAction = (type: Prisma.ModelName) => {
	const dispatch = useDispatch()

	const updateDataAction = (id: string, data: any) => {
		const updateServer = async () => {
			const updatedData = await updateServerData(type, id, data)
			dispatch(addData({ type, dataId: updatedData.id, data: updatedData }))
		}
		updateServer()
	}

	return updateDataAction
}

const useDeleteDataAction = (type: Prisma.ModelName) => {
	const dispatch = useDispatch()

	const deleteDataAction = (id: string) => {
		const deleteServer = async () => {
			await deleteServerData(type, id)
			dispatch(deleteData({ type, dataId: id }))
		}
		deleteServer()
	}

	return deleteDataAction
}

const useCreateDataAction = (type: Prisma.ModelName) => {
	const dispatch = useDispatch()

	const createDataAction = (data: any) => {
		const createServer = async () => {
			const createdData = await createServerData(type, data)
			dispatch(
				updateData({
					type,
					dataId: data?.id ?? createdData.id,
					data: createdData
				})
			)
		}
		createServer()
	}

	return createDataAction
}

const useDataActions = (type: Prisma.ModelName) => {
	return {
		fetchData: useFetchDataAction(type),
		updateData: useUpdateDataAction(type),
		deleteData: useDeleteDataAction(type),
		createData: useCreateDataAction(type)
	}
}

export default useDataActions
