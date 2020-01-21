import faker from "faker";
import * as R from "ramda";

import { ContactsPersistence } from "./Persistence/Persistence";

const VCARD_COUNT = 500;

const randomNumber = (max: number) => Math.floor(Math.random() * max) + 1;

const randomItem = (items: any[]) =>
  items[Math.floor(Math.random() * items.length)];
const homeWorkMobile = ["Work", "Mobile", "Home"];
const contactType = ["Company", "Individual"];

const generateRandomRecords = (max: number, fn: () => any) =>
  R.map(fn, Array(randomNumber(max)));

export const seedData = async (): Promise<void> => {
  if (process.env.NODE_ENV === "production") return;

  R.forEach(() => {
    const type: ContactType = randomItem(contactType);

    return ContactsPersistence.append({
      type,
      name:
        type === "Company"
          ? faker.company.companyName()
          : faker.name.findName(),
      telephone: generateRandomRecords(4, () => ({
        type: randomItem(homeWorkMobile),
        number: faker.phone.phoneNumber()
      })),
      address: generateRandomRecords(2, () => ({
        type: randomItem(homeWorkMobile),
        street: faker.address.streetAddress(true),
        city: faker.address.city(),
        county: faker.address.county(),
        postcode: faker.address.zipCode(),
        country: faker.address.country()
      })),
      birthday: faker.date.past(),
      comments: generateRandomRecords(100, () => ({
        created: faker.date.past(),
        updated: faker.date.past(),
        author: faker.name.findName(),
        content: faker.lorem.sentences(randomNumber(10))
      }))
    });
  }, Array(VCARD_COUNT));
};
