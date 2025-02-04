import { Model } from 'mongoose';
import { DALRepository, DBOperator, DBQuery } from "../types";

const operatorMap: Record<DBOperator, string> = {
  'gte': '$gte',
  'eq': '$eq',
  'set': '$set',
}

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

  async updateOne(id: string, query: DBQuery<T>): Promise<boolean> {
    const parsedQuery = this.parseQuery(query);

    return Boolean((await this.model.updateOne({ id }, parsedQuery))?.modifiedCount);
  }

  async updateMany(items: T[], _ids?: string[], upsert?: boolean): Promise<boolean> {
    const writes = items.map(item => ({
        updateOne: {
          filter: { id: item.id },
          update: {...item},
          upsert
        }
      })
    );

    const result = await this.model.bulkWrite(writes);
    
    return result.isOk();
  }

  async delete(id: string): Promise<boolean> {
    return this.model.findByIdAndDelete(id).then(() => true);
  }

  async find(item?: T, query?: DBQuery<T>): Promise<T[]> {
    const parsedQuery = this.parseQuery(query);

    return (await this.model.find(item ?? parsedQuery)).map(doc => doc.toObject());
  }

  async findOne(query: DBQuery<T>): Promise<T | null> {
    const parsedQuery = this.parseQuery(query);

    return (await this.model.findOne(parsedQuery))?.toObject() ?? null;
  }

  private parseQuery<T>(query?: DBQuery<T>): Record<keyof T, unknown> | {} {
    if (!query) {
      return {}
    }

    return {[query.field]: { [operatorMap[query.operator]]: query.value }};
  }
}