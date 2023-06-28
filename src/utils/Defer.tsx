import React from "react"
import { isMobile } from "react-device-detect"

interface DeferProps {
	chunkSize?: number
	children: React.ReactNode
	noDefer?: boolean
}

const Defer = ({ chunkSize = 1, children, noDefer = false }: DeferProps) => {
	const [renderedItemsCount, setRenderedItemsCount] = React.useState(chunkSize)

	const childrenArray = React.useMemo(
		() => React.Children.toArray(children),
		[children],
	)

	React.useEffect(() => {
		if (noDefer || isMobile) {
			return
		}
		if (renderedItemsCount < childrenArray.length) {
			window.requestIdleCallback(
				() => {
					setRenderedItemsCount(
						Math.min(renderedItemsCount + chunkSize, childrenArray.length),
					)
				},
				{ timeout: 200 },
			)
		}
	}, [renderedItemsCount, childrenArray.length, chunkSize, noDefer])
	if (noDefer || isMobile) {
		return children
	}
	return <>{childrenArray.slice(0, renderedItemsCount)}</>
}

export default Defer as React.FC<DeferProps>
