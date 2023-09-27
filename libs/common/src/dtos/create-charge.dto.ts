import { IsNumber } from 'class-validator';

export class CreateChargeDto {
  @IsNumber()
  amount: number;
}
