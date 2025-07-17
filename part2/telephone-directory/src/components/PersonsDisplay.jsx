import FilteredPersons from "./FilteredPersons";
import ListPersons from "./ListPersons";

const PersonsDisplay = ({ persons, filter, setPersons, setNotification }) => {
  return (
    <div>
      {filter ? (
        <FilteredPersons persons={persons} filter={filter} setPersons={setPersons} setNotification />
      ) : (
        <ListPersons persons={persons} setPersons={setPersons} setNotification={setNotification}/>
      )}
    </div>
  );
};

export default PersonsDisplay;