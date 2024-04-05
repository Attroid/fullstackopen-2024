const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) =>
  props.courseParts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));

const Total = (props) => {
  const nofExercises = props.courseParts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return <p>Number of exercises {nofExercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const courseParts = [
    { id: 1, name: part1, exercises: exercises1 },
    { id: 2, name: part2, exercises: exercises2 },
    { id: 3, name: part3, exercises: exercises3 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
