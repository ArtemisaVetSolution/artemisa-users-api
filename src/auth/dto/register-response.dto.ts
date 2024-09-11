import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword, IsUUID, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterResponseDto {

    @ApiProperty({ description: 'ID', example: '469b7a32-810c-45c2-846f-c095e667e929'})
    @IsUUID()
    id: string
    
    @ApiProperty({ description: 'EMAIL', example: 'anita_bonita@gmail.com'})
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiProperty({ description: 'NAME', example: 'Ana Alzate'})
    @IsString()
    @MinLength(1)
    name: string;
    
}