interface IRead<T> {
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
}

interface IWrite<T> {
  insert(item: T): Promise<T>;
  insertMany(item: T[]): Promise<T[]>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export abstract class Repository<T> implements IRead<T>, IWrite<T> {
  insert(item: T): Promise<T> {
    throw new Error("Error: create method not implemented.");
  }

  insertMany(item: T[]): Promise<T[]> {
    throw new Error("Error: createMany method not implemented.");
  }

  update(id: string, item: T): Promise<T> {
    throw new Error("Error: update method not implemented.");
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Error: delete method not implemented.");
  }

  find(item: T): Promise<T[]> {
    throw new Error("Error: find method not implemented.");
  }

  findOne(id: string): Promise<T> {
    throw new Error("Error: findOne method not implemented.");
  }
}