import personServices from "../services/personServices.js";

const ListPersons = ({ persons, setPersons, setNotification }) => {
  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);
    console.log("typeof id:", typeof id, "value:", id);
    if (confirm) {
      personServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification(`error: deleted person ${name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          console.error(`Error delete person: ${name}`);
          console.error(`Information of Edsger ${name} has already been removed from server`);
        });
    }
  };

  return (
    <div>
      <h3>Numbers</h3>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListPersons;
