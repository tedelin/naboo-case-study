import { UserDto } from 'src/user/types/user.dto';

export interface ActivityDto {
  id: string;
  name: string;
  city: string;
  description: string;
  price: number;
  owner: Pick<UserDto, 'firstName' | 'lastName'>;
}
