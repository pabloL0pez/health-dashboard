interface IRead<T> {
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}

interface IWrite<T> {
  insert(item: T): Promise<T>;
  insertMany(items: T[]): Promise<T[]>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

/**
 * Base class for Data Access Layer repositories. e.g: MongoDB, DynamoDB, etc.
 * 
 * All database repositories should extend this class and implement the methods.
 */
export abstract class DALRepository<T> implements IRead<T>, IWrite<T> {
  insert(item: T): Promise<T> {
    throw new Error("Error: create method not implemented.");
  }

  insertMany(items: T[]): Promise<T[]> {
    throw new Error("Error: createMany method not implemented.");
  }

  update(id: string, item: T): Promise<T | null> {
    throw new Error("Error: update method not implemented.");
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Error: delete method not implemented.");
  }

  find(item: T): Promise<T[]> {
    throw new Error("Error: find method not implemented.");
  }

  findOne(id: string): Promise<T | null> {
    throw new Error("Error: findOne method not implemented.");
  }

  findAll(): Promise<T[]> {
    throw new Error("Error: findAll method not implemented.");
  }
}