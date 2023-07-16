import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { MeController } from './me.controller';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [MeController],
})
export class MeModule {}
