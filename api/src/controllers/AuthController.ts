import { Request, Response } from "express";
import { AuthService } from "@/services";
import { BadRequestError } from "@/errors";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("E-mail e senha são obrigatórios.");
    }

    const result = await this.authService.login(email, password);
    res.json(result);
  };
}
