  import { CreateUserDto, LoginUserDto } from "../dto";
  import { User } from "../../users/entities/users.entity";

  export interface LoginResponse extends Partial<User> {
    token: string;
  }

  export interface IAuthService {
    register(createUserDto: CreateUserDto): Promise<string>;
    login(loginUserDto: LoginUserDto): Promise<LoginResponse>;
  
  }