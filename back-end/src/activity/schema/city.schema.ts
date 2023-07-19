import { Prop } from '@nestjs/mongoose';

export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  postalCode: string;
}
