export type DBReadOperator = 'gte' | 'eq' | 'in';

export type DBWriteOperator = 'set';

interface DBQuery<T> {
  field: string;
  value: unknown;
}

export interface DBReadQuery<T> extends DBQuery<T> {
  operator: DBReadOperator;
}

export interface DBWriteQuery<T> extends DBQuery<T> {
  operator: DBWriteOperator;
}

/**
 * Base interface for Data Access Layer repositories. e.g: MongoDB, DynamoDB, etc.
 * 
 * All database repositories should implement this interface.
 */
export interface DALRepository<T> {
  insert(item: T): Promise<T>;
  insertMany(items: T[]): Promise<T[]>;
  update(id: string, item: T, upsert?: boolean): Promise<T | null>;
  updateOne(id: string, query: DBWriteQuery<T>[], upsert?: boolean): Promise<boolean>;
  /** 
   * Updates the specified items.
   * 
   * An array of `ids` can be provided to update those specific ids.
   * 
   * If the `upsert` option is set to `true`, the item will be inserted if it doesn't exist already.
   */
  updateMany(items: T[], ids?: string[], upsert?: boolean): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  /**
   * Finds the specified item. If no item is provided, all items are returned.
   */
  find(item?: T, query?: DBReadQuery<T>): Promise<T[]>;
  findOne(query: DBReadQuery<T>): Promise<T | null>;
  /**
   * Runs a manual query.
   */
  query<K>(callback: (model?: K) => Promise<T[]>): Promise<T[]>;
}