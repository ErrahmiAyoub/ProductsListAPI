import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import StoreIcon from "@material-ui/icons/Store";

export default function tableColumns() {
  return [
    {
      // Make an expander cell
      Header: () => null, // No header
      id: "expander", // It needs an ID
      Cell: ({ row }) => (
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? <RemoveIcon /> : <AddIcon />}
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
            <IconButton aria-label="delete">
              <AttachFileIcon fontSize="large" color="primary" />
            </IconButton>
          </a>
        );
      },
    },
    {
      Header: "Store",
      accessor: (d) => {
        return (
          <a href={d.link} target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="delete">
              <StoreIcon fontSize="large" color="primary" />
            </IconButton>
          </a>
        );
      },
    },
  ];
}
