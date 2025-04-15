import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import {
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiThermometer,
  WiWindy,
} from "react-icons/wi";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { WeatherContext } from "../../context/WeatherContext";
import { fetchCityWeather } from "../../utils/fetchCityWeather";
import CityTile from "../CityTile";
import CurrentLocationTile from "../CurrentLocationTile";
import SearchBar from "../SearchBar";

const sidebarVariants = {
  initial: { x: -300 },
  animate: { x: 0 },
  exit: { x: -300 },
};

const cityListVariants = {
  animate: { transition: { staggerChildren: 0.03 } },
};

const cityItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export default function LeftSidebar({ loadingBarRef }) {
  const { activeCity, setActiveCity, geoWeatherData } =
    useContext(WeatherContext);
  const { user, setUser } = useContext(UserContext);
  const [searchError, setSearchError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  async function handleSearch(cityName) {
    try {
      const cityExists = user.recentCities.some(
        (c) => c.location.name.toLowerCase() === cityName.toLowerCase()
      );
      if (cityExists) {
        const match = user.recentCities.find(
          (c) => c.location.name.toLowerCase() === cityName.toLowerCase()
        );
        setActiveCity(match);
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
    } catch {
      setSearchError("❌ City not found. Please try again.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3500);
      setTimeout(() => setSearchError(null), 4500);
    } finally {
      loadingBarRef.current?.complete();
    }
  }

  function handleDeleteCity(cityName) {
    const filtered = user.recentCities.filter(
      (c) => c.location.name.toLowerCase() !== cityName.toLowerCase()
    );
    setUser({ ...user, recentCities: filtered });
  }

  const today = activeCity?.forecast?.forecastday?.[0];
  const sunrise = today?.astro?.sunrise;
  const sunset = today?.astro?.sunset;

  const tileStyle =
    "relative flex flex-col items-center justify-center p-3 text-white rounded-lg bg-black/30 backdrop-blur-md shadow before:absolute before:inset-0 before:bg-white/5 before:rounded-lg before:blur before:z-[-1]";

  return (
    <motion.aside
      className="w-full md:w-[300px] max-w-[350px] min-h-screen bg-black/30 backdrop-blur-md border-r border-white/20 shadow-inner p-4 flex flex-col gap-4 overflow-y-auto"
      variants={sidebarVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
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
      {searchError && (
        <p
          className={`text-red-400 text-xs font-medium px-1 -mt-2 mb-2 transition-opacity duration-1000 ${
            showError ? "opacity-100" : "opacity-0"
          }`}
        >
          {searchError}
        </p>
      )}

      <motion.ul
        className="flex flex-col gap-2 text-sm"
        variants={cityListVariants}
        animate="animate"
      >
        {user.recentCities.map((city, i) => {
          const isActive =
            city.location.name.toLowerCase() ===
            activeCity?.location?.name.toLowerCase();
          return (
            <motion.li key={i} variants={cityItemVariants}>
              <NavLink
                to={`/city/${city.location.name.toLowerCase()}`}
                className={`block px-2 py-1 rounded-md transition ${
                  isActive
                    ? "bg-white/20 ring-1 ring-white/30"
                    : "hover:bg-white/10"
                }`}
              >
                <motion.div whileHover={{ scale: 1.03 }}>
                  <CityTile
                    cityData={city}
                    onDelete={handleDeleteCity}
                    onClick={() => setActiveCity(city)}
                    isActive={isActive}
                  />
                </motion.div>
              </NavLink>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* Today Summary in 2x2 Grid */}
      {today && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <motion.div
            className={tileStyle}
            whileHover={{
              scale: 1.08,
              y: -5,
              boxShadow: "0 8px 16px rgba(255,255,255,0.1)",
              transition: { type: "spring", stiffness: 300, damping: 18 },
            }}
          >
            <WiThermometer className="text-orange-300 text-3xl" />
            <span className="text-xs opacity-70">Feels Like</span>
            <span className="text-base font-semibold">
              {activeCity.current.feelslike_f}°F
            </span>
          </motion.div>

          <motion.div
            className={tileStyle}
            whileHover={{
              scale: 1.08,
              y: -5,
              boxShadow: "0 8px 16px rgba(255,255,255,0.1)",
              transition: { type: "spring", stiffness: 300, damping: 18 },
            }}
          >
            <WiHumidity className="text-blue-300 text-3xl" />
            <span className="text-xs opacity-70">Humidity</span>
            <span className="text-base font-semibold">
              {activeCity.current.humidity}%
            </span>
          </motion.div>

          <motion.div
            className={tileStyle}
            whileHover={{
              scale: 1.08,
              y: -5,
              boxShadow: "0 8px 16px rgba(255,255,255,0.1)",
              transition: { type: "spring", stiffness: 300, damping: 18 },
            }}
          >
            <WiWindy className="text-gray-300 text-3xl" />
            <span className="text-xs opacity-70">Wind</span>
            <span className="text-base font-semibold">
              {activeCity.current.wind_mph} mph
            </span>
          </motion.div>

          {sunrise && sunset && (
            <motion.div
              className={tileStyle}
              whileHover={{
                scale: 1.08,
                y: -5,
                boxShadow: "0 8px 16px rgba(255,255,255,0.1)",
                transition: { type: "spring", stiffness: 300, damping: 18 },
              }}
            >
              <span className="text-xs opacity-70 mb-1">Sunrise & Sunset</span>
              <div className="flex gap-2 justify-center items-center text-xs">
                <div className="flex flex-col items-center">
                  <WiSunrise className="text-yellow-300 text-2xl" />
                  <span>{sunrise}</span>
                </div>
                <div className="opacity-50">/</div>
                <div className="flex flex-col items-center">
                  <WiSunset className="text-orange-400 text-2xl" />
                  <span>{sunset}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.aside>
  );
}
