import { CreateUserDto, LoginUserDto } from "../dto";
import { User } from "../../users/entities/users.entity";
import { UserRole } from 'src/common/enums';
import { Permission } from 'src/users/entities';
import { JwtPayloadEmail } from "./jwt-payload-email.interface";
import { JwtPayload } from "./jwt-payload.interface";

export interface LoginResponse extends Partial<User> {
  token: string;
}

export interface IAuthService {
  register(createUserDto: CreateUserDto): Promise<string>;
  login(loginUserDto: LoginUserDto): Promise<LoginResponse>;
  getPermissionsByUserRole(role: UserRole): Promise<Permission[]>;
}