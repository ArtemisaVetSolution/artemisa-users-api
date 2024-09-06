import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
// import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  @CatchErrors()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  @CatchErrors()
  findAll() {
    throw new Error('Error in UsersController.findAll');
  }

  @Get(':id')
  @CatchErrors()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @Patch(':id')
  @CatchErrors()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @CatchErrors()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
