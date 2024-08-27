import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceStatus } from '../invoice-status.enum';
import { InvoiceItemDto } from './invoice-item.dto';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  invoiceDate: Date;

  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  @IsNotEmpty()
  items: InvoiceItemDto[];

  @IsArray()
  @IsString({ each: true })
  offers: string[];

  @IsNumber()
  @IsNotEmpty()
  subtotal: number;

  @IsNumber()
  @IsNotEmpty()
  discounts: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmountDue: number;

  @IsString()
  @IsNotEmpty()
  paymentTerms: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(InvoiceStatus)
  @IsOptional()
  status?: InvoiceStatus = InvoiceStatus.PENDING;
}
