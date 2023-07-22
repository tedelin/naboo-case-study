import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ActivityService } from '../activity/activity.service';
import { UserService } from '../user/user.service';
import { activities as activitiesData } from './activity.data';
import { user as userData } from './user.data';

@Injectable()
export class SeedService {
  constructor(
    private userService: UserService,
    private activityService: ActivityService,
  ) {}

  async execute(): Promise<void> {
    const users = await this.userService.countDocuments();
    const activities = await this.activityService.countDocuments();

    if (users === 0 && activities === 0) {
      try {
        const hashedPassword = await bcrypt.hash(userData[0].password, 10);
        const user = await this.userService.createUser({
          ...userData,
          password: hashedPassword,
        });

        await Promise.all(
          activitiesData.map((activity) =>
            this.activityService.create(user._id, activity),
          ),
        );
        Logger.log('Seeding successful!');
      } catch (error) {
        Logger.error(error);
        throw error;
      }
    }
  }
}
