import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({ required: true })
  itemNo: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: string;
  @Prop({ required: true })
  fobPrice: string;
  @Prop({ required: true })
  retailPrice: string;
  @Prop()
  description: string;
  @Prop()
  colors: string[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
