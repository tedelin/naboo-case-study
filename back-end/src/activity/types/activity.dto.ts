import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/user/types/user.dto';

@ObjectType()
export class ActivityDto {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  city!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  price!: number;

  owner!: Pick<UserDto, 'firstName' | 'lastName'>;
}
