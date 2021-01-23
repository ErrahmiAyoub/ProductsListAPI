import React from "react";
import Paper from "@material-ui/core/Paper";

export default function SubComponent({ row }) {
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
    <Paper
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 1em",
      }}
    >
      <div>
        <h1>Specifications</h1>
        <ul>{specification}</ul>
      </div>
      <div>
        <h1>Features</h1>
        <ul>{features}</ul>
      </div>
    </Paper>
  );
}
