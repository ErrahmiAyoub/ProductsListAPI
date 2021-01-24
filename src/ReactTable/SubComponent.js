import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    whiteSpace: "wrap",
    [theme.breakpoints.up("md")]: {
      padding: "0 100px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "0",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function SubComponent({ row }) {
  const classes = useStyles();
  const features = row.original.features.map((obj) => {
    return <li>{obj}</li>;
  });
  const specification = row.original.specifications.map((obj) => {
    return (
      <li>
        {obj.name} : {obj.value}
      </li>
    );
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid sm={12} md={5}>
          <h2>Specifications</h2>
          <ul>{specification}</ul>
        </Grid>

        <Grid sm={12} md={7}>
          <h2>Features</h2>
          <ul>{features}</ul>
        </Grid>
      </Grid>
    </div>
  );
}
