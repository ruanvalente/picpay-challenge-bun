import express, { Express } from "express";
import { UserRoute } from "./routes/users";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.routes();
  }

  private routes() {
    const userRoutes = new UserRoute();
    this.app.use("/api", userRoutes.getRouter());
  }

  public startServer(PORT: number | string) {
    this.app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  }
}
