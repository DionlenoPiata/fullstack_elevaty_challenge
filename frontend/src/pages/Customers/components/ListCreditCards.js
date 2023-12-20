import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import InputMask from "react-input-mask";

const ListCreditCards = ({ creditCards, setCreditCards }) => {
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardHolder, setNewCardHolder] = useState("");
  const [newExpirationDate, setNewExpirationDate] = useState("");
  const [newCvv, setNewCvv] = useState("");

  const handleAddCard = () => {
    if (newCardNumber.trim() !== "") {
      setCreditCards([
        ...creditCards,
        {
          cardNumber: newCardNumber,
          cardHolder: newCardHolder,
          expirationDate: newExpirationDate,
          cvv: newCvv,
        },
      ]);
      setNewCardNumber("");
      setNewCardHolder("");
      setNewExpirationDate("");
      setNewCvv("");
    }
  };

  const handleDeleteCard = (index) => {
    const updatedCards = creditCards.filter((_, i) => i !== index);
    setCreditCards(updatedCards);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Cartões de Crédito
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Número do Cartão"
            variant="outlined"
            fullWidth
            value={newCardNumber}
            onChange={(e) => setNewCardNumber(e.target.value)}
          />

          <TextField
            label="Nome do Titular"
            variant="outlined"
            fullWidth
            value={newCardHolder}
            onChange={(e) => setNewCardHolder(e.target.value)}
          />
          <TextField
            label="Data de Validade (MM/AA)"
            variant="outlined"
            fullWidth
            value={newExpirationDate}
            onChange={(e) => setNewExpirationDate(e.target.value)}
          />
          <TextField
            label="CVV"
            variant="outlined"
            fullWidth
            value={newCvv}
            onChange={(e) => setNewCvv(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddCard}>
            Adicionar Cartão
          </Button>
        </Grid>
      </Grid>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {creditCards.map((card, index) => (
          <Card key={index} variant="outlined" style={{ marginTop: "20px" }}>
            <CardContent>
              <Typography variant="h6">Cartão</Typography>
              <Typography>Número cartão: {card.cardNumber}</Typography>
              <Typography>Nome do Titular: {card.cardHolder}</Typography>
              <Typography>Data de Validade: {card.expirationDate}</Typography>
              <Typography>CVV: {card.cvv}</Typography>
              <Button
                color="secondary"
                onClick={() => handleDeleteCard(index)}
                style={{ marginTop: "10px" }}
              >
                Excluir
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default ListCreditCards;
