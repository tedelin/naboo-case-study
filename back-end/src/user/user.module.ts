import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMapper } from './mapper/user.mapper';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService, UserMapper],
  providers: [UserService, UserMapper],
})
export class UserModule {}
