import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "0 100px",
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
        <Grid xs={12} sm={5}>
          <h2>Specifications</h2>
          <ul>{specification}</ul>
        </Grid>

        <Grid xs={12} sm={7}>
          <h2>Features</h2>
          <ul>{features}</ul>
        </Grid>
      </Grid>
    </div>
  );
}
