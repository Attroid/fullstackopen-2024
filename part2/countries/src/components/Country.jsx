const Country = (props) => {
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <div>capital {props.country.capital.join(", ")}</div>
      <div>area {props.country.area}</div>

      <h4>languages:</h4>

      <ul>
        {Object.entries(props.country.languages).map(([langKey, language]) => (
          <li key={langKey}>{language}</li>
        ))}
      </ul>

      <img src={props.country.flags.png} alt={props.country.flags.alt} />
    </div>
  );
};

export default Country;
