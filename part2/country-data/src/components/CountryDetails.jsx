const CountryDetails = ({ country, weather }) => {
  if (!country || !country.name) return null;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>{"Capital " + country.capital[0]}</div>
      <div>{"Area " + country.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        height={200}
        width={200}
      />
      <h2>Weather in {country.capital}</h2>
      {weather ? (
        <div>
          <p>{`Temperature: ${weather.main.temp} ºC`}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
            width={100}
          />
          <p>{`Wind: ${weather.wind.speed} m/s`}</p>
        </div>
      ) : (<p>Loading...</p>)
      }
    </div>
  );
};

export default CountryDetails;
