import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { Activity } from './activity.schema';
import { ActivityService } from './activity.service';

import { ContextWithJWTPayload } from 'src/auth/types/context';
import { User } from 'src/user/user.schema';
import { CreateActivityInput } from './activity.inputs.dto';

@Resolver(() => Activity)
export class ActivityResolver {
  constructor(
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
  ) {}

  @ResolveField(() => ID)
  id(@Parent() activity: Activity): string {
    return activity._id.toString();
  }

  @ResolveField(() => User)
  async owner(@Parent() activity: Activity): Promise<User> {
    await activity.populate('owner');
    return activity.owner;
  }

  @Query(() => [Activity])
  async getActivities(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Query(() => [Activity])
  async getLatestActivities(): Promise<Activity[]> {
    return this.activityService.findLatest();
  }

  @Query(() => [Activity])
  @UseGuards(AuthGuard)
  async getActivitiesByUser(
    @Context() context: ContextWithJWTPayload,
  ): Promise<Activity[]> {
    return this.activityService.findByUser(context.jwtPayload.id);
  }

  @Query(() => [String])
  async getCities(): Promise<string[]> {
    const cities = await this.activityService.findCities();
    return cities;
  }

  @Query(() => [Activity])
  async getActivitiesByCity(
    @Args('city') city: string,
    @Args({ name: 'activity', nullable: true }) activity?: string,
    @Args({ name: 'price', nullable: true, type: () => Int }) price?: number,
  ): Promise<Activity[]> {
    return this.activityService.findByCity(city, activity, price);
  }

  @Query(() => Activity)
  async getActivity(@Args('id') id: string): Promise<Activity> {
    return this.activityService.findOne(id);
  }

  @Mutation(() => Activity)
  @UseGuards(AuthGuard)
  async createActivity(
    @Context() context: ContextWithJWTPayload,
    @Args('createActivityInput') createActivity: CreateActivityInput,
  ): Promise<Activity> {
    return this.activityService.create(context.jwtPayload.id, createActivity);
  }

  @Mutation(() => [Activity])
  async addFavorite(
    @Args('userId') userId: string,
    @Args('activityId') activityId: string,
  ): Promise<Activity[]> {
    return this.userService.addFavorite(userId, activityId);
  }

  @Mutation(() => [Activity])
  @UseGuards(AuthGuard)
  async reorderFavorite(
    @Context() context: ContextWithJWTPayload,
    @Args('activityId') activityId: string,
    @Args('newIndex') newIndex: number,
  ): Promise<Activity[]> {
    return this.userService.reorderFavorite(
      context.jwtPayload.id,
      activityId,
      newIndex,
    );
  }

  @Query(() => [Activity])
  async getFavorites(@Args('userId') userId: string): Promise<Activity[]> {
    return this.userService.getFavorites(userId);
  }
}
