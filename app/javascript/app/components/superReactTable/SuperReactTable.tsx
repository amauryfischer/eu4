/* eslint-disable react/jsx-key */
import CancelIcon from "@mui/icons-material/Cancel"
import DoneIcon from "@mui/icons-material/Done"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import EditIcon from "@mui/icons-material/Edit"
import ErrorIcon from "@mui/icons-material/Error"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck"
import ReorderIcon from "@mui/icons-material/Reorder"
import RestoreIcon from "@mui/icons-material/Restore"
import WarningIcon from "@mui/icons-material/Warning"
import {
  Button,
  Checkbox,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import IconButton from "@mui/material/IconButton"
import React, { useEffect, useMemo, useState, useCallback } from "react"
import {
  Column,
  useExpanded,
  useFlexLayout,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table"
import styled, { css } from "styled-components"
import BottomSuperTable from "./BottomSuperTable"
import SuperReactTableCell from "./SuperReactTableCell"
import Flex from "styles/Flex"
import SearchTable from "./SearchTable"
import { RedButton } from "styles/button"
import { width50, width60, width80 } from "styles/widthProps"
import useAutoPageSize from "./useAutoPageSize"
import ButtonMulti from "components/ButtonMulti"

export const ROW_HEIGHT = 53

const StyledDoneIcon = styled(DoneIcon)`
  color: var(--green) !important;
`

const StyledErrorIcon = styled(ErrorIcon)`
  color: var(--red) !important;
`

const StyledWarningIcon = styled(WarningIcon)`
  color: var(--orange) !important;
`

const STableBody = styled(TableBody)`
  width: 100%;
  display: block !important;
`
const SPaper = styled(Paper)`
  width: 100% !important;
`
const SExpandLessIcon = styled(ExpandLessIcon)`
  ${(p: any) =>
    p.disabled
      ? css`
          color: var(--neutral400);
        `
      : css`
          color: var(--primary700);
        `};
  margin-bottom: -10px;
` as any

const SExpandMoreIcon = styled(ExpandMoreIcon)`
  ${(p: any) =>
    p.disabled
      ? css`
          color: var(--neutral400);
        `
      : css`
          color: var(--primary700);
        `};
` as any

const SCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: var(--primary850) !important;
  }
`

const B = styled.b`
  color: var(--primary850) !important;
`

const STableHead = styled(TableHead)`
  display: block !important;
`

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`

export const SSuperReactTableCell = styled(SuperReactTableCell)``

export const STableCellHead = styled(TableCell)`
  padding: 5px !important;
  ul {
    padding: 0 !important;
  }
`

export const StyledCell = styled.div<{ $noBorderBottom: boolean }>`
  padding: 5px !important;
  transition: background-color 0.2s;
  background-color: white;
  white-space: initial;
  word-wrap: break-word;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: initial !important;
  ${(p: any) =>
    p.noOverflow
      ? css`
          overflow: none;
        `
      : css`
          overflow: auto;
        `}
  ${(p: any) =>
    p.hide &&
    css`
      visibility: hidden;
    `}
        & > td {
    ${({ $noBorderBottom }) =>
      $noBorderBottom &&
      css`
        border-bottom: 5px solid red !important;
      `}
  }
` as any

export const STable = styled(Table)<{ $allowOverflow: boolean }>`
  position: none;
  display: block !important;
  overflow-x: ${({ $allowOverflow }) => ($allowOverflow ? "auto" : "hidden")};
  overflow-y: hidden;
  & * {
    overflow: initial;
  }
  background-color: #fff;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`
const IndeterminateCheckbox = React.forwardRef(
  // @ts-ignore
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    return (
      <>
        <SCheckbox
          // @ts-ignore
          inputRef={resolvedRef}
          indeterminate={indeterminate}
          {...rest}
        />
      </>
    )
  },
)

const WhiteTableRow = styled(TableRow)`
  background-color: white;
`

