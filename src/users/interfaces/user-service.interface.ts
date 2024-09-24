import { UserRole } from "src/common/enums";
import { Permission } from "../entities";
import { User } from "../entities/users.entity";

export interface IUserService {
    findUserById(id: string): Promise<User>;
    findAllUsers(): Promise<User[]>;
    getPermissionsByUserRole(role: UserRole): Promise<Permission[]>
    forgotPasswordRequest(id: string): Promise<void>;

}