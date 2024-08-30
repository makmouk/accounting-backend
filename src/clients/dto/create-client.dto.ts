import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  city: string;
}
