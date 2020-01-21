import { ContactsPersistence } from "../../Services/Persistence/Persistence";

type GetContactsFN = (
  options: GetContactsOptions
) => Promise<PersistedContact[]>;

interface GetContactsOptions {
  filter: FilterContact;
  sort: SortContact;
  start?: RecordId;
}

export const getContacts: GetContactsFN = async options =>
  ContactsPersistence.getAll({
    ...options,
    fields: ["name", "id"],
    limit: { start: options.start, count: 25 }
  });
