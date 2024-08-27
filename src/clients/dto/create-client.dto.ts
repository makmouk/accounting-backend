import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  city: string;
}
