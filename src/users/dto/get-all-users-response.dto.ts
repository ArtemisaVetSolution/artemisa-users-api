import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/roles.enum';

export class GetAllUserResponseDto {
  @ApiProperty({ example: '93ff216c-f21f-4154-bdfb-7430a0491b0a' })
  id: string;

  @ApiProperty({ example: 'daniela@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Daniela Mendoza' })
  name: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: ['tutor'], enum: UserRole, isArray: true })
  roles: UserRole[];

  @ApiProperty({ example: '+57 3128889999' })
  cellphone: string;
}