import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <div>
      {course.map((props, index) => (
        <div key={index}>
          <Header title={props.name} />
          <Content parts={props.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
