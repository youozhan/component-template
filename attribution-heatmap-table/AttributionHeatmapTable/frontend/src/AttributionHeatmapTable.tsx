import React, { useState, useEffect, ReactText } from "react"
import { range, zipObject } from "lodash"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { SelectionState, IntegratedSelection } from "@devexpress/dx-react-grid"
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableSelection,
} from "@devexpress/dx-react-grid-material-ui"
import {
  ArrowTable,
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "./streamlit"

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
        paper: '#273346' ,
    },
    secondary: {
        main: '#7792E3',
    },
  },
  typography: {
    fontFamily: [
        'Open Sans',
        'sans-serif',
    ].join(','),
  },
})

interface TableRowsProps {
  isHeader: boolean
  table: ArrowTable
}

/**
 * Function returning a list of rows.
 *
 * isHeader     - Whether to display the header.
 * table        - The table to display.
 */
const tableRows = (props: TableRowsProps): string[][] => {
  const { isHeader, table } = props
  const { headerRows, rows } = table
  const startRow = isHeader ? 0 : headerRows
  const endRow = isHeader ? headerRows : rows

  const tableRows = range(startRow, endRow).map(rowIndex =>
    tableRow({ rowIndex, table })
  )

  return tableRows
}

interface TableRowProps {
  rowIndex: number
  table: ArrowTable
}

/**
 * Function returning a list entries for a row.
 *
 * rowIndex - The row index.
 * table    - The table to display.
 */
const tableRow = (props: TableRowProps): string[] => {
  const { rowIndex, table } = props
  const { columns } = table

  const cells = range(0, columns).map(columnIndex => {
    const { content } = table.getCell(rowIndex, columnIndex)
    return content.toString()
  })

  return cells
}

const formatRows = (rows: string[][], columns: string[][]) =>
  rows.map(row => zipObject(columns[0], row))

const formatColumns = (columns: string[][]) =>
  columns[0].map(column => ({ name: column }))

const AttributionHeatmapTable: React.FC<ComponentProps> = props => {
  useEffect(() => {
    Streamlit.setFrameHeight(400)
  })

  const handleSelectionChange = (value: ReactText[]): void => {
    setSelection(value)
    Streamlit.setComponentValue(value)
  }

  const [selection, setSelection] = useState<ReactText[]>([])
  const columns = tableRows({ isHeader: true, table: props.args.data })
  const rows = tableRows({ isHeader: false, table: props.args.data })

  const [columnsToFormat] = useState(['Age', 'Duration', 'Credit Amount', 'Score'])

  const CustomFormat = (cell: any) => {
    // get the conditional formatting data frame
    const fmtTable = props.args.fmt_data.dataTable.toArray()

    // get the row and column index of the current cell
    // NOT Ideal...
    const rowIdx = cell.row[""],
        colIdx = columns[0].indexOf(cell.column.name)-1

    const value = fmtTable[rowIdx][colIdx]

    if (value <= 1 && value > 0.6) {
        const pos_style1 = {
            backgroundColor: "#B8C7F9",
            padding: "10px",
            display: "inline-block",
            width: "100px",
        }

        return <span style={pos_style1}> {cell.value}</span>
    } else if (value <= 0.6 && value > 0.2){
        const pos_style2 = {
            backgroundColor: "#707EA0",
            padding: "10px",
            display: "inline-block",
            width: "100px",
        }

        return <span style={pos_style2}> {cell.value}</span>
    } else if (value <= -0.2 && value > -0.6){
        const neg_style1 = {
            backgroundColor: "#1A2230",
            padding: "10px",
            display: "inline-block",
            width: "100px",
        }

        return <span style={neg_style1}> {cell.value}</span>
    } else if (value <= -0.6 && value > -1){
        const neg_style2 = {
            backgroundColor: "#926580",
            padding: "10px",
            display: "inline-block",
            width: "100px",
        }

        return <span style={neg_style2}> {cell.value}</span>
    } else {
        const default_style = {
            backgroundColor: "#E78CAE",
            padding: "10px",
            display: "inline-block",
            width: "100px",
        }

        return <span style={default_style}> {cell.value}</span>
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
        <Grid rows={formatRows(rows, columns)} columns={formatColumns(columns)}>
          <DataTypeProvider for={columnsToFormat} formatterComponent={CustomFormat} />
          <SelectionState
            selection={selection}
            onSelectionChange={handleSelectionChange}
          />
          <IntegratedSelection />
          <SortingState />
          <IntegratedSorting />
          <VirtualTable />
          <TableHeaderRow showSortingControls />
          <TableSelection showSelectAll />
        </Grid>
    </ThemeProvider>
  )
}

export default withStreamlitConnection(AttributionHeatmapTable)
