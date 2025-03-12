export const Singleton = <T = unknown>() => {
  return class Singleton {
    static _instance: T;

    protected constructor() {}

    public static get instance() {
      if (!this._instance) {
        this._instance = new this() as T;      
      }
  
      return this._instance;
    }
  }
}