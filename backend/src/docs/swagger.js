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
      customerResponse: {
        fullName: "João Silva",
        email: "joao.silva@example.com",
        birthDate: "1990-01-15",
        phone: "+55(11)98765-4321",
        address: "Rua Exemplo, 123",
        creditCards: [
          {
            cardNumber: "1234-5678-9012-3456",
            cardHolder: "João Silva",
            expirationDate: "12/23",
            cvv: "123",
          },
          {
            cardNumber: "9876-5432-1098-7654",
            cardHolder: "Joana Silva",
            expirationDate: "10/24",
            cvv: "456",
          },
        ],
        invoiceLink: "https://example.com/invoice",
        createdAt: "2023-01-01T12:00:00Z",
        updatedAt: "2023-12-14T15:30:00Z",
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
