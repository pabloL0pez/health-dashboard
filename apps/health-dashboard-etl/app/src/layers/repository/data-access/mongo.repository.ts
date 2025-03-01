import { Model } from 'mongoose';
import { DALRepository, DBReadOperator, DBReadQuery, DBWriteOperator, DBWriteQuery } from "../types";

const readOperatorMap: Record<DBReadOperator, string> = {
  'gte': '$gte',
  'eq': '$eq',
  'in': '$in',
}

const writeOperatorMap: Record<DBWriteOperator, string> = {
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

  async update(id: string, item: T, upsert: boolean = false): Promise<T | null> {
    return await this.model.findByIdAndUpdate({ _id: id }, item, { new: true, upsert });
  }

  async updateOne(id: string, queries: DBWriteQuery<T>[], upsert: boolean = false): Promise<boolean> {
    const parsedQueries = this.parseWriteQueries(queries);

    return Boolean((await this.model.updateOne({ id }, parsedQueries, { upsert }))?.modifiedCount);
  }

  async updateMany(items: T[], _ids?: string[], upsert: boolean = false): Promise<boolean> {
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

  async find(item?: T, query?: DBReadQuery<T>): Promise<T[]> {
    const parsedQuery = this.parseReadQuery(query);

    return (await this.model.find(item ?? parsedQuery)).map(doc => doc.toObject());
  }

  async findOne(query: DBReadQuery<T>): Promise<T | null> {
    const parsedQuery = this.parseReadQuery(query);

    return (await this.model.findOne(parsedQuery))?.toObject() ?? null;
  }

  private parseReadQuery<T>(query?: DBReadQuery<T>): Record<keyof T, unknown> | {} {
    if (!query) {
      return {}
    }

    return {[query.field]: { [readOperatorMap[query.operator]]: query.value }};
  }

  private parseWriteQueries<T>(queries?: DBWriteQuery<T>[]): (Record<keyof T, unknown> | {})[] {
    if (!queries) {
      return [{}];
    }

    return queries.map(query => ({[writeOperatorMap[query.operator]]: { [query.field]: query.value }}));
  }
}