import { IAuthRepository, ILoginResponse, IUser } from "@/types";
import { BadRequestError } from "@/errors";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private authRepository: IAuthRepository) {}

  async login(email: string, password: string): Promise<ILoginResponse> {
    const user = await this.authRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new BadRequestError("E-mail ou senha inválidos.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "chave_secreta_super_segura_para_dev",
      { expiresIn: "1d" },
    );

    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }
}
