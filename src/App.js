import React, { useEffect, useState } from "react";
import Table from "./ReactTable/Table";
import tableColumns from "./TableColumns";
import SubComponent from "./ReactTable/SubComponent";

function App() {
  // const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const url = "http://app.getrecall.com:8080/products";
  const [productsList, setProductsList] = useState(null);
  const loadData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setProductsList(data.products);
    setLoading(false);
  };

  useEffect(() => loadData(), []);

  const columns = React.useMemo(() => tableColumns(), []);

  const renderRowSubComponent = React.useCallback(
    ({ row }) => <SubComponent row={row} />,
    []
  );

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Products</h1>
      {!loading ? (
        <Table
          columns={columns}
          data={productsList}
          renderRowSubComponent={renderRowSubComponent}
        />
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
}

export default App;
