import { UserRole } from "src/common/enums";
import { Permission } from "src/users/entities";

export interface JwtPayload {
    id: string;
    email: string;
    permisions: Permission[];
    role: UserRole

}