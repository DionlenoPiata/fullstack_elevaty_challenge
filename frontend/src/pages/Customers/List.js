import React, { useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box, Button, Paper, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Breadcrumbs from "../../components/Breadcrumbs";
import PageTitle from "../../components/PageTitle";
import Grid from "./components/Grid";
import SearchBar from "../../components/SearchBar";
import CustomersContext from "../../contexts/CustomersContext";
import SearchContext from "../../contexts/SearchContext";

export default function List() {
  const [customers, setCustomers] = useState({ result: [] });
  const [search, setSearch] = useState({ value: "" });
  return (
    <>
      <CustomersContext.Provider value={[customers, setCustomers]}>
        <SearchContext.Provider value={[search, setSearch]}>
          <Stack direction={{ xs: "column", sm: "row" }} gap={1} mb={2}>
            <Box sx={{ flexGrow: 1 }}>
              <PageTitle title="Lista de clientes" />
              <Breadcrumbs
                path={[
                  { label: "Clientes", to: "/customers" },
                  { label: "lista" },
                ]}
              />
            </Box>
            <SearchBar />
            <Box sx={{ alignSelf: "center" }}>
              <Button
                component={RouterLink}
                to="/customers/new"
                variant="contained"
                startIcon={<PersonAddAltIcon />}
              >
                Novo Cliente
              </Button>
            </Box>
          </Stack>
          <Paper>
            <Grid />
          </Paper>
        </SearchContext.Provider>
      </CustomersContext.Provider>
    </>
  );
}
