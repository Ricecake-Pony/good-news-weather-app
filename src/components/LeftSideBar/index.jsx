import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { WeatherContext } from "../../context/WeatherContext";
import { fetchCityWeather } from "../../utils/fetchCityWeather";
import CityTile from "../CityTile";
import CurrentLocationTile from "../CurrentLocationTile";
import SearchBar from "../SearchBar";

export default function LeftSideBar({ loadingBarRef }) {
  const { setActiveCity, geoWeatherData } = useContext(WeatherContext);
  const { user, setUser } = useContext(UserContext);
  const [searchError, setSearchError] = useState(null);
  const navigate = useNavigate();

  async function handleSearch(cityName) {
    try {
      const cityExists = user.recentCities.some(
        (city) => city.location.name.toLowerCase() === cityName.toLowerCase()
      );
      if (cityExists) {
        const matchedCity = user.recentCities.find(
          (city) => city.location.name.toLowerCase() === cityName.toLowerCase()
        );
        setActiveCity(matchedCity);
        navigate(`/city/${cityName.toLowerCase()}`);
        return;
      }
      loadingBarRef.current?.continuousStart();
      const data = await fetchCityWeather({ cityName });

      const updated = [...user.recentCities];
      const index = updated.findIndex(
        (c) =>
          c.location.name.toLowerCase() === data.location.name.toLowerCase()
      );
      if (index > -1) updated.splice(index, 1);
      updated.push(data);
      if (updated.length > 5) updated.shift();

      setUser({ ...user, recentCities: updated });

      setActiveCity(data);
      navigate(`/city/${cityName.toLowerCase()}`);
    } catch (err) {
      setSearchError(`❌ City not found. Please try again. Error: ${err}`);
      setTimeout(() => setSearchError(null), 4000);
    } finally {
      loadingBarRef.current?.complete();
    }
  }

  function handleDeleteCity(cityName) {
    if (!cityName) return;

    const filtered = user.recentCities.filter(
      (c) => c.location.name.toLowerCase() !== cityName.toLowerCase()
    );

    setUser({ ...user, recentCities: filtered });
  }

  return (
    <div
      className="w-1/4 min-w-[280px] max-w-[350px] min-h-screen 
		bg-white/10 backdrop-blur-md 
		border-r border-white/20 shadow-inner 
		p-4 flex flex-col gap-4 overflow-y-auto"
    >
      <CurrentLocationTile
        onClick={() => {
          if (geoWeatherData) {
            setActiveCity(geoWeatherData);
            navigate("/");
          }
        }}
      />
      <SearchBar onSearch={handleSearch} />
      <ul className="flex flex-col gap-2 text-sm">
        {user.recentCities.map((city, i) => (
          <li key={i}>
            <NavLink
              to={`/city/${city.location.name.toLowerCase()}`}
              className="block hover:bg-white/10 px-2 py-1 rounded-md transition"
            >
              <CityTile
                cityData={city}
                onDelete={handleDeleteCity}
                onClick={() => setActiveCity(city)}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
