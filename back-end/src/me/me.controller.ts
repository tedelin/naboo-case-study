import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserMapper } from 'src/user/mapper/user.mapper';
import { UserDto } from 'src/user/types/user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';
import { Request as IRequest } from '../utils/request';

@Controller('me')
export class MeController {
  constructor(
    private userService: UserService,
    private userMapper: UserMapper,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getMe(@Request() req: IRequest): Promise<UserDto> {
    const user = await this.userService.getById(req.user?.id);
    return this.userMapper.convert(user);
  }
}
