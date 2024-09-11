import { User } from "../entities/users.entity";

export interface IUserService {
    findUserById(id: string): Promise<User>;
    findAllUsers(): Promise<User[]>;

}