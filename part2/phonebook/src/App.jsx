import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (name, number) => {
    if (persons.find((person) => person.name === name)) {
      return alert(`${name} is already added to phonebook`);
    }

    const person = {
      name,
      number,
    };

    axios.post("http://localhost:3001/persons", person).then((response) => {
      setPersons(persons.concat(response.data));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(ev) => setFilter(ev.target.value)} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
