import express, { Express, Request, Response } from "express";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.routes();
  }

  private routes() {
    this.app.get("/", (request: Request, response: Response) => {
      return response
        .send({
          data: { user: { name: "John", email: "email@email.com" } },
        })
        .status(200);
    });
  }

  public startServer(PORT: number | string) {
    this.app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  }
}
