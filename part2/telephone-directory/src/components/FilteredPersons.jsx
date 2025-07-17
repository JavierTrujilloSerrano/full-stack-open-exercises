import personServices from "../services/personServices.js";

const FilteredPersons = ({ persons, filter, setPersons }) => {
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const handleDelete = (id, name) => {
    console.log("typeof id:", typeof id, "value:", id);
    const confirm = window.alert(`Delete ${name}?`);
    if (confirm) {
      personServices.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };
  return (
    <div>
      <h3>Numbers</h3>
      {filtered.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilteredPersons;
