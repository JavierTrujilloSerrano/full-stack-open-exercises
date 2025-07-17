import { useState, useEffect } from "react";
import FormContacts from "./components/FormContacts";
import SearchFilter from "./components/SearchFilter";
import PersonsDisplay from "./components/PersonsDisplay";
import personServices from "./services/personServices.js";
import Notifications from "./components/Notifications";
import "./index.css";

const App = () => {
  useEffect(() => {
    personServices.getAll().then((response) => {
      const stringfy = response.map((person) => ({
        ...person,
        id: String(person.id),
      }));
      setPersons(stringfy);
    });
  }, []);

  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState("");

  return (
    <div>
      <SearchFilter filter={filter} setFilter={setFilter} />

      <Notifications message={notification} />

      <FormContacts
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />

      <PersonsDisplay
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
