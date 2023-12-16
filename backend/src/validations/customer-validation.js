"use strict";

const { object, array, string, date } = require("yup");

const creditCardSchema = object({
  cardNumber: string()
    .required()
    .matches(
      /^(?:[0-9]{16}|[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4})$/,
      "O número do cartão de crédito deve ter 16 dígitos ou seguir o formato 0000-0000-0000-0000."
    ),
  cardHolder: string()
    .required("Nome do titular é obrigatório")
    .max(50, "Nome do titular deve ter no máximo 50 caracteres"),
  expirationDate: string()
    .required("Data de validade é obrigatória")
    .length(5, "A data de validade deve ter exatamente 5 caracteres (MM/AA)")
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "A data de validade deve estar no formato MM/AA"
    )
    .test(
      "is-future-date",
      "A data de validade deve ser no futuro",
      function (value) {
        if (!value) return false;

        const [month, year] = value.split("/");
        const currentDate = new Date();
        const cardExpirationDate = new Date(`20${year}`, month - 1); // -1 porque os meses em JavaScript são indexados em 0

        return cardExpirationDate > currentDate;
      }
    ),
  cvv: string()
    .required("CVV é obrigatório")
    .length(3, "O CVV deve ter exatamente 3 caracteres")
    .matches(/^[0-9]+$/, "O CVV deve ser composto apenas por números"),
});

const customerSchema = object({
  fullName: string().required("O nome é obrigatório"),
  email: string()
    .email("Digite um e-mail válido")
    .required("O e-mail é obrigatório"),
  birthDate: date().max(new Date(), "deve ser uma data no passado").required(),
  phone: string()
    .required("Número de telefone é obrigatório")
    .matches(
      /^(\+\d{1,2}\s?)?(\(\d{2,3}\)\s?)?\d{4,5}[-.\s]?\d{4}$/,
      "Número de telefone inválido. Use o formato correto, incluindo DDI e DDD opcionalmente."
    ),
  address: string().required("O endereço é obrigatório"),
  creditCards: array().of(creditCardSchema),
  invoiceLink: string(),
});

exports.validate = async (customer) => {
  return await customerSchema.validate(customer);
};
