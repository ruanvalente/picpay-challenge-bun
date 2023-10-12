import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { TransactionsRoute } from "./routes/transactions";
import { UserRoute } from "./routes/users";
import swaggerFile from "./swagger/swagger_output.json";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.routes();
  }

  private routes() {
    const userRoutes = new UserRoute();
    const transactionRoutes = new TransactionsRoute();

    this.app.use("/api", userRoutes.getRouter());
    this.app.use("/api", transactionRoutes.getRouter());
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  public startServer(PORT: number | string) {
    this.app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  }
}
