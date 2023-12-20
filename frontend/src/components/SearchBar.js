import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import CustomersContext from "../contexts/CustomersContext";
import SearchContext from "../contexts/SearchContext";

function SearchBar() {
  let history = useNavigate();
  const [customers, setCustomers] = useContext(CustomersContext);
  const [search, setSearch] = useContext(SearchContext);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce((nextValue) => fetchCustomers(nextValue), 1000),
    []
  );

  const fetchCustomers = async (nextValue) => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_BASE_URL_API}/customers?search=${nextValue}`,
      });
      setCustomers(response.data);
      setLoading(false);
      //history(`/customers/?search=${nextValue}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSearchChange = async (event) => {
    setLoading(true);
    const { value: nextValue } = event.target;
    setSearch({ value: nextValue });
    debouncedSearch(nextValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} p={2}>
        <Grid xs={12} sm={12}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Procure aqui"
              variant="standard"
              fullWidth
              value={search.value}
              onChange={handleSearchChange}
            />
          </Box>
        </Grid>

        {loading && (
          <Grid xs={12}>
            <LinearProgress />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default SearchBar;
