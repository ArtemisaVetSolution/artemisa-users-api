import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty({ description: "User's email", example: 'artemisa_tutor_user@gmail.com'})
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "User's password, the password must have a Uppercase, lowercase letter and a number", example: 'Artemisa.tutor.123'})
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
    
}