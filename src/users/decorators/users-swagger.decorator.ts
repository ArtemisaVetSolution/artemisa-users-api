import { applyDecorators, Type } from "@nestjs/common"
import { ApiOperation, ApiBearerAuth, ApiParam } from "@nestjs/swagger"
import { ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray, ApiUnauthorized } from "src/common/decorators/swagger.decorator"
import { UUID } from "typeorm/driver/mongodb/bson.typings"

export function ApiDocGetAllUsers <T> (entity: Type<T>){
    return applyDecorators(
        ApiOperation({
            summary: 'Get all users',
            description: 'This endpoint allows to get all users'
        }),
        ApiSuccessResponsesArray(entity),
        ApiUnauthorized()
    )
}

export function ApiDocGetUserById <T> (entity: Type<T>){
    return applyDecorators(
        ApiOperation({
            summary: 'Get user by id',
            description: 'This endpoint allows to get a user by id'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: UUID,
            description: 'User ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}