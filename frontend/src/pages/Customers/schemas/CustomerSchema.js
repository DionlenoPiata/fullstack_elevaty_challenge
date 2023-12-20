import * as yup from "yup";

export const CustomerSchema = yup
  .object({
    fullName: yup.string().required("Este campo é obrigatório"),
    birthDate: yup.date(),
    email: yup
      .string()
      .email("E-mail não reconhecido")
      .required("Este campo é obrigatório"),
  })
  .required();
