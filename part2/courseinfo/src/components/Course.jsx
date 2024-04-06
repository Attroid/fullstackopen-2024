const Header = (props) => <h2>{props.course.name}</h2>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = (props) => (
  <div>
    {props.course.parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </div>
);

const Total = (props) => {
  const nofExercises = props.course.parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return (
    <p>
      <b>total of {nofExercises} exercises</b>
    </p>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  );
};

export default Course;
