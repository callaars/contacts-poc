import React, { useEffect, useState } from "react";

import Contact from "../Contact/Contact";
import { getContacts } from "./functions";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<PersistedContact[]>([]);
  const [sort, setSort] = useState<SortContact>({ name: "Asc" });
  const [filter, setFilter] = useState<FilterContact>({});

  useEffect(() => {
    getContacts({ filter, sort }).then(setContacts);
  }, [filter, sort]);

  // const toggleSortName = () =>
  //   setSort({ ...sort, name: sort.name === "Asc" ? "Desc" : "Asc" });
  //
  // const onChangeNamefilter =
  //   (e: any) => setFilter({ ...filter, name: e.target.value });

  console.log("Components:Contacts rerendering");
  return (
    <>
      {/*<Card>*/}
      {/*  <Card.Body>*/}
      {/*    <Button onClick={toggleSortName}>Name {sort.name}</Button>*/}

      {/*    <Form.Group>*/}
      {/*      <Form.Label>Filter on name</Form.Label>*/}
      {/*      <Form.Control type="text" onChange={onChangeNamefilter} />*/}
      {/*    </Form.Group>*/}
      {/*  </Card.Body>*/}
      {/*</Card>*/}

      {contacts.map(x => (
        <Contact key={x.id} contact={x} />
      ))}
    </>
  );
};

export default Contacts;
