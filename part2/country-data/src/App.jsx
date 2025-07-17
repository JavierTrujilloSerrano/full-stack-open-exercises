import { useState, useEffect } from "react";
import countriesServices from "./services/countriesServices";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countriesServices
      .getAll()
      .then((response) => {
        const countryNames = response.map((country) => country.name.common);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error.message);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (filteredCountries.length !== 1) {
      setCountryData(null);
      return;
    }

    countriesServices
      .getOne(filteredCountries[0])
      .then((response) => {
        setCountryData(response);

        const capital = response.capital[0];

        countriesServices
          .getWeather(capital)
          .then((weatherResponse) => {
            setWeatherData(weatherResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching weather:", error.message);
          });
      })
      .catch((error) => {
        console.error("Error fetching country:", error.message);
      });
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      Find countries{" "}
      <input type="text" value={filter} onChange={handleFilterChange} />
      {filter === "" ? (
        <div>Enter a country</div>
      ) : filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filteredCountries.length === 1 ? null : (
        filteredCountries.map((country) => (
          <p key={country}>
            {country} <button onClick={() => setFilter(country)}>show</button>
          </p>
        ))
      )}
      <CountryDetails country={countryData} weather={weatherData} />
    </>
  );
}

export default App;
