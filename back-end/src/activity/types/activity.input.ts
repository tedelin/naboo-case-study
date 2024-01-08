import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateActivityInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price!: number;
}
