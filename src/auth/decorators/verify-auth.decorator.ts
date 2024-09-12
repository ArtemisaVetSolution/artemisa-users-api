import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { JwtAuthGuard, PermissionsGuard } from "../guards";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Leaves, Path } from "src/common/enums";

export function VerifyAuthService(permissions: Leaves){
    return applyDecorators(
        SetMetadata('permissions', permissions),
        UseGuards(JwtAuthGuard, PermissionsGuard),
        ApiBearerAuth('access-token')
    );
}

export const PathName = (pathname: Path) => 
    SetMetadata('pathname', pathname);