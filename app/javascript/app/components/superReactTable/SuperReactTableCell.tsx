import { TableCell } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { ROW_HEIGHT, STable } from "./SuperReactTable"

const STableCell = styled(TableCell)<{
  $shouldExpand: string
  $width: number
}>`
  padding: 0 !important;
  ul {
    padding: 0 !important;
  }

  overflow: hidden !important;
  :hover {
    overflow: visible !important;
  }
  ${({ $shouldExpand, $width }) =>
    $shouldExpand &&
    css`
      :not(:hover):before {
        text-align: center;
        color: #333;
        width: ${$width}px;
        font-size: 1.8em;
        line-height: 45px;
        content: "";
        display: block;
        position: absolute;
        height: 33px;
        z-index: 100;
        background: linear-gradient(
          to bottom,
          transparent 0%,
          transparent 70%,
          #00000026 100%
        );
        pointer-events: none;
        height: 54px;
        text-shadow: 1px 1px 2px grey, -1px -1px 1px white, 0px -1px 1px white;
      }
    `}
`

export const WrapComp = styled.div<{ $shouldExpand: "top" | "bottom" | null }>`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  background-color: inherit;
  pointer-events: auto;

  ${({ $shouldExpand }) =>
    $shouldExpand &&
    css`
      :hover {
        position: absolute;
        box-shadow: rgb(0 0 0 / 20%) 0px 11px 15px -7px,
          rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px;
        background-color: white;
        z-index: 999999;
        min-width: unset !important;
        max-width: 400px;
        min-height: unset !important;

        :before {
          border-left: solid lightgrey 1px;
          border-right: solid lightgrey 1px;
          content: "";
          display: block;
          position: absolute;
        }

        ${$shouldExpand == "top"
          ? css`
              :before {
                border-top: solid lightgrey 1px;
                box-shadow: rgb(0 0 0 / 20%) 0px -3px 5px -1px,
                  rgb(0 0 0 / 14%) 0px -6px 10px 0px;
              }
            `
          : css`
              :before {
                border-bottom: solid lightgrey 1px;
                box-shadow: rgb(0 0 0 / 20%) 0px 3px 5px -1px,
                  rgb(0 0 0 / 14%) 0px 6px 10px 0px;
              }
            `}
      }

      /* :not(:hover):after {
                text-align: center;
                color: #333;
                font-size: 1.8em;
                line-height: 45px;
                content: '';
                display: block;
                position: absolute;
                height: 33px;
                z-index: 99999999;
                background: linear-gradient(
                    to bottom,
                    transparent 0%,
                    transparent 70%,
                    #00000026 100%
                );
                pointer-events: none;
                text-shadow: 1px 1px 2px grey, -1px -1px 1px white,
                    0px -1px 1px white;
            } */
    `}
`

const SuperReactTableCell = ({ children, ...props }) => {
  const [node, setNode] = useState<HTMLElement>(null)
  const [shouldExpand, setShouldExpand] = useState<"top" | "bottom" | null>(
    null,
  )

  const callbackRef = useCallback((node) => {
    if (node) setNode(node)
  }, [])

  const updateShouldExpand = () => {
    if (node) {
      const overflowDiff = node.clientHeight - node.parentElement.clientHeight
      const isOverflowing = overflowDiff > 0

      if (!isOverflowing) return setShouldExpand(null)

      const nextRowNeeded = Math.ceil(overflowDiff / ROW_HEIGHT)

      let nextRow = node.parentElement.parentElement.nextElementSibling
      for (let i = 0; i < nextRowNeeded; i++) {
        if (!nextRow) return setShouldExpand("top")
        nextRow = nextRow.nextElementSibling
      }
      return setShouldExpand("bottom")
    }
    setShouldExpand(null)
  }

  useEffect(() => {
    let t: number

    const delayedUpdateShouldExpand = () => {
      window.clearTimeout(t)
      t = window.setTimeout(updateShouldExpand, 100)
    }

    delayedUpdateShouldExpand()
    window.addEventListener("resize", delayedUpdateShouldExpand)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener("resize", delayedUpdateShouldExpand)
    }
  }, [node])

  useEffect(() => updateShouldExpand)
  return (
    <STableCell
      {...props}
      $shouldExpand={shouldExpand}
      $width={node?.clientWidth}
    >
      <WrapComp $shouldExpand={shouldExpand} ref={callbackRef}>
        {children}
      </WrapComp>
    </STableCell>
  )
}

export default SuperReactTableCell
