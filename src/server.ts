import express, { Express } from "express";

import { UserRoute } from "./routes/users";
import { TransactionsRoute } from "./routes/transactions";

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
  }

  public startServer(PORT: number | string) {
    this.app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  }
}
