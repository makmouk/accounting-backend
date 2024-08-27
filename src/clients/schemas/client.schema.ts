import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop({ required: true })
  name: string;
  @Prop()
  email: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  city: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
