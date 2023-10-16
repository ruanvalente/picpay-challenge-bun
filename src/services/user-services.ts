import { PrismaClient, User } from "@prisma/client";

export class UserService {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = new PrismaClient();
  }

  public async getUsers(): Promise<User[]> {
    return await this.prismaClient.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public checkInvalidUser(user: any): boolean | undefined {
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        if (user[key] === null || user[key] === undefined || user[key] === "") {
          return true;
        }
        return false;
      }
    }
  }

  public async checkExistingUser(cpf: string) {
    return await this.prismaClient.user.findUnique({
      where: { cpf },
    });
  }

  public async createUser(user: User): Promise<void> {
    await this.prismaClient.user.create({
      data: {
        fullName: user.fullName,
        cpf: user.cpf,
        password: user.password,
        balance: user.balance,
        type: user.type,
      },
    });
  }
}
