import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';
import { MP_CREATE_CHARGE } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern(MP_CREATE_CHARGE)
  async createCharge(@Payload() data: PaymentCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
