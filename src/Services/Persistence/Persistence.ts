import { append, edit, getAll, getById, remove } from "./InMemory";

export enum DataTypes {
  Contacts = "contacts"
}

export const ContactsPersistence: PersistenceModule<
  PersistedContact,
  UnpersistedContact,
  QueryOptionsContact
> = {
  getAll: async options => getAll(DataTypes.Contacts, options),
  append: async (contact: UnpersistedContact) =>
    append<PersistedContact, UnpersistedContact>(DataTypes.Contacts, contact),
  remove: async id => remove(DataTypes.Contacts, id),
  getById: async id => getById(DataTypes.Contacts, id),
  edit: async (id, editRecord) => edit(DataTypes.Contacts, id, editRecord)
};
