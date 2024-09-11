import { ApiProperty } from "@nestjs/swagger";

export class ApiSuccessResponseDto<T> {
    @ApiProperty({ example: 200, description: 'The HTTP status code' })
    statusCode: number;
  
    @ApiProperty({ default: 'Request was succesful'})
    message: string;
  
    @ApiProperty()
    data: T;
  
  }

  export class ApiCreatedResponseDto<T> {
    @ApiProperty({ example: 201, description: 'The HTTP status code', default: 201 })
    statusCode: number;
  
    @ApiProperty({ default: 'request was succesful'})
    message: string;
  
    @ApiProperty()
    data: T;
  
  }

  export class ApiBadRequestResponseDto {
    @ApiProperty({ example: 400, description: 'The HTTP status code' })
    statusCode: number;
  
    @ApiProperty({ example: 'Name is necessary', description: 'An array of field error messages', default: 'Name is necessary' })
    message: string;
  
    @ApiProperty({ example: 'Bad Request', description: 'The type of error', default: 'Bad Request' })
    error: string;

  }

  export class ApiNotFoundResponseDto {
    @ApiProperty({ example: 400, description: 'The HTTP status code' })
    statusCode: number;
  
    @ApiProperty({ description: 'An array of field error messages', default: 'Resource not found' })
    message: string;
  
    @ApiProperty({ description: 'The type of error', default: 'Not Found' })
    error: string;
  }

  export class ApiUnauthorizedResponseDto {
    @ApiProperty({ example: 400, description: 'The HTTP status code' })
    statusCode: number;
  
    @ApiProperty({ description: 'An array of field error messages', default: "You don't have access" })
    message: string;
  
    @ApiProperty({ description: 'The type of error', default: 'Unauthorized' })
    error: string;
  }

  export class ApiForbiddenResponseDto {
    @ApiProperty({ example: 400, description: 'The HTTP status code' })
    statusCode: number;
  
    @ApiProperty({ description: 'An array of field error messages', default: "You don't have permission to acces this resource" })
    message: string;
  
    @ApiProperty({ description: 'The type of error', default: 'Forbidden' })
    error: string;
  }