import { motion } from "framer-motion";
import React, { useContext } from "react";
import { WiRaindrops, WiSnow } from "react-icons/wi";
import { WeatherContext } from "../../context/WeatherContext";

export default function PrecipitationBar() {
  const { activeCity } = useContext(WeatherContext);

  if (!activeCity?.forecast?.forecastday) return null;

  const todayForecast = activeCity.forecast.forecastday[0];
  const chanceOfRain = todayForecast.day?.daily_chance_of_rain || 0;
  const chanceOfSnow = todayForecast.day?.daily_chance_of_snow || 0;

  if (chanceOfRain === 0 && chanceOfSnow === 0) {
    return (
      <div className="mt-4 text-white/70 text-sm text-center">
        No Precipitation Expected
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 rounded-md bg-black/30 backdrop-blur-sm text-sm opacity-90 p-3 flex flex-col gap-3"
    >
      {/* Precip bar container */}
      <div className="relative rounded-md h-10 overflow-hidden flex items-center bg-white/10">
        {/* Rain bar */}
        {chanceOfRain > 0 && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-blue-500 flex items-center pl-3 pr-4"
            initial={{ width: 0 }}
            animate={{ width: `${chanceOfRain}%` }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-white text-sm font-semibold">
              <WiRaindrops className="text-3xl" />
              <span>{chanceOfRain}%</span>
            </div>
          </motion.div>
        )}

        {/* Snow bar */}
        {chanceOfSnow > 0 && (
          <motion.div
            className="absolute right-0 top-0 bottom-0 bg-white flex items-center justify-end pr-3 pl-4"
            initial={{ width: 0 }}
            animate={{ width: `${chanceOfSnow}%` }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 text-black text-sm font-semibold">
              <span>{chanceOfSnow}%</span>
              <WiSnow className="text-3xl" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-white/80 drop-shadow-sm px-1">
        <div className="text-left">Chance of Rain</div>
        <div className="text-right">Chance of Snow</div>
      </div>
    </motion.div>
  );
}
