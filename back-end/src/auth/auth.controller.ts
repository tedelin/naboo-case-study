import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { UserMapper } from 'src/user/mapper/user.mapper';
import { UserDto } from 'src/user/types/user.dto';
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
    @Body(ValidationPipe) loginUserDto: SignInInput,
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
  async register(
    @Body(ValidationPipe) createUserDto: SignUpInput,
  ): Promise<UserDto> {
    const user = await this.authService.signUp(createUserDto);
    return this.userMapper.convert(user);
  }
}
