import { Tokens } from "src/common/enums";
import { Token } from "../entities/token.entity";
import { User } from "src/users/entities";

export interface ITokenService {
    createToken(userId: User, type: Tokens): Promise<string>;
    verifyTokenConfirmationEmail(tokenString: string): Promise<boolean>;
    verifiTokenChangePassworg(tokenString: string, newPassword: string): Promise<boolean>;
}