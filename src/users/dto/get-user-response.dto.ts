import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/roles.enum';

export class GetUserResponseDto {
  @ApiProperty({ example: 'd6045f0b-138e-4292-b908-bcbe8d415bb6' })
  id: string;

  @ApiProperty({ example: 'daniela@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Daniela Mendoza' })
  name: string;

  @ApiProperty({ example: 'tutor', enum: UserRole})
  role: UserRole;

  @ApiProperty({ example: '+57 3128889999' })
  cellphone: string;
}