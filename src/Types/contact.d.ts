type HomeWorkMobile = "Mobile" | "Work" | "Home";

interface Telephone {
  type: HomeWorkMobile;
  number: string;
}

interface Email {
  type: HomeWorkMobile;
  email: string;
}

interface Address {
  type: HomeWorkMobile;
  street: string;
  city: string;
  county: string;
  postcode: string;
  country: string
}

interface Comment {
  created: Date;
  updated: Date;
  author: string;
  content: string;
}

type ContactType = "Company" | "Individual"

interface BaseContact {
  type: ContactType;
  name: string;
  telephone?: Telephone[];
  email?: Email[];
  address?: Address[];
  birthday: Date;
  comments: Comment[];
}

interface PersistedContact extends PersistedRowType, BaseContact {}
interface UnpersistedContact extends UnpersistedRowType, BaseContact {}

interface FilterContact {
  name?: string;
}

type SortOrder = "Asc" | "Desc";

interface SortContact {
  name?: SortOrder;
}

interface QueryOptionsContact extends QueryOptions {
  filter: FilterContact;
  sort: SortContact;
}
