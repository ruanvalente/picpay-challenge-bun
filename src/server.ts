import express, { Express, Request, Response } from "express";
import { UserRoute } from "./routes/users";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.routes();
  }

  private routes() {
    const userRoutes = new UserRoute();
    this.app.use("/users", userRoutes.getRouter());
  }

  public startServer(PORT: number | string) {
    this.app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  }
}
