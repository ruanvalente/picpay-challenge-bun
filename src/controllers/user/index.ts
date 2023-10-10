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
    return response.status(200).json({
      data: { users },
    });
  }

  public async createUser(request: Request, response: Response) {
    const { fullName, cpf, password, balance, type } = request.body as User;

    if (!fullName || !cpf || !password || !balance || !type) {
      return response
        .status(500)
        .json({ message: "Error creating user, please try again" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { cpf },
    });

    if (existingUser) {
      return response
        .status(400)
        .json({ message: "User already registered in the system" });
    }

    const user = await prisma.user.create({
      data: {
        fullName,
        cpf,
        password,
        balance,
        type,
      },
    });

    return response.status(201).json({
      data: { user },
    });
  }
}
