import * as R from "ramda";

import { DataTypes } from "./Persistence";

interface CacheType {
  [propName: string]: PersistedRowType[];
}

const cache: CacheType = {};

const eitherEmptyOrNil = R.either(R.isNil, R.isEmpty);

// The added R.identity call is done so that TS doesn't throw errors about argument count
const hasContent = R.compose(R.not, eitherEmptyOrNil, R.identity);

const sortDefinitions = (x: any) =>
  R.map(x => {
    const [field, modifier] = x;

    if (modifier === 'Asc') {
      return R.ascend(R.prop(field));
    }

    return R.descend(R.prop(field));
  }, R.toPairs(x));

// Get new id by returning 1 if the array is empty, or the last id plus 1
const getNewId = R.compose(
  R.ifElse(R.isNil, R.always(1), R.compose(R.add(1), R.prop("id"))),
  R.last
);

const findIndexById = (list: any[], id: number) =>
  R.findIndex(R.propEq("id", id))(list);

// Get all records from a cache property
export async function getAll<T extends PersistedRowType>(
  property: DataTypes,
  options: QueryOptionsContact
): Promise<T[]> {
  if (!cache[property]) return [];

  let result: T[];

  console.log('Persistence:InMemory:getAll options', options)

  // Filter any properties
  if (R.isEmpty(options.filter)) {
    result = R.clone(cache[property] ? (cache[property] as T[]) : []);
  } else {
    // Use `any` here in the filter, as TS can't possibly infer T as being part of the query
    // object we want it to be. We know it's T, but TS can't verify this.
    result = R.filter((value: any) => {
      const x = R.find(
        key =>
          value.hasOwnProperty(key) &&
          R.test(new RegExp(options.filter[key] as string, "i"), value[key]),
        R.keys(options.filter)
      );

      return !!x;
    }, cache[property] as T[]) as T[];
  }

  // Sort on the properties required
  if (hasContent(options.sort)) {
    const sortings = sortDefinitions(options.sort) as any;

    result = R.sortWith(sortings, result);
  }

  // Show only the requested fields
  if (hasContent(options.fields)) {
    result = R.map(R.pickAll(options.fields), result) as T[];
  }

  // Limit the content
  if (hasContent(options.limit)) {
    let fromIndex = 0;

    if (options.limit.start) {
      fromIndex = R.findIndex(x => x.id === options.limit.start, result);
    }

    result = R.slice(fromIndex, options.limit.count + fromIndex, result);
  }

  return result;
}

// Append a row to the cache property, returns the id
export async function append<
  T extends PersistedRowType,
  U extends UnpersistedRowType
>(property: DataTypes, value: U): Promise<number> {
  if (value.id) throw Error("record is not transient");

  console.log(`Persistence:InMemory:append ${property}`, value)

  if (!cache[property]) cache[property] = [];

  const record: PersistedRowType = { ...value, id: getNewId(cache[property]) };

  cache[property].push(record);

  return record.id;
}

// Remove a specific record by id
export async function remove(
  property: DataTypes,
  id: RecordId
): Promise<boolean> {
  if (!cache[property]) return false;

  const index = findIndexById(cache[property], id);

  if (index === -1) return false;

  cache[property].splice(index, 1);

  return true;
}

// Get a record by id
export async function getById<T extends PersistedRowType>(
  property: DataTypes,
  id: RecordId
): Promise<T | undefined> {
  const record = R.find(R.propEq("id", id), cache[property] || []);

  if (!record) return undefined;

  return R.clone(record) as T;
}

// Edits a record by id
export async function edit(
  property: DataTypes,
  id: RecordId,
  newRecord: PersistedRowType
): Promise<boolean> {
  if (!cache[property]) return false;

  const index = findIndexById(cache[property], id);

  if (index === -1) return false;

  cache[property][index] = R.clone(newRecord);

  return true;
}
