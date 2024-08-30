import { Prisma } from "@prisma/client"
import { useSelector } from "react-redux"

const useData: (type: Prisma.ModelName) => Record<string, any> =
	(type) => () => {
		const data = useSelector((state: any) => state.data?.entity?.[type])
		return data ?? {}
	}

export default useData
