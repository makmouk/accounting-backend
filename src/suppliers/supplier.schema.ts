import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier {
  @Prop({ required: true })
  name: string;

  @Prop()
  contactEmail: string;

  @Prop()
  contactPhone: string;

  @Prop()
  address: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
