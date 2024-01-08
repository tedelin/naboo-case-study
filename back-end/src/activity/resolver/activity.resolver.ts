import { Query, Resolver } from '@nestjs/graphql';
import { ActivityDto } from '../types';
import { ActivityService } from '../activity.service';
import { ActivityMapper } from '../mapper/activity.mapper';

@Resolver()
export class ActivityResolver {
  constructor(
    private activityService: ActivityService,
    private activityMapper: ActivityMapper,
  ) {}

  @Query(() => [ActivityDto])
  async getActivities(): Promise<ActivityDto[]> {
    const activities = await this.activityService.findAll();
    return activities.map((activity) => this.activityMapper.convert(activity));
  }
}
