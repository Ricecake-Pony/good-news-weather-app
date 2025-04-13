import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import getCountryCode from "../../utils/getCountryISOCode";

export default function CurrentLocationTile({ onClick }) {
  const { geoWeatherData } = useContext(WeatherContext);

  if (!geoWeatherData?.location || !geoWeatherData?.current) {
    return <div>Loading current weather...</div>;
  }

  const { location, current } = geoWeatherData;

  const country = location.country;
  const isoCode = getCountryCode(country)?.toLowerCase();
  const flagUrl = `https://flagcdn.com/48x36/${isoCode}.png`;

  return (
    <div
      title="Reset to current location"
      className="bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-md flex flex-col gap-2 text-white cursor-pointer hover:bg-white/20 transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <img
          src={flagUrl}
          alt={`Flag of ${country}`}
          width={24}
          height={18}
          className="rounded-sm shadow-sm"
        />
        <span className="text-sm opacity-80">Current Location:</span>
      </div>

      <div className="text-lg font-semibold leading-tight">
        {location.name}, {location.region}
      </div>
    </div>
  );
}
