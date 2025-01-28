/**
 * Base interface for Data Access Layer repositories. e.g: MongoDB, DynamoDB, etc.
 * 
 * All database repositories should implement this interface.
 */
export interface DALRepository<T> {
  insert(item: T): Promise<T>;
  insertMany(items: T[]): Promise<T[]>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}