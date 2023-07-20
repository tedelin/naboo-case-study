import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityMapper } from './mapper/activity.mapper';
import { Activity, ActivitySchema } from './schema/activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
    AuthModule,
  ],
  exports: [ActivityService, ActivityMapper],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityMapper],
})
export class ActivityModule {}
