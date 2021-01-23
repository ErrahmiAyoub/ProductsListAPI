import React from "react";
import {
  useTable,
  useExpanded,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";

import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/paper";
import { fuzzyTextFilterFn, GlobalFilter } from "./Filters";

function Table({ columns: userColumns, data, renderRowSubComponent }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: () => null,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    state,
    prepareRow,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: userColumns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    useExpanded, // We can useExpanded to track the expanded state
    usePagination
    // for sub components too!
  );

  const categoryFilter = React.useMemo(() => {
    const options = new Set();
    preGlobalFilteredRows.forEach((row) => {
      options.add(row.original.category);
    });
    return [...options.values()];
  }, [preGlobalFilteredRows]);

  return (
    <Paper style={{ margin: "1em", padding: "1em" }}>
      <div style={{ display: "flex" }}>
        <span style={{ marginRight: "10px" }}>Filter by category : </span>
        <GlobalFilter
          options={categoryFilter}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <TableContainer>
        <MaUTable stickyHeader {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    <div
                      {...column.getSortByToggleProps()}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </div>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                // Use a React.Fragment here so the table markup is still valid
                <React.Fragment key={rowProps.key}>
                  <TableRow {...rowProps}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {/*
                      If the row is in an expanded state, render a row with a
                      column that fills the entire length of the table.
                    */}
                  {row.isExpanded ? (
                    <TableRow>
                      <TableCell colSpan={visibleColumns.length}>
                        {/*
                            Inside it, call our renderRowSubComponent function. In reality,
                            you could pass whatever you want as props to
                            a component like this, including the entire
                            table instance. But for this example, we'll just
                            pass the row
                          */}
                        {renderRowSubComponent({ row })}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
      <br />
      {/* <div>Showing the first 20 results of {page.length} rows</div> */}
      <div
        style={{
          margin: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Paper>
  );
}

export default Table;
