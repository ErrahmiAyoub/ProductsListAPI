import React from "react";
import { matchSorter } from "match-sorter";
import { useAsyncDebounce } from "react-table";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export function GlobalFilter({ options, globalFilter, setGlobalFilter }) {
  //const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Autocomplete
      id="filter"
      value={value}
      options={options}
      size="small"
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Filter by category" variant="outlined" />
      )}
      onChange={(e, v) => {
        setValue(v);
        onChange(v);
      }}
    />
  );
}
export function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;
