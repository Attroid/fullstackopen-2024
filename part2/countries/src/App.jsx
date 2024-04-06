import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  if (countries === null) {
    return "Loading...";
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter value={filter} onChange={(ev) => setFilter(ev.target.value)} />
      {filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <CountryList countries={filteredCountries} />
      )}
    </div>
  );
};

export default App;
