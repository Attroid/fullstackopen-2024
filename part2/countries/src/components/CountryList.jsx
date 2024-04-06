const CountryList = (props) => {
  if (props.countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {props.countries.map((country) => (
        <div>
          {country.name.common}
          <button onClick={() => props.onShow(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
