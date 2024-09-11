import { Type, applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { ApiBadRequestResponseDto, ApiCreatedResponseDto, ApiForbiddenResponseDto, ApiNotFoundResponseDto, ApiSuccessResponseDto, ApiUnauthorizedResponseDto } from "../docs/api-responses.dto";

export function ApiSuccessResponses<T>(entity: Type<T>) {
    return applyDecorators(
        ApiExtraModels(ApiSuccessResponseDto),
        ApiOkResponse({
            status: HttpStatus.OK,
            description: `Request Succesfull`,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiSuccessResponseDto) },
                    {
                        properties: {
                            data: { $ref: getSchemaPath(entity) },
                        },
                    },
                ],
            },
        })
    );
}

export function ApiSuccessResponsesArray<T>(entity: Type<T>) {
    return applyDecorators(
        ApiExtraModels(ApiSuccessResponseDto),
        ApiOkResponse({
            status: HttpStatus.OK,
            description: `Request Successful`,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiSuccessResponseDto) },
                    {
                        properties: {
                            data: {
                                
                                type: 'array',
                                items: { $ref: getSchemaPath(entity) },
                            },
                        },
                    },
                ],
            },
        })
    );
}

export function ApiCreated<T>(entity: Type<T>) {
    return applyDecorators(
        ApiExtraModels(ApiCreatedResponseDto),
        ApiCreatedResponse({
            status: HttpStatus.CREATED,
            description: `Created`,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiCreatedResponseDto) },
                    {
                        properties: {
                            
                            data: { $ref: getSchemaPath(entity) },
                        },
                    },
                ],
            },
        })
    );
}


export function ApiBadRequest<T>() {
    return applyDecorators(
        ApiExtraModels(ApiBadRequestResponseDto),
        ApiBadRequestResponse({
            status: HttpStatus.BAD_REQUEST,
            description: `Bad request`,
            schema: {
                $ref: getSchemaPath(ApiBadRequestResponseDto)
            },
        })
    );
}

export function ApiNotFound<T>() {
    return applyDecorators(
        ApiExtraModels(ApiNotFoundResponseDto),
        ApiNotFoundResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Not found',
            schema: {
                $ref: getSchemaPath(ApiNotFoundResponseDto)
            }
        })
    )
}

export function ApiUnauthorized<T>() {
    return applyDecorators(
        ApiExtraModels(ApiUnauthorizedResponseDto),
        ApiNotFoundResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: 'Unauthorized',
            schema: {
                $ref: getSchemaPath(ApiUnauthorizedResponseDto)
            }
        })
    )
}

export function ApiForbidden<T>() {
    return applyDecorators(
        ApiExtraModels(ApiForbiddenResponseDto),
        ApiNotFoundResponse({
            status: HttpStatus.FORBIDDEN,
            description: 'Unauthorized',
            schema: {
                $ref: getSchemaPath(ApiForbiddenResponseDto)
            }
        })
    )
}