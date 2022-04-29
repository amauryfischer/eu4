import Debug from "debug"
import React from "react"
import styled, { css } from "styled-components"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { IconButton, Select } from "@mui/material"
import Flex from "styles/Flex"
const debug = Debug("app:javascript:utils:components:tables:BottomSuperTable")

debug.log = console.log.bind(console)

const SIconButton = styled(IconButton)`
  ${({ disabled }) =>
    disabled
      ? null
      : css`
          color: var(--primary700) !important;
        `}
`
const PageItem = styled.div`
  padding: 1rem;
  color: var(--primary700);
  width: 41px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ active }: any) => active && 500};
  background-color: ${({ active }: any) => active && "#DEEAFF"};
  &:hover {
    background-color: #deeaff;
    cursor: pointer;
  }
` as any

const PageItemAlt = styled.div`
  padding: 1rem;
  color: var(--primary700);
  width: 41px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ active }: any) => active && 500};
  background-color: ${({ active }: any) => active && "#DEEAFF"};
` as any
const PageSelector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const StyledSelect = styled(Select)`
  min-width: 85px;
  margin-right: 5px;
  margin-left: 8px;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
`

const BottomSuperTable = ({
  optionsNumberOfElementsPerPage,
  setPageSize,
  defaultNumberOfLines,
  page,
  previousPage,
  nextPage,
  pageIndex,
  pageOptions,
  dataLenght,
  gotoPage,
  pageSize,
  isInfinite = false,
}) => {
  const isLastPage = pageIndex === pageOptions.length - 1
  return (
    <BottomContainer>
      <Flex>
        Affichage de {pageSize * pageIndex + 1} -
        {isLastPage ? dataLenght : pageSize * (pageIndex + 1)} sur {dataLenght}{" "}
        résultats
      </Flex>
      {!isInfinite && (
        <>
          <Flex>
            <PageSelector>
              Résultats par page{"  "}
              <StyledSelect
                value={
                  optionsNumberOfElementsPerPage.filter(
                    (obj: any) => obj.value === pageSize,
                  )?.[0] ?? pageSize
                }
                menuPlacement="top"
                onChange={(e: any, { action }) => {
                  if (action === "clear") {
                    setPageSize(defaultNumberOfLines)
                    return
                  }
                  setPageSize(e.value)
                }}
                options={optionsNumberOfElementsPerPage}
              />
            </PageSelector>
          </Flex>
          <Flex>
            <SIconButton onClick={previousPage} disabled={pageIndex === 0}>
              <ArrowBackIcon />
            </SIconButton>

            {pageIndex - 3 >= 0 && (
              <>
                <PageItem onClick={() => gotoPage(0)}>1</PageItem>
                {pageIndex - 4 >= 0 && <PageItemAlt>...</PageItemAlt>}
              </>
            )}

            {pageIndex - 2 >= 0 && (
              <>
                <PageItem onClick={() => gotoPage(pageIndex - 2)}>
                  {pageIndex - 1}
                </PageItem>
              </>
            )}
            {pageIndex - 1 >= 0 && (
              <>
                <PageItem onClick={() => gotoPage(pageIndex - 1)}>
                  {pageIndex}
                </PageItem>
              </>
            )}

            {<>{<PageItem active>{pageIndex + 1}</PageItem>}</>}

            {pageIndex + 1 < pageOptions.length && (
              <>
                <PageItem onClick={() => gotoPage(pageIndex + 1)}>
                  {pageIndex + 2}
                </PageItem>
              </>
            )}
            {pageIndex + 2 < pageOptions.length && (
              <>
                <PageItem onClick={() => gotoPage(pageIndex + 2)}>
                  {pageIndex + 3}
                </PageItem>
              </>
            )}
            {pageIndex + 3 < pageOptions.length && (
              <>
                {pageIndex + 4 < pageOptions.length && (
                  <PageItemAlt>...</PageItemAlt>
                )}
                <PageItem onClick={() => gotoPage(pageOptions.length - 1)}>
                  {pageOptions.length}
                </PageItem>
              </>
            )}
            <SIconButton
              onClick={nextPage}
              disabled={
                pageIndex === pageOptions.length - 1 || pageOptions.length === 0
              }
            >
              <ArrowForwardIcon />
            </SIconButton>
          </Flex>
        </>
      )}
    </BottomContainer>
  )
}

export default BottomSuperTable
