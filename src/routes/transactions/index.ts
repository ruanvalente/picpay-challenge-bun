import express from "express";
import { TransactionsController } from "../../controllers/transactions";

export class TransactionsRoute {
  private router = express.Router();
  private transactionController: TransactionsController;

  constructor() {
    this.transactionController = new TransactionsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/transactions",
      this.transactionController.getAllTransactions.bind(
        this.transactionController
      )
    );
    this.router.post(
      "/transactions",
      this.transactionController.createTransaction.bind(
        this.transactionController
      )
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
