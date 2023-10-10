import { Request, Response } from "express";
import { prisma } from "../../config/prisma/prisma-client";
import { User } from "@prisma/client";

export class UserController {
  public async getAllUsers(request: Request, response: Response) {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return response
      .send({
        data: { users },
      })
      .status(200);
  }

  public async createUser(request: Request, response: Response) {
    const { fullName, cpf, password, balance, type } = request.body as User;

    const user = await prisma.user.create({
      data: {
        fullName,
        cpf,
        password,
        balance,
        type,
      },
    });

    if (!user) {
      return response
        .send({ message: "Error creating user, please try again" })
        .status(400);
    }

    return response
      .send({
        data: { user },
      })
      .status(201);
  }
}
