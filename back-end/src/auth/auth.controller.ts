import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserMapper } from '../user/mapper/user.mapper';
import { UserDto } from '../user/types/user.dto';
import { AuthService } from './auth.service';
import { SignInDto, SignInInput, SignUpInput } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userMapper: UserMapper,
  ) {}

  @Post('signin')
  async login(
    @Body() loginUserDto: SignInInput,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignInDto> {
    const data = await this.authService.signIn(loginUserDto);

    response.cookie('jwt', data.access_token, {
      httpOnly: true,
      domain: process.env.FRONTEND_DOMAIN,
    });

    return data;
  }

  @Post('signup')
  async register(@Body() createUserDto: SignUpInput): Promise<UserDto> {
    const user = await this.authService.signUp(createUserDto);
    return this.userMapper.convert(user);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie('jwt', {
      httpOnly: true,
      domain: process.env.FRONTEND_DOMAIN,
    });
  }
}
