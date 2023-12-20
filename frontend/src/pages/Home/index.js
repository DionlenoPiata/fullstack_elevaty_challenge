// Home.js
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <div>
      <h1>Bem-vindo à página inicial!</h1>
      <Button
        component={Link}
        to="/customers"
        variant="contained"
        color="primary"
      >
        Ir para a página de clientes
      </Button>
    </div>
  );
};

export default Home;
