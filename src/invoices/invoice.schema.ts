import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from 'src/clients/schemas/client.schema';
import { Item } from 'src/items/schemas/item.schema';
import { InvoiceStatus } from './invoice-status.enum';

export type InvoiceDocument = Invoice & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.client = ret.clientId;
      delete ret.clientId;
      ret.items = ret.items.map((item) => {
        item.item = item.itemId;
        delete item.itemId;
        return item;
      });
      return ret;
    },
  },
})
export class Invoice {
  @Prop({ required: true, unique: true })
  invoiceNumber: string;

  @Prop({ required: true })
  invoiceDate: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', required: true })
  clientId: Client;

  @Prop([
    {
      itemId: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ])
  items: {
    itemId: Item;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Offer' }])
  offers: string[];

  @Prop({ required: true })
  subtotal: number;

  @Prop({ required: true })
  discounts: number;

  @Prop({ required: true })
  totalAmountDue: number;

  @Prop()
  notes: string;

  @Prop({ type: String, enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  status: InvoiceStatus;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
