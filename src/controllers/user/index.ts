import { User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../config/prisma/prisma-client";
import { UserService } from "../../services/user-services";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(prisma);
  }
  public async getAllUsers(request: Request, response: Response) {
    const users = await this.userService.getUsers();
    return response.status(200).json({
      data: { users },
    });
  }

  public async createUser(request: Request, response: Response) {
    const { fullName, cpf, balance, type } = request.body as User;

    const isAValidUser = this.userService.checkInvalidUser(request.body);

    if (isAValidUser) {
      return response
        .status(500)
        .json({ message: "Error creating user, please try again" });
    }

    const existingUser = await this.userService.checkExistingUser(cpf);

    if (existingUser) {
      return response
        .status(400)
        .json({ message: "User already registered in the system" });
    }

    await this.userService.createUser(request.body);

    return response.status(201).json({
      data: { fullName, balance, type },
    });
  }
}
