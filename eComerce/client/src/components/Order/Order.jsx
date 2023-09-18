import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function Order() {
  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "item", headerName: "Item", width: 130 },
    { field: "decription", headerName: "Decription", width: 100 },

    {
      field: "price",
      headerName: "Price (USD)",
      type: "number",
      width: 100,
    },
  ];

  const rows = [
    { id: 1, item: "Snow", decription: "Jon", price: 35 },
    { id: 2, item: "Lannister", decription: "Cersei", price: 42 },
    { id: 3, item: "Lannister", decription: "Jaime", price: 45 },
    { id: 4, item: "Stark", decription: "Arya", price: 16 },
    { id: 5, item: "Targaryen", decription: "Daenerys", price: 55 },
    { id: 6, item: "Melisandre", decription: "Gareld", price: 150 },
    { id: 7, item: "Clifford", decription: "Ferrara", price: 44 },
    { id: 8, item: "Frances", decription: "Rossini", price: 36 },
    { id: 9, item: "Roxie", decription: "Harvey", price: 65 },
  ];
  return (
    <div
      className="orderContainer"
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}

export default Order;
