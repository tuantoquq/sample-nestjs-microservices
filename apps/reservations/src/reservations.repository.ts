import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationsDocument } from './models/reservations.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationsDocument> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(ReservationsDocument.name)
    reservationsModel: Model<ReservationsDocument>,
  ) {
    super(reservationsModel);
  }
}
