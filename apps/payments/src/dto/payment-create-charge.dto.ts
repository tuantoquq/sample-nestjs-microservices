import { CreateChargeDto } from '@app/common';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PaymentCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
