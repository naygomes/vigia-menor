import { Router } from "express";
import { InMemoryAuthRepository } from "@/repositories";
import { AuthService } from "@/services";
import { AuthController } from "@/controllers";
import { ensureAuthenticated } from "@/middlewares";

const authRoutes = Router();

const authRepository = new InMemoryAuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);

authRoutes.use(ensureAuthenticated);
authRoutes.get("/users/:id", authController.findById);

export { authRoutes };
