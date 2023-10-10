import { PrismaClient, User } from "@prisma/client";

export class TransactionsServices {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = new PrismaClient();
  }

  public async findUserById(userId: string) {
    return await this.prismaClient.user.findUnique({
      where: { id: userId },
    });
  }

  public async createTransactionInDB(
    sender_id: string,
    receiver_id: string,
    amount: number,
    isMerchant: boolean
  ) {
    return await this.prismaClient.$transaction(async (p) => {
      const transaction = await p.transaction.create({
        data: {
          sender: { connect: { id: sender_id } },
          receiver: { connect: { id: receiver_id } },
          amount,
          senderIsMerchantInstance: isMerchant,
        },
      });

      await p.user.update({
        where: { id: sender_id },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      await p.user.update({
        where: { id: receiver_id },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      return transaction;
    });
  }

  public hasSufficientBalance(balance: number, amount: number) {
    return balance >= amount;
  }

  public async verifyInstanceOfMerchant(user: User) {
    return (await user.type.toLowerCase()) === "merchant";
  }
}
