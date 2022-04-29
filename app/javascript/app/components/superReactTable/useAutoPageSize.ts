import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { ROW_HEIGHT } from "./SuperReactTable"

function specialDebounce<P extends Array<any>>(
  callback: (...args: P) => void,
  wait: number,
  {
    pre,
    post,
    each,
  }: {
    pre?: () => void
    post?: () => void
    each?: () => void
  } = {},
): (...args: P) => void {
  let timeoutId = undefined

  const debounced = (...args: P) => {
    if (timeoutId === undefined) pre?.()
    else each?.()
    window.clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      timeoutId = undefined
      callback(...args)
      post?.()
    }, wait)
  }

  return debounced
}

export const ReactTableContainerContext = createContext<HTMLElement>(
  document.body,
)

function useAutoPageSize({
  dataLength,
  pageSize,
  setPageSize,
  infiniteSize,
  forcedNumberOfLines,
}: {
  dataLength: number
  pageSize: number
  setPageSize: (n: number) => void
  infiniteSize: boolean
  forcedNumberOfLines: number
}) {
  const [defaultPageSize, setDefaultPageSize] = useState(pageSize)
  const oldDefaultPageSize = useRef(pageSize)

  const container = useContext(ReactTableContainerContext)
  const [reference, setReference] = useState(undefined)

  // === On first render with ref set, remove overflowing rows and set reference
  useEffect(() => {
    if (infiniteSize) return
    if (!container) return

    // Get childrenHeight
    const children = container.children
    const firstChild = children[0] as HTMLElement
    const lastChild = children[children.length - 1] as HTMLElement

    const childrenHeight =
      lastChild.offsetTop - firstChild.offsetTop + lastChild.offsetHeight

    // Get container inner size
    const containerStyle = window.getComputedStyle(container)
    const containerSize =
      container.clientHeight -
      parseInt(containerStyle.getPropertyValue("padding-top")) -
      parseInt(containerStyle.getPropertyValue("padding-bottom"))

    // ---

    const diff = containerSize - childrenHeight
    const rowDiff = Math.floor(diff / ROW_HEIGHT)
    const rest = diff - rowDiff * ROW_HEIGHT

    const newPageSize =
      Math.max(1, Math.min(pageSize, dataLength) + rowDiff) +
      (dataLength === 0 ? 2 : 0)

    setReference({
      height: window.innerHeight - rest,
      pageSize: newPageSize,
    })
    setDefaultPageSize(newPageSize)
  }, [container])

  // === Update size following window reference
  const updatePageSize = useCallback(
    specialDebounce(
      () => {
        const diff = window.innerHeight - reference.height
        const rowDiff = Math.floor(diff / ROW_HEIGHT)

        const newPageSize = Math.max(1, reference.pageSize + rowDiff)
        setDefaultPageSize(newPageSize)
      },
      100,
      {
        pre: () => (container.style.overflow = "hidden"),
        post: () => (container.style.overflow = "auto"),
      },
    ),
    [reference],
  )

  useEffect(() => {
    if (infiniteSize) return
    window.addEventListener("resize", updatePageSize)
    return () => window.removeEventListener("resize", updatePageSize)
  }, [reference])

  useEffect(() => {
    if (infiniteSize) setDefaultPageSize(dataLength)
  }, [dataLength])

  // === Reflect default changes when default selected
  useEffect(() => {
    if (infiniteSize) return setPageSize(dataLength)
    if (forcedNumberOfLines) return setPageSize(forcedNumberOfLines)
    if (pageSize === oldDefaultPageSize.current) setPageSize(defaultPageSize)
    oldDefaultPageSize.current = defaultPageSize
  }, [defaultPageSize])
  /* === */

  return defaultPageSize
}

export default useAutoPageSize
