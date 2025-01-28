import { Model, UpdateQuery } from 'mongoose';
import { DALRepository } from "../repository";

export class MongoDALRepository<T extends UpdateQuery<T>> extends DALRepository<T>{
  constructor(private readonly model: Model<T>) {
    super();
  }

  async insert(item: T): Promise<T> {
    return this.model.create(item);
  }

  async insertMany(items: T[]): Promise<T[]> {
    return this.model.insertMany(items);
  }

  async update(id: string, item: T): Promise<T | null> {
    return this.model.findByIdAndUpdate({ _id: id }, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    return this.model.findByIdAndDelete(id).then(() => true);
  }

  async find(item: T): Promise<T[]> {
    return this.model.find(item);
  }

  async findOne(id: string): Promise<T | null> {
    return this.model.findById(id);
  }
}