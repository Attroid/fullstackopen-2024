import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const updateUser = (name, number) => {
    const person = persons.find((person) => person.name === name);

    if (
      !window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      return;
    }

    personService.update({ ...person, number }).then((updatedPerson) => {
      setPersons(
        persons.map((person) =>
          person.id === updatedPerson.id ? updatedPerson : person
        )
      );
    });
  };

  const addPerson = (name, number) => {
    if (persons.find((person) => person.name === name)) {
      return updateUser(name, number);
    }

    const person = {
      name,
      number,
    };

    personService.create(person).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
    });
  };

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    personService.del(person.id).then((deletedPerson) => {
      setPersons(persons.filter((person) => person.id !== deletedPerson.id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(ev) => setFilter(ev.target.value)} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} onDelete={deletePerson} />
    </div>
  );
};

export default App;
