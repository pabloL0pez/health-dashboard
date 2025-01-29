import { Model } from 'mongoose';
import { DALRepository } from "../types";

export interface MongoDocument {
  id: string;
  _id?: string;
  __v?: string;
}

export class MongoDALRepository<T extends MongoDocument> implements DALRepository<T>{
  constructor(private readonly model: Model<T>) {}

  async insert(item: T): Promise<T> {
    return await this.model.create(item);
  }

  async insertMany(items: T[]): Promise<T[]> {
    return await this.model.insertMany(items);
  }

  async update(id: string, item: T, upsert?: boolean): Promise<T | null> {
    return await this.model.findByIdAndUpdate({ _id: id }, item, { new: true, upsert });
  }

  async updateMany(items: T[], _ids?: string[], upsert?: boolean): Promise<number> {
    const writes = items.map(item => ({
        updateOne: {
          filter: { id: item.id },
          update: {...item},
          upsert
        }
      })
    );

    const result = await this.model.bulkWrite(writes);

    return result.upsertedCount;
  }

  async delete(id: string): Promise<boolean> {
    return this.model.findByIdAndDelete(id).then(() => true);
  }

  async find(item?: T): Promise<T[]> {
    return (await this.model.find(item ?? {})).map(doc => doc.toObject());
  }

  async findOne(id: string): Promise<T | null> {
    return (await this.model.findById(id))?.toObject() ?? null;
  }
}