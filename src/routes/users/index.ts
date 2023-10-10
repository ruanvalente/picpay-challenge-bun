import express from "express";
import { UserController } from "../../config/controllers/user";

export class UserRoute {
  private router = express.Router();
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      this.userController.getAllUsers.bind(this.userController)
    );
    this.router.post(
      "/",
      this.userController.createUser.bind(this.userController)
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
