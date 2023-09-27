import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ClientProxy } from '@nestjs/microservices';
import { MP_CREATE_CHARGE, PAYMENTS_SERVICE, UserDto } from '@app/common';
import { map } from 'rxjs';
@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    { email, _id }: UserDto,
  ) {
    return this.paymentsService
      .send(MP_CREATE_CHARGE, { ...createReservationDto.charge, email })
      .pipe(
        map(async (response) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: response.id,
            timestamp: new Date(),
            userId: _id,
          });
        }),
      );
  }

  async findAll() {
    return this.reservationsRepository.findAll({});
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
