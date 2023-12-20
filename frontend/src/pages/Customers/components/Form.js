import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FormTitle from "../../../components/FormTitle";
import ListCreditCards from "./ListCreditCards";
import { CustomerSchema } from "../schemas/CustomerSchema";
import { useNotification } from "../../../contexts/NotificationContext";

export default function Form() {
  const { showNotification } = useNotification();
  const [creditCards, setCreditCards] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(CustomerSchema),
  });

  useEffect(() => {
    if (!id) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL_API}/customers/${id}`,
      headers: {},
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        setValue("fullName", response.data.fullName);
        setValue("email", response.data.email);
        setValue("birthDate", new Date(response.data.birthDate));
        setValue("phone", response.data.phone);
        setValue("address", response.data.address);
        setValue("invoiceLink", response.data.invoiceLink);
        setCreditCards(response.data.creditCards);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  const onSubmit = (data) => {
    let config = {
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL_API}/customers`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...data, creditCards: creditCards },
    };

    if (!id) {
      config["method"] = "post";
    } else {
      config["method"] = "put";
      config.url += `/${id}`;
    }
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        showNotification("success", response.data.message);
        navigate("/customers/");
      })
      .catch((error) => {
        console.log(error);
        showNotification("error", error.response.data.message);
        navigate("/customers/");
      });
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 2 }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ marginBottom: 2 }}
      >
        <TextField
          label="Nome Completo"
          defaultValue={" "}
          fullWidth={true}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          sx={{ marginBottom: 2 }}
          {...register("fullName")}
        />
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { ...field } }) => (
            <FormControl fullWidth={true}>
              <DatePicker label="Data de Nascimento" {...field} />
            </FormControl>
          )}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ marginBottom: 2 }}
      >
        <TextField
          label="E-mail"
          defaultValue={" "}
          fullWidth={true}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <TextField
          label="Endereço"
          defaultValue={" "}
          fullWidth={true}
          error={!!errors.address}
          helperText={errors.address?.message}
          {...register("address")}
        />

        <Controller
          control={control}
          name="phone"
          defaultValue=""
          render={({ field: { ...field } }) => (
            <FormControl fullWidth={true}>
              <InputMask mask="(99) 99999-9999" {...field}>
                <TextField
                  label="Celular"
                  fullWidth={true}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </InputMask>
            </FormControl>
          )}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ marginBottom: 2 }}
      >
        <TextField
          label="Link da fatura"
          defaultValue={" "}
          fullWidth={true}
          error={!!errors.invoiceLink}
          helperText={errors.invoiceLink?.message}
          {...register("invoiceLink")}
        />
      </Stack>
      <FormTitle title="Cartões" />

      <ListCreditCards
        creditCards={creditCards}
        setCreditCards={setCreditCards}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button type="submit" variant="contained" size="large">
          Salvar
        </Button>
        <Button component={RouterLink} to="/customers">
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
}
