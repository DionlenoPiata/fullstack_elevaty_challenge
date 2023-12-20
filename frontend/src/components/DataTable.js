import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";

import CustomersContext from "../contexts/CustomersContext";

export default function DataTable({ columns }) {
  const [customers, setCustomers] = useContext(CustomersContext);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL_API}/customers?limit=${pageSize}&page=${page}`
        );
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Erro ao buscar dados do servidor:", error);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    console.log("newPage:", newPage);
    setPage(newPage.page + 1);
    setPageSize(newPage.pageSize);
  };

  return (
    <div style={{ maxHeight: "100%", width: "100%" }}>
      <DataGrid
        rows={customers.result}
        columns={columns}
        pagination
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 15, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        getRowId={(row) => row._id}
        rowCount={customers.totalDocs}
        page={page}
        paginationMode="server"
        onPaginationModelChange={handlePageChange}
        disableRowSelectionOnClick
      />
    </div>
  );
}
