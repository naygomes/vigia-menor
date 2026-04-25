import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { loadSeedData } from "@/utils";
import { IUser, IAuthRepository } from "@/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userPath = path.resolve(__dirname, "../../../data/users.json");

export class InMemoryAuthRepository implements IAuthRepository {
  private users: IUser[];

  constructor() {
    this.users = this.loadDb();
  }

  private loadDb(): IUser[] {
    const userData = loadSeedData(userPath);

    return userData;
  }

  private saveToDb() {
    if (userPath) {
      fs.writeFileSync(userPath, JSON.stringify(this.users, null, 2), "utf-8");
    }
  }

  async create(userData: Omit<IUser, "id">): Promise<IUser> {
    const newUser: IUser = { ...userData, id: crypto.randomUUID() };
    this.users.push(newUser);
    this.saveToDb();
    return newUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findById(id: string): Promise<IUser | null> {
    return this.users.find((user) => user.id === id) || null;
  }
}
