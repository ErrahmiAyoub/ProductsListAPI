import React, { useEffect, useState } from "react";
import Table from "./ReactTable/Table";
import tableColumns from "./TableColumns";
import SubComponent from "./ReactTable/SubComponent";
import ProgressBar from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
// import internalProduct from "./products.json";

function App() {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const url = "https://app.getrecall.com/api/products";
  const [productsList, setProductsList] = useState(null);
  const loadData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setProductsList(data.products);
    setLoading(false);
  };

  // const LoadDataInternaly = () => {
  //   console.log("data loaded from internal file");
  //   setProductsList(internalProduct.products);
  //   setLoading(false);
  //   setError(true);
  // };

  useEffect(() => {
    loadData().catch(() => {
      //LoadDataInternaly()
      setError(true);
      setLoading(false);
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
        <Alert style={{ marginTop: "40px" }} severity="info">
          A fetch Error is catched
          {/* A fetch error is catched because of mixed content error the app is
          deployed in HTTPS but the API use HTTP protocoele. As a solution the
          content is loaded from an internal file containing the products data.
          If you want to get the content from the API link please run the
          application using HTTP protocole in the localhost for example. */}
        </Alert>
      )}
    </>
  );
}

export default App;
