import { useEffect, useState } from "react";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

import Breadcrumbs from "../../components/Breadcrumbs";
import PageTitle from "../../components/PageTitle";

export default function View() {
  const { id } = useParams();

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    phone: "",
    address: "",
    creditCards: [],
    invoiceLink: "",
  });

  useEffect(() => {
    if (!id) return;
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL_API}/customers/${id}`,
      headers: {},
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setCustomer(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  return (
    <>
      <Stack sx={{ marginBottom: 2 }}>
        <PageTitle title="Visualizar Cliente" />
        <Breadcrumbs
          path={[
            { label: "Clientes", to: "/customers/" },
            { label: "Visualização" },
          ]}
        />
      </Stack>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {customer.fullName}
          </Typography>
          <Typography variant="body1" paragraph>
            Email: {customer.email}
          </Typography>
          <Typography variant="body1" paragraph>
            Data de Nascimento: {customer.birthDate}
          </Typography>
          <Typography variant="body1" paragraph>
            Telefone: {customer.phone}
          </Typography>
          <Typography variant="body1" paragraph>
            Endereço: {customer.address}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Cartões de Crédito:
          </Typography>
          <List>
            {customer.creditCards.map((card, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Número do Cartão: ${card.cardNumber}`}
                />
                <ListItemText
                  primary={`Titular do Cartão: ${card.cardHolder}`}
                />
                <ListItemText
                  primary={`Data de Expiração: ${card.expirationDate}`}
                />
                <ListItemText primary={`CVV: ${card.cvv}`} />
              </ListItem>
            ))}
          </List>

          <Typography variant="body1" paragraph>
            Link da Fatura:{" "}
            <Link
              href={customer.invoiceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {customer.invoiceLink}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
