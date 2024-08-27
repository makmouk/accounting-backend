import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InvoiceItemDto {
  @IsMongoId()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
