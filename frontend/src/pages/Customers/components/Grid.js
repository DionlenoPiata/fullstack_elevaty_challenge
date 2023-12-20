import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "../../../components/DataTable";
import CustomersContext from "../../../contexts/CustomersContext";

export default function Grid() {
  const [customers, setCustomers] = useContext(CustomersContext);

  const navigate = useNavigate();

  const onViewInvoice = (params) => {
    if (!params.row.invoiceLink) return;

    window.open(`${params.row.invoiceLink}`, "_blank");
  };

  const onEdit = (params) => {
    if (!params.row._id) return;
    navigate(`/customers/${params.row._id}`);
  };

  const onView = (params) => {
    if (!params.row._id) return;
    navigate(`/customers/view/${params.row._id}`);
  };

  const onDelete = (params) => {
    if (!params.row._id) return;

    let config = {
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL_API}/customers/${params.row._id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setCustomers({
          ...customers,
          result: customers.result.filter(
            (customer) => customer._id !== params.row._id
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "Nome",
      valueGetter: (params) =>
        `${params.row.fullName.split(" ")?.shift() || ""}`,
    },
    {
      field: "lastName",
      headerName: "Sobrenome",
      valueGetter: (params) => `${params.row.fullName.split(" ")?.pop() || ""}`,
    },
    {
      field: "age",
      headerName: "Idade",
      type: "number",
      valueGetter: (params) =>
        params.row.birthDate &&
        `${
          new Date().getFullYear() -
          new Date(params.row.birthDate).getFullYear()
        }`,
    },
    { field: "email", headerName: "E-mail", minWidth: 200 },
    { field: "phone", headerName: "Celular", minWidth: 180 },
    {
      field: "invoiceLink",
      headerName: "Fatura",
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton
            href={params.invoiceLink}
            target="_blank"
            rel="noopener noreferrer"
            color="success"
            size="small"
            onClick={() => onViewInvoice(params)}
          >
            <ReceiptLongIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
    {
      field: "actions",
      headerName: "Ações",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton color="info" size="small" onClick={() => onView(params)}>
            <VisibilityIcon fontSize="inherit" />
          </IconButton>

          <IconButton color="info" size="small" onClick={() => onEdit(params)}>
            <EditIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(params)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return <DataTable columns={columns} />;
}
