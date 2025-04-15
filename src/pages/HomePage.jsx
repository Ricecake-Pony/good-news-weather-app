import { useContext } from "react";
import ForecastMultiDay from "../components/ForecastMultiDay";
import PrecipitationBar from "../components/PrecipitationBar";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { WeatherContext } from "../context/WeatherContext";

export default function HomePage() {
  const { activeCity } = useContext(WeatherContext);

  if (!activeCity) return <div>Loading current weather...</div>;

  return (
    <div className="flex flex-col justify-between min-h-[90vh] gap-4 px-4 pt-6 pb-2">
      <WeatherCard cityData={activeCity} />
      <div className="grow-[2]" />
      <div className="flex flex-col gap-4">
        <PrecipitationBar />
        <ForecastMultiDay cityData={activeCity} />
      </div>
    </div>
  );
}