const MainTableRow = styled(TableRow)<{
  $removeBorder: boolean
  $disrespectHeight: boolean
}>`
  display: flex !important;

  & > td {
    ${({ $removeBorder }) =>
      $removeBorder
        ? css`
            border-bottom: unset;
          `
        : undefined}
  }

  ${({ $clickable }: any) =>
    $clickable &&
    css`
      transition: background-color 0.2s;
      cursor: pointer;
      :hover {
        background-color: var(--primary50);
        ${StyledCell} {
          background-color: var(--primary50);
        }
      }
    `}
`

const SButtonMulti = styled(ButtonMulti)`
  flex-grow: 1 !important;
`

const SubTableRow = styled(TableRow)<{ $allowOverflow: boolean }>`
  overflow-x: ${({ $allowOverflow }) => ($allowOverflow ? "auto" : "hidden")};
  display: flex !important;
  & > td {
    flex: 1;
  }
`

const SubTableCell = styled(TableCell)`
  position: none;
  padding-bottom: 0 !important;
  padding-top: 0 !important;
`

const NoDataRow = styled(TableRow)`
  position: none;
  display: flex !important;
  justify-content: center;
  align-items: center;
`

const NoDataCell = styled(TableCell)`
  position: none;
  flex: 1;
  color: grey !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: ${2 * ROW_HEIGHT}px;
`

const ResponsiveFlex = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 5px;

  & > * {
    flex-grow: 1;
  }
`

const TableRelativeContainer = styled.div`
  position: relative;
  max-width: 100%;
  overflow: visible;
  width: -webkit-fill-available;
