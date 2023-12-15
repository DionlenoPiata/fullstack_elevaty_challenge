const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./src/docs/swagger_output.json";
const endpointsFiles = ["./src/routes/index-route.js"];

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
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
