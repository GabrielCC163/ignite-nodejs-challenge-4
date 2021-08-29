import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    if (!user_id) {
      return response.status(400).json({
        error: "user_id header param is required",
      });
    }

    const userId = String(user_id);

    try {
      const allUsers = this.listAllUsersUseCase.execute({ user_id: userId });

      return response.json(allUsers);
    } catch (error) {
      return response.status(400).json({
        error: "No user found",
      });
    }
  }
}

export { ListAllUsersController };
