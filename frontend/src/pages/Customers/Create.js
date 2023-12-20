import { Paper, Stack } from "@mui/material";

import Breadcrumbs from "../../components/Breadcrumbs";
import PageTitle from "../../components/PageTitle";

import Form from "./components/Form";

export default function Create() {
  return (
    <>
      <Stack sx={{ marginBottom: 2 }}>
        <PageTitle title="Criar Novo Cliente" />
        <Breadcrumbs
          path={[{ label: "Clientes", to: "/customers/" }, { label: "Novo" }]}
        />
      </Stack>
      <Paper>
        <Form />
      </Paper>
    </>
  );
}
