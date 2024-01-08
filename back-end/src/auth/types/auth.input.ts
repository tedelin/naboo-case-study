import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInInput {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class SignUpInput extends SignInInput {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;
}
