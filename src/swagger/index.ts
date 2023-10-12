import swaggerAutogen from "swagger-autogen";

const swagger = swaggerAutogen();
const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "../routes/transactions/index.ts",
  "../routes/users/index.ts",
];

swagger(outputFile, endpointsFiles);
