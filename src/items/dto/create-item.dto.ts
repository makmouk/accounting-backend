import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  itemNo: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  fobPrice: number;
  @IsNotEmpty()
  retailPrice: number;
  @IsOptional()
  description: string;
  @IsOptional()
  colors: string[];
}
