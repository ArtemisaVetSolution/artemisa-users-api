import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/users.entity';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { IUserService } from './interfaces/user-service.interface';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  @CatchErrors()
  async findUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @CatchErrors()
  async findAllUsers() {
    return await this.userRepository.find();
  }



}
