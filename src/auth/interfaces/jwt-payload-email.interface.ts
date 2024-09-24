import { Tokens } from "src/common/enums";

export interface JwtPayloadEmail {
    userId: string;
    type: Tokens;
}