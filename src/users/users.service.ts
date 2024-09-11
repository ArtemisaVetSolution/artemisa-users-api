import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { IUserService } from './interfaces/user-service.interface';
import { UserRole } from 'src/common/enums';
import { Permission, User } from './entities';


@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  @CatchErrors()
  async findUserById(id: string) {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @CatchErrors()
  async findAllUsers() {
    return await this.userRepository.find();
  }

  @CatchErrors()
  async getPermissionsByUserRole(role: UserRole){
    const permissions: Permission[] = await this.permissionRepository.findBy({ role });    
    if (!permissions) throw new NotFoundException('Permissions not found');
    return permissions;
  }



}
