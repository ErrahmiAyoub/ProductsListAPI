import React from "react";
//react-table
import {
  useTable,
  useExpanded,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";

//@material-ui
import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/paper";

import { matchSorter } from "match-sorter";

function GlobalFilter({ options, globalFilter, setGlobalFilter }) {
  //const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// Define a default UI for filtering
// function DefaultColumnFilter({
//   column: { filterValue, preFilteredRows, setFilter },
// }) {
//   const count = preFilteredRows.length;

//   return (
//     <input
//       value={filterValue || ""}
//       onChange={(e) => {
//         setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
//       }}
//       placeholder={`Search ${count} records...`}
//     />
//   );
// }

// This is a custom filter UI for selecting
// a unique option from a list
// function SelectColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//   // Calculate the options for filtering
//   // using the preFilteredRows
//   const options = React.useMemo(() => {
//     const options = new Set();
//     preFilteredRows.forEach((row) => {
//       options.add(row.values[id]);
//       //console.log("select", row.values[id]);
//     });
//     return [...options.values()];
//   }, [id, preFilteredRows]);

//   // Render a multi-select box
//   return (
//     <select
//       value={filterValue}
//       onChange={(e) => {
//         setFilter(e.target.value || undefined);
//       }}
//     >
//       <option value="">All</option>
//       {options.map((option, i) => (
//         <option key={i} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   );
// }

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// import makeData from "./makeData";

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `;

// A simple way to support a renderRowSubComponent is to make a render prop
// This is NOT part of the React Table API, it's merely a rendering
// option we are creating for ourselves in our table renderer
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

  const nameFilter = React.useMemo(() => {
    const options = new Set();
    preGlobalFilteredRows.forEach((row) => {
      options.add(row.original.name);
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

function App({ list }) {
  const columns = React.useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: "expander", // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ),
      },

      {
        Header: "Image",
        accessor: (d) => {
          return (
            <img
              style={{ width: "150px", border: "1px solid #000" }}
              src={d.thumbnail}
              alt="Product img"
            />
          );
        },
      },
      {
        Header: "Name & Description",
        accessor: (d) => {
          return (
            <div style={{ maxWidth: "400px", minWidth: "200px" }}>
              <p
                style={{
                  color: "rgba(25,81,114,1)",
                  fontWeight: "Bold",
                }}
              >
                {d.name}
              </p>
              <p>{d.description}</p>
            </div>
          );
        },
      },

      {
        Header: "Category",
        accessor: (d) => d.category,
        // Filter: SelectColumnFilter,
        // filter: "equals",
      },
      {
        Header: "DataSheet",
        accessor: (d) => {
          let a = d.datasheet
            .replace("20190805", "20210114")
            .replace("2020112", "20210114");
          return (
            <a href={a} target="_blank" rel="noopener noreferrer">
              <button>DataSheet</button>
            </a>
          );
        },
      },
      {
        Header: "Link",
        accessor: (d) => {
          return (
            <a href={d.Link} target="_blank" rel="noopener noreferrer">
              <button>Link</button>
            </a>
          );
        },
      },
    ],
    []
  );

  // const data = React.useMemo(() => makeData(10), []);
  // console.log("data", data);
  // console.log("prod", list);

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row }) =>
      // <pre
      //   style={{
      //     fontSize: "10px",
      //   }}
      // >
      //   <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      // </pre>
      console.log("row", row),
    []
  );

  return (
    <>
      <CssBaseline />
      <Table
        columns={columns}
        data={list}
        renderRowSubComponent={renderRowSubComponent}
      />
    </>
  );
}

export default App;
