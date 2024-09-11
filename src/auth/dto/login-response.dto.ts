import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsUUID } from "class-validator";

export class LoginResponseDto {

    @ApiProperty({ description: 'User ID', example: 'a20fec03-d918-4528-b8ff-f3e1548236b8' })
    @IsUUID()
    id: string;

    @ApiProperty({ description: 'User email', example: 'daniela@gmail.com' })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'JWT token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbGFAZ21haWwuY29tIiwiaWQiOiJhMjBmZWMwMy1kOTE4LTQ1MjgtYjhmZi1mM2UxNTQ4MjM2YjgiLCJpYXQiOjE3MjU5MzA1ODcsImV4cCI6MTcyNTkzNDE4N30.TGbZu0FVXYZEAobaLzTmbwUxefDVl4pwjL2ts0gzdi0' })
    @IsString()
    token: string;
}