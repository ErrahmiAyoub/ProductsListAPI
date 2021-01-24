import React, { useEffect, useState } from "react";
import Table from "./ReactTable/Table";
import tableColumns from "./TableColumns";
import SubComponent from "./ReactTable/SubComponent";
import ProgressBar from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import internalProduct from "./products.json";

function App() {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const url = "http://app.getrecall.com:8080/products/";
  const [productsList, setProductsList] = useState(null);
  const loadData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setProductsList(data.products);
    setLoading(false);
    console.log(
      "data loaded from API : http://app.getrecall.com:8080/products/"
    );
  };

  const LoadDataInternaly = () => {
    console.log("data loaded from internal file");
    setProductsList(internalProduct.products);
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    loadData().catch((e) => {
      LoadDataInternaly();
    });
  }, []);

  const columns = React.useMemo(() => tableColumns(), []);

  const renderRowSubComponent = React.useCallback(
    ({ row }) => <SubComponent row={row} />,
    []
  );

  return (
    <>
      <h1>Products list</h1>

      {!loading ? (
        <Table
          columns={columns}
          data={productsList}
          renderRowSubComponent={renderRowSubComponent}
        />
      ) : (
        !error && <ProgressBar />
      )}

      {error && (
        <Alert style={{ marginTop: "40px" }} severity="error">
          Fetch Error
        </Alert>
      )}
    </>
  );
}

export default App;