`

interface ISuperReactTable<T> {
  data: T[]
  columns: Array<Column<any>>
  haveStatus?: boolean
  isEditable?: boolean
  isDeletable?: boolean
  onEditClick?: (object: T) => void
  onDeleteClick?: (object: T) => void
  onDeleteAllClick?: (objects: T[]) => void
  forcedNumberOfLines?: number
  selectable?: boolean
  simpleTable?: boolean
  showHeader?: boolean
  infiniteSize?: boolean
  showBottom?: boolean
  displaySearch?: boolean
  actionsButtons?: JSX.Element
  actionsIcons?: JSX.Element
  orderConfig?: {
    order: string[]
    onOrder?: (any) => void
    accessor?: (any) => string
    preOrder?: {
      order: string[]
      accessor: (any) => string
    }
  }
  convertToCsv?: (selected: string[] | null) => { headers: any; data: any }
  RenderSubRow?: any
  customEmptyMessage?: string
  writePermission?: boolean
  isSubrows?: boolean
  onRowClick?: (row: any) => void
  resetId?: string
  autoResetPage?: boolean
  autoResetSearch?: boolean
  disrespectHeight?: boolean
}

function SuperReactTable<T>({
  actionsButtons = null,
  actionsIcons = null,
  autoResetPage = false,
  autoResetSearch = false,
  columns,
  convertToCsv = undefined,
  customEmptyMessage = undefined,
  data,
  displaySearch = true,
  disrespectHeight = false,
  forcedNumberOfLines = 0,
  haveStatus = false,
  infiniteSize = false,
  isDeletable = true,
  isEditable = true,
  isSubrows = false,
  onDeleteClick = (object: typeof data[0]) => {},
  onEditClick = (object: typeof data[0]) => {},
  onDeleteAllClick = undefined,
  onRowClick = undefined,
  orderConfig = undefined,
  RenderSubRow = undefined,
  resetId = undefined,
  selectable = true,
  showBottom = true,
  showHeader = true,
  simpleTable = false,
  writePermission = true,
}: ISuperReactTable<T>) {
  /* === order === */
  const [reordering, setReordering] = useState(false)
  /* === end order === */

  const editColumn = [
    {
      Header: "",
      accessor: "edit",
      ...width50,
      disableSortBy: true,
      isAction: true,
      Filter: () => <div />,
      Cell: (props: any) => (
        <StyledCell
          hide={reordering}
          noOverflow
          onClick={(event) => {
            onEditClick(props.row.original)
            event.stopPropagation()
          }}
        >
          <IconButton style={{ fontSize: 24 }}>
            <EditIcon style={{ fontSize: 24 }} />
          </IconButton>
        </StyledCell>
      ),
    },
  ]

  const deleteColumn = [
    {
      Header: "",
      Filter: (props) => <div />,
      accessor: "delete",
      ...width60,
      disableSortBy: true,
      isAction: true,
      Cell: (props) => (
        <RedButton
          onClick={() => {
            onDeleteClick(props.row.original)
          }}
          wrapper={(p) => <StyledCell hide={reordering} noOverflow {...p} />}
        />
      ),
    },
  ]

  const augmentedColumn = useMemo(() => {
    const modifiedColumns = improvedCells(columns)
    return [
      ...modifiedColumns,
      ...(isEditable ? editColumn : []),
      ...(isDeletable ? deleteColumn : []),
    ]
  }, [columns, isEditable, isDeletable, data, reordering])

  const tableData = data

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    gotoPage,
    page,
    setPageSize,
    nextPage,
    previousPage,
    pageOptions,
    setGlobalFilter,
    selectedFlatRows,
    toggleAllPageRowsSelected,
    setSortBy,
    visibleColumns,
    getToggleAllRowsSelectedProps,
    state: { pageIndex, pageSize, globalFilter, ...others },
  } = useTable<typeof data[0]>(
    {
      columns: augmentedColumn,
      data: tableData,
      disableSortBy: reordering,
      reordering,
      autoResetGlobalFilter: autoResetSearch,
      autoResetPage: autoResetPage,
      autoResetExpanded: false,
    },
    useFlexLayout,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (selectable) {
        hooks.visibleColumns.push((columns) => [
          reordering
            ? //drag indicator column
              {
                id: "dnd",
                ...width80,
                disableSortBy: true,
                Header: <div style={{ minHeight: "42px" }}></div>,
                Cell: (
                  <Flex fullHeight style={{ minHeight: "42px" }}>
                    <DragIndicatorIcon fontSize="large" htmlColor="#666666" />
                  </Flex>
                ),
              }
            : // selection column
              {
                id: "selection",
                ...width50,
                disableSortBy: true,
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => (
                  <StyledCell>
                    <IndeterminateCheckbox
                      {...row.getToggleRowSelectedProps()}
                    />
                  </StyledCell>
                ),
              },
          ...columns,
        ])
      }
    },
  )

  const defaultNumberOfLines = useAutoPageSize({
    infiniteSize,
    dataLength: tableData.length,
    pageSize,
    setPageSize,
    forcedNumberOfLines,
  })

  useEffect(() => {
    setGlobalFilter("")
    gotoPage(0)
  }, [resetId])

  const optionsNumberOfElementsPerPage = [
    {
      value: defaultNumberOfLines,
      label: String(defaultNumberOfLines),
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ]

  return (
    <Flex gap="0.75rem" directionColumn style={{ width: "100%" }}>
      <SPaper>
        {!simpleTable && (
          <BottomContainer>
            <Flex gap="1rem">
              {selectable && (
                <div>
                  <B>{selectedFlatRows.length}</B> élément(s) sélectionné(s)
                </div>
              )}
            </Flex>
            <Flex wrap gap="5px">
              <ResponsiveFlex>
                {displaySearch && (
                  <SearchTable
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                )}
              </ResponsiveFlex>
              <ResponsiveFlex>
                {selectedFlatRows.length > 0 && (
                  <SButtonMulti
                    secondary
                    buttonLabel={"Actions sur la sélection"}
                    options={[
                      {
                        renderCondition: isDeletable && writePermission,
                        requireValidation: true,
                        onClick: () => {
                          if (onDeleteAllClick) {
                            onDeleteAllClick(
                              selectedFlatRows.map((row) => row.original),
                            )
                          } else {
                            selectedFlatRows
                              .map((row) => row.original)
                              .forEach((original) => onDeleteClick(original))
                          }
                        },

                        confirmMessage:
                          "Voulez vous vraiment supprimer toute la séléction ?",
                        label: "Supprimer toute la séléction",
                      },
                      {
                        renderCondition: isDeletable && !convertToCsv,
                        label: "Aucune action disponible",
                        disabled: true,
                      },
                    ]}
                  />
                )}

                {actionsButtons}
              </ResponsiveFlex>
            </Flex>
          </BottomContainer>
        )}
      </SPaper>
      <TableRelativeContainer>
        <STable {...getTableProps()} $allowOverflow={!reordering}>
          {showHeader && (
            <>
              <STableHead>
                {headerGroups.map((headerGroup: any) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                      return (
                        <SSuperReactTableCell
                          {...column.getHeaderProps(
                            column.getSortByToggleProps(),
                          )}
                        >
                          <StyledCell>
                            {column.render("Header")}
                            {!column.disableSortBy && (
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <>
                                      {"  "}
                                      <Flex direction="column">
                                        <SExpandLessIcon disabled />
                                        <SExpandMoreIcon />
                                      </Flex>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <Flex direction="column">
                                        <SExpandLessIcon />
                                        <SExpandMoreIcon disabled />
                                      </Flex>
                                    </>
                                  )
                                ) : (
                                  <Flex direction="column">
                                    <SExpandLessIcon disabled />
                                    <SExpandMoreIcon disabled />
                                  </Flex>
                                )}
                              </span>
                            )}
                          </StyledCell>
                        </SSuperReactTableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </STableHead>
              <STableBody {...getTableBodyProps()}>
                {page.map((row, index) => {
                  prepareRow(row)
                  return (
                    <React.Fragment key={row.getRowProps().key}>
                      <MainTableRow
                        $disrespectHeight={disrespectHeight}
                        $clickable={onRowClick}
                        onClick={() => onRowClick?.(row)}
                        $removeBorder={RenderSubRow}
                        {...row.getRowProps()}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <SSuperReactTableCell
                              data-label={cell.render("Header")}
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </SSuperReactTableCell>
                          )
                        })}
                      </MainTableRow>
                      {RenderSubRow && (
                        <SubTableRow $allowOverflow={row.isExpanded}>
                          <SubTableCell colSpan={visibleColumns.length}>
                            <Collapse in={row.isExpanded}>
                              {row.isExpanded && <RenderSubRow row={row} />}
                            </Collapse>
                          </SubTableCell>
                        </SubTableRow>
                      )}
                    </React.Fragment>
                  )
                })}
                {page.length === 0 && (
                  <NoDataRow>
                    <NoDataCell colSpan={visibleColumns.length}>
                      {customEmptyMessage ?? "Aucune donnée à afficher"}
                    </NoDataCell>
                  </NoDataRow>
                )}
              </STableBody>
            </>
          )}
        </STable>
      </TableRelativeContainer>
      <SPaper>
        {showBottom && (
          <BottomSuperTable
            optionsNumberOfElementsPerPage={optionsNumberOfElementsPerPage}
            setPageSize={setPageSize}
            pageSize={pageSize}
            defaultNumberOfLines={
              forcedNumberOfLines ? forcedNumberOfLines : defaultNumberOfLines
            }
            page={page}
            previousPage={previousPage}
            nextPage={nextPage}
            pageIndex={pageIndex}
            gotoPage={gotoPage}
            pageOptions={pageOptions}
            dataLenght={data.length}
            isInfinite={infiniteSize}
          />
        )}
      </SPaper>
    </Flex>
  )
}

export const improvedCells = (columns) =>
  columns.map((column) => ({
    ...column,
    ...(column.Cell
      ? {}
      : { Cell: (props) => <StyledCell>{props.value}</StyledCell> }),
  }))

export default SuperReactTable
