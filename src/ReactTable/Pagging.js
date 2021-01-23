import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Pagging = (props) => {
  const classes = useStyles();

  const {
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize,
  } = props;
  return (
    <div className={classes.container}>
      <IconButton
        className={classes.margin}
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        className={classes.margin}
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton
        className={classes.margin}
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        <NavigateNextIcon />
      </IconButton>
      <IconButton
        className={classes.margin}
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        <LastPageIcon />
      </IconButton>
      <span className={classes.margin}>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>
      <span className={classes.margin}>| Go to page: </span>
      <TextField
        className={classes.margin}
        type="number"
        defaultValue={pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(page);
        }}
        style={{ width: 150 }}
        variant="outlined"
        size="small"
        label="Page"
      />
      <Autocomplete
        id="filter"
        options={[5, 10, 20, 30, 40, 50]}
        size="small"
        getOptionLabel={(option) => `Show ${option}`}
        style={{ width: 150 }}
        renderInput={(params) => (
          <TextField {...params} label="pageSize" variant="outlined" />
        )}
        value={pageSize}
        onChange={(e, v) => {
          if (Number(v)) setPageSize(Number(v));
        }}
      />
    </div>
  );
};

export default Pagging;