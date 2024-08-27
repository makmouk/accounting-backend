import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
  @Prop({ required: true })
  name: string;

  @Prop([
    {
      itemId: { type: MongooseSchema.Types.ObjectId, ref: 'Item' },
      quantity: Number,
    },
  ])
  items: {
    itemId: string;
    quantity: number;
  }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop()
  description: string;

  @Prop()
  validFrom: Date;

  @Prop()
  validUntil: Date;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
