const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "../src/docs/swagger_output.json";
const endpointsFiles = [
  "../src/routes/index-route.js",
  "../src/routes/customer-route.js",
];

const doc = {
  info: {
    version: "1.0.0",
    title: `${process.env.APP_NAME}`,
    description: "description",
  },
  servers: [
    {
      url: `localhost:${process.env.PORT}`,
    },
  ],

  components: {
    schemas: {
      indexResponse: {
        message: `${process.env.APP_NAME}`,
      },
      customerRequest: {
        fullName: "João Silva",
        email: "joao.silva@example.com",
        birthDate: "1990-01-15",
        phone: "+55(11)98765-4321",
        address: "Rua Exemplo, 123",
        creditCards: [
          {
            cardNumber: "1234567890123456",
            cardHolder: "João Silva",
            expirationDate: "12/23",
            cvv: "123",
          },
          {
            cardNumber: "9876543210987654",
            cardHolder: "Joana Silva",
            expirationDate: "10/24",
            cvv: "456",
          },
        ],
        invoiceLink:
          "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
      },
      customerResponse: {
        fullName: "João Silva",
        email: "joao.silva@example.com",
        birthDate: "1990-01-15",
        phone: "+55(11)98765-4321",
        address: "Rua Exemplo, 123",
        creditCards: [
          {
            cardNumber: "1234567890123456",
            cardHolder: "João Silva",
            expirationDate: "12/23",
            cvv: "123",
          },
          {
            cardNumber: "9876543210987654",
            cardHolder: "Joana Silva",
            expirationDate: "10/24",
            cvv: "456",
          },
        ],
        invoiceLink:
          "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
        createdAt: "2023-01-01T12:00:00Z",
        updatedAt: "2023-12-14T15:30:00Z",
      },
      customerArrayResponse: {
        result: [
          {
            _id: "657dfbfd9f393d43fd5146c3",
            fullName: "João Silva de Oliveira",
            email: "joao.silva@example.com",
            birthDate: "1990-01-15T02:00:00.000Z",
            phone: "+55(11)98765-4321",
            address: "Rua Exemplo, 123",
            creditCards: [
              {
                cardNumber: "1234-5678-9012-3456",
                cardHolder: "João Silva",
                expirationDate: "12/24",
                cvv: "123",
                _id: "657dfc0f9f393d43fd5146c7",
              },
              {
                cardNumber: "9876-5432-1098-7654",
                cardHolder: "Joana Silva",
                expirationDate: "10/24",
                cvv: "456",
                _id: "657dfc0f9f393d43fd5146c8",
              },
            ],
            invoiceLink: "https://example.com/invoice",
            createdAt: "2023-12-16T19:35:25.260Z",
            updatedAt: "2023-12-16T19:35:43.701Z",
            __v: 0,
          },
          {
            _id: "6582d1ca2e6a3d2a3942ade8",
            fullName: "Ana Souza",
            email: "ana.souza@example.com",
            birthDate: "1988-07-10T03:00:00.000Z",
            phone: "+55(11)76543-2109",
            address: "Rua Amostra, 789",
            creditCards: [
              {
                cardNumber: "8765-4321-0987-6543",
                cardHolder: "Ana Souza",
                expirationDate: "08/24",
                cvv: "345",
                _id: "6582d1ca2e6a3d2a3942ade9",
              },
              {
                cardNumber: "2109-8765-4321-0987",
                cardHolder: "Pedro Souza",
                expirationDate: "11/24",
                cvv: "678",
                _id: "6582d1ca2e6a3d2a3942adea",
              },
            ],
            invoiceLink: "https://example.com/invoice",
            createdAt: "2023-12-20T11:36:42.910Z",
            updatedAt: "2023-12-20T11:36:42.910Z",
            __v: 0,
          },
        ],
        totalDocs: 5,
        page: "2",
        totalPages: 3,
        hasNext: true,
        hasPrev: true,
      },
      customerCreateResponse: {
        id: "6582f7c2c477e7fbde0700f0",
        message: "Cadastro realizado com sucesso!",
      },
      customerUpdateResponse: {
        message: "Atualizado com sucesso!",
      },
      customerDeleteResponse: {
        message: "Removido com sucesso!",
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
