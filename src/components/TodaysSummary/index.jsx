import { motion } from "framer-motion";
import React, { useContext } from "react";
import {
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiThermometer,
  WiWindy,
} from "react-icons/wi";
import { WeatherContext } from "../../context/WeatherContext";

export default function TodaysSummary() {
  const { activeCity } = useContext(WeatherContext);
  if (!activeCity?.forecast?.forecastday) return null;

  const todayForecast = activeCity.forecast.forecastday[0];
  const sunrise = todayForecast.astro?.sunrise;
  const sunset = todayForecast.astro?.sunset;

  const commonTileStyles =
    "cursor-pointer transition-transform duration-200 min-h-[100px] relative flex flex-col items-center justify-center p-4 rounded-xl bg-black/30 backdrop-blur-sm shadow-md text-white before:absolute before:inset-0 before:rounded-xl before:bg-white/5 before:blur-xl before:z-[-1]";
  const iconSize = "text-2xl sm:text-3xl md:text-4xl";

  return (
    <div className="relative flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            icon: (
              <WiThermometer className={`mb-1 text-orange-300 ${iconSize}`} />
            ),
            label: "Feels Like",
            value: `${activeCity?.current?.feelslike_f}°F`,
          },
          {
            icon: <WiHumidity className={`mb-1 text-blue-300 ${iconSize}`} />,
            label: "Humidity",
            value: `${activeCity?.current?.humidity}%`,
          },
          {
            icon: <WiWindy className={`mb-1 text-gray-300 ${iconSize}`} />,
            label: "Wind",
            value: `${activeCity?.current?.wind_mph} mph`,
          },
        ].map((tile) => (
          <motion.div
            key={tile.label}
            className={commonTileStyles}
            whileHover={{
              scale: 1.08,
              y: -5,
              boxShadow: "0 8px 16px rgba(255,255,255,0.1)",
              transition: { type: "spring", stiffness: 300, damping: 18 },
            }}
          >
            {tile.icon}
            <span className="text-sm opacity-70">{tile.label}</span>
            <span className="text-lg font-semibold mt-1">{tile.value}</span>
          </motion.div>
        ))}

        {sunrise && sunset && (
          <motion.div
            className={commonTileStyles}
            whileHover={{
              scale: 1.08,
              y: -5,
              boxShadow: "0 8px 16px rgba(255,255,255,0.1)",
              transition: { type: "spring", stiffness: 300, damping: 18 },
            }}
          >
            <span className="text-sm opacity-70 mb-1">Sunrise & Sunset</span>
            <div className="flex items-center justify-center mt-1">
              <div className="flex flex-col items-center mr-3">
                <WiSunrise className="text-yellow-300 text-3xl" />
                <span className="text-base">{sunrise}</span>
              </div>
              <span className="mx-2 text-xs opacity-50">/</span>
              <div className="flex flex-col items-center ml-3">
                <WiSunset className="text-orange-400 text-3xl" />
                <span className="text-base">{sunset}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
