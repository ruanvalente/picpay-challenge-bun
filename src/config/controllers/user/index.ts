import { Request, Response } from "express";
import { prisma } from "../../../config/prisma/prisma-client";

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

  public createUser(request: Request, response: Response) {
    return response
      .send({
        data: { user: { name: "John", email: "john@example.com" } },
      })
      .status(200);
  }
}
