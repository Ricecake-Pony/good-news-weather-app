import React, { useContext } from "react";
import {
  WiHumidity,
  WiRaindrops,
  WiSnow,
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
  const chanceOfRain = todayForecast.day?.daily_chance_of_rain || 0;
  const chanceOfSnow = todayForecast.day?.daily_chance_of_snow || 0;

  const commonTileStyles = `min-h-[100px] relative flex flex-col items-center justify-center p-4 rounded-xl bg-black/30 backdrop-blur-sm shadow-md text-white before:absolute before:inset-0 before:rounded-xl before:bg-white/5 before:blur-xl before:z-[-1]`;
  const iconSize = "text-2xl sm:text-3xl md:text-4xl";

  return (
    <div className="relative flex flex-col gap-4 p-4">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-stretch gap-4">
        <div className={`${commonTileStyles} flex-1`}>
          <WiThermometer className={`mb-1 text-orange-300 ${iconSize}`} />
          <span className="text-sm opacity-70">Feels Like</span>
          <span className="text-lg font-semibold mt-1">
            {activeCity?.current?.feelslike_f}°F
          </span>
        </div>

        <div className={`${commonTileStyles} flex-1`}>
          <WiHumidity className={`mb-1 text-blue-300 ${iconSize}`} />
          <span className="text-sm opacity-70">Humidity</span>
          <span className="text-lg font-semibold mt-1">
            {activeCity?.current?.humidity}%
          </span>
        </div>

        <div className={`${commonTileStyles} flex-1`}>
          <WiWindy className={`mb-1 text-gray-300 ${iconSize}`} />
          <span className="text-sm opacity-70">Wind</span>
          <span className="text-lg font-semibold mt-1">
            {activeCity?.current?.wind_mph} mph
          </span>
        </div>

        {sunrise && sunset && (
          <div className={`${commonTileStyles} flex-1`}>
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
          </div>
        )}
      </div>

      {(chanceOfRain > 0 || chanceOfSnow > 0) && (
        <div className="mt-4 rounded-md bg-black/30 backdrop-blur-sm text-sm opacity-90 p-3">
          <div className="relative rounded-md h-8 overflow-hidden flex items-center hover:scale-[1.01] transition-transform duration-200 ease-out">
            {chanceOfRain > 0 && (
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 flex items-center pl-3 pr-4"
                style={{ width: `${chanceOfRain}%`, minWidth: "20%" }}
              >
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-white text-sm font-semibold">
                  <WiRaindrops
                    className="text-3xl"
                    aria-label="Chance of Rain"
                  />
                  <span>{chanceOfRain}%</span>
                </div>
              </div>
            )}

            {chanceOfSnow > 0 && (
              <div
                className="absolute top-0 right-0 h-full bg-white transition-all duration-300 flex items-center justify-end pr-3 pl-4"
                style={{
                  width: `${chanceOfSnow}%`,
                  minWidth: "20%",
                }}
              >
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 text-black text-sm font-semibold">
                  <span>{chanceOfSnow}%</span>
                  <WiSnow className="text-3xl" />
                </div>
              </div>
            )}

            {chanceOfRain === 0 && chanceOfSnow === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-white/70 text-xs font-semibold">
                No Precipitation Expected
              </div>
            )}
          </div>

          <div className="flex justify-between text-xs text-white/80 drop-shadow-sm mt-1 px-1">
            <span>Chance of Rain</span>
            <span>Chance of Snow</span>
          </div>
        </div>
      )}
    </div>
  );
}
