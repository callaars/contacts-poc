type RecordId = number;

interface PersistedRowType {
  id: RecordId;
}

interface UnpersistedRowType {
  [propName: string]: any;
}

interface LimitOptions {
  start?: RecordId;
  count: number;
}

interface QueryOptions {
  filter: any;
  fields: readonly string[];
  sort: any;
  limit: LimitOptions;
}

interface PersistenceModule<T, U, V> {
  getAll: (options: V) => Promise<T[]>;
  append: (newRecord: U) => Promise<number>;
  remove: (id: RecordId) => Promise<boolean>;
  getById: (id: RecordId) => Promise<T | undefined>;
  edit: (id: RecordId, editRecord: T) => Promise<boolean>;
}
