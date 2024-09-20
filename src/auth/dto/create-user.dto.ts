import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";
import { UserRole } from "src/common/enums/roles.enum";

export class CreateUserDto {

    @ApiProperty({ description: "User's email", example: 'anita_bonita@gmail.com'})
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiProperty({ description: "User's name", example: 'Ana Alzate'})
    // @IsString()
    // @MinLength(1)
    name: string;
    
    @ApiProperty({ description: "User's password, the password must have a Uppercase, lowercase letter and a number", example: 'Daniela.123'})
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'password - The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @ApiProperty({ description: "User's cellphone", example: '+57 3128985580' })
    @IsString()
    @IsPhoneNumber(null, { message: 'cellphone - The cellphone number must be a valid phone number' })
    cellphone: string;
   
    @ApiProperty({ description: "User's role", example: 'admin' })
    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole;
}