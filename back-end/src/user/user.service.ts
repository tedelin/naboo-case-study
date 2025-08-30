import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { Activity } from 'src/activity/activity.schema';
import { SignUpInput } from 'src/auth/types';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(
    data: SignUpInput & {
      role?: User['role'];
    },
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new this.userModel({ ...data, password: hashedPassword });
    return user.save();
  }

  async updateToken(id: string, token: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.token = token;
    return user.save();
  }

  async countDocuments(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }

  async setDebugMode({
    userId,
    enabled,
  }: {
    userId: string;
    enabled: boolean;
  }): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        debugModeEnabled: enabled,
      },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async addFavorite(userId: string, activityId: string): Promise<Activity[]> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const activityObjId = new Types.ObjectId(activityId);

    if (!user.favorites.some((fav) => fav.equals(activityObjId))) {
      user.favorites.push(activityObjId);
      await user.save();
    }

    await user.populate('favorites');
    const populatedUser = await user.populate<{ favorites: Activity[] }>(
      'favorites',
    );
    return populatedUser.favorites;
  }

  async reorderFavorite(
    userId: string,
    activityId: string,
    newIndex: number,
  ): Promise<Activity[]> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const idx = user.favorites.findIndex((fav) => fav.equals(activityId));
    if (idx === -1) throw new NotFoundException('Activity not in favorites');

    const [removed] = user.favorites.splice(idx, 1);
    user.favorites.splice(newIndex, 0, removed);

    await user.save();
    await user.populate('favorites');
    const populatedUser = await user.populate<{ favorites: Activity[] }>(
      'favorites',
    );
    return populatedUser.favorites;
  }

  async getFavorites(userId: string): Promise<Activity[]> {
    const user = await this.userModel.findById(userId).populate('favorites');
    if (!user) throw new NotFoundException('User not found');

    const populatedUser = await user.populate<{ favorites: Activity[] }>(
      'favorites',
    );
    return populatedUser.favorites;
  }
}
