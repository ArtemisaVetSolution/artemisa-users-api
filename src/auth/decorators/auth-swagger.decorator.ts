import { applyDecorators, Type } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";
import { CreateUserDto, LoginUserDto } from "../dto";
import { ApiBadRequest, ApiCreated, ApiSuccessResponses, ApiSuccessResponsesArray, ApiUnauthorized } from "src/common/decorators/swagger.decorator";
import { Entity } from 'typeorm';

export function ApiDocRegisterUser <T>(entity: Type<T>){
    return applyDecorators(
        ApiOperation({
            summary: 'Register a new user',
            description: 'This endpoint allows to create a new user'
        }),
        ApiBody({
            type: CreateUserDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    )
}

export function ApiDocLoginUser <T> (entity: Type<T>){
    return applyDecorators(
        ApiOperation({
            summary: 'Login the user',
            description: 'This endpoint allows to login a user'
        }),
        ApiBody({
            type: LoginUserDto
        }),
        ApiSuccessResponses(entity),
        ApiUnauthorized()
    )
}

