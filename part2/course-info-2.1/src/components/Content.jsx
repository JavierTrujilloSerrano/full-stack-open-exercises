import Part from "./Part";

const Content = ({ parts }) => {

  const total = parts.reduce((sum, element) => {
    return (sum += element.exercises);
  }, 0);

  return (
    <div>
      {parts.map((part, index) => {
        return <Part key={index} data={part} />;
      })}
      <h4>total of {total} exercises</h4>
    </div>
  );
};

export default Content;
