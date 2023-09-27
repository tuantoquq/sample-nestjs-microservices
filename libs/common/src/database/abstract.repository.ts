import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
      this.logger.warn(
        `Document not found with filter query: ${filterQuery} collection`,
      );
      throw new NotFoundException('Document not found');
    }
    return document as unknown as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {
        new: true,
        lean: true,
      },
    );
    if (!document) {
      this.logger.warn(
        `Document not found with filter query: ${filterQuery} collection`,
      );
      throw new NotFoundException('Document not found');
    }
    return document as unknown as TDocument;
  }

  async findAll(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(
      filterQuery,
      {},
      { lean: true },
    ) as unknown as TDocument[];
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<void> {
    await this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
