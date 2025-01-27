import { Repository } from "../repository";

export class MongoRespository<T> extends Repository<T>{
  constructor(private readonly model: mongoose.Model<T>) {
    super();
  }

  insert(item: T): Promise<T> {
    return this.model.insert(item);
  }

  insertMany(item: T[]): Promise<T[]> {
    return this.model.insertMany(item);
  }

  update(id: string, item: T): Promise<T> {
    return this.model.findByIdAndUpdate(id, item, { new: true });
  }

  delete(id: string): Promise<boolean> {
    return this.model.findByIdAndDelete(id).then(() => true);
  }

  find(item: T): Promise<T[]> {
    return this.model.find(item);
  }

  findOne(id: string): Promise<T> {
    return this.model.findById(id);
  }
}