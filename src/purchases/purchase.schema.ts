import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PurchaseDocument = Purchase & Document;

@Schema()
export class Purchase {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplierId: string;

  @Prop([
    {
      itemId: { type: MongooseSchema.Types.ObjectId, ref: 'Item' },
      quantity: Number,
      price: Number,
    },
  ])
  items: {
    itemId: string;
    quantity: number;
    price: number;
  }[];

  @Prop()
  totalAmount: number;

  @Prop()
  purchaseDate: Date;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
