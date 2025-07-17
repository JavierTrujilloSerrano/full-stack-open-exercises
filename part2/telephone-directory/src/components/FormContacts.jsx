import personServices from "../services/personServices";

const FormContacts = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  persons,
  setPersons,
  setNotification,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newNumber };
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirm = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with the new one?`
      );
      if (confirm) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personServices
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            ),
              setNotification(`update: Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
          console.error("Error update person:", newPerson.name, error);
          setNotification(`error: update person ${newPerson.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
      }
    } else {
      personServices
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson)),
            setNotification(`success: Added ${returnedPerson.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setNewName(""), setNewNumber("");
        })
        .catch((error) => {
          console.error("Error create person:", newPerson.name, error);
          setNotification(`error: create person ${newPerson.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };
  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <div>
      <h3>add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default FormContacts;
