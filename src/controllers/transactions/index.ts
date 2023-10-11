import { Transaction } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../config/prisma/prisma-client";
import { TransactionsServices } from "../../services/transactions-services";

export class TransactionsController {
  private transactionService: TransactionsServices;
  constructor() {
    this.transactionService = new TransactionsServices(prisma);
  }

  public async getAllTransactions(request: Request, response: Response) {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return response.status(200).json({
        data: { transactions },
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error fetching transactions." });
    }
  }

  public async createTransaction(request: Request, response: Response) {
    try {
      const { receiver_id, sender_id, amount } = request.body as Transaction;
      const userSender = await this.transactionService.findUserById(sender_id);
      const receiverUser = await this.transactionService.findUserById(
        receiver_id
      );

      if (!userSender || !receiverUser) {
        return response
          .status(404)
          .json({ message: "Sender or receiver not found." });
      }

      if (!receiver_id || !sender_id || !amount) {
        return response.status(400).json({
          message: "Bad Request: Missing receiver_id, sender_id, or amount.",
        });
      }

      const isMerchant = await this.transactionService.verifyInstanceOfMerchant(
        userSender
      );

      if (isMerchant) {
        return response
          .status(422)
          .json({ message: "Merchants cannot send money." });
      }

      const userBalance = this.transactionService.hasSufficientBalance(
        userSender.balance,
        amount
      );

      if (!userBalance) {
        return response.status(422).json({
          message: "Transaction is not completed. Insufficient balance.",
        });
      }

      await this.transactionService.createTransactionInDB(
        sender_id,
        receiver_id,
        amount,
        isMerchant
      );

      return response.status(201).json({
        data: { message: "Transaction was successful" },
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error creating transaction." });
    } finally {
      await prisma.$disconnect();
    }
  }
}
