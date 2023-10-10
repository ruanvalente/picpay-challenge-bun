import express from "express";
import { UserController } from "../../controllers/user";

export class UserRoute {
  private router = express.Router();
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/users",
      this.userController.getAllUsers.bind(this.userController)
    );
    this.router.post(
      "/users",
      this.userController.createUser.bind(this.userController)
    );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
