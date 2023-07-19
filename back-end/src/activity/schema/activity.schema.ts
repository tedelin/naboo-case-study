import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schema/user.schema';
import { City } from './city.schema';

@Schema({ timestamps: true })
export class Activity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: City;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner: User;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
