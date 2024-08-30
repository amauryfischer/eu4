import { useSelector } from "react-redux"

const useCurrentSendPosition = () => {
	const sendPosition = useSelector((state: any) => state.current.sendPosition)
	return sendPosition
}

export default useCurrentSendPosition
