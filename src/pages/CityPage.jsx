import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { fetchCityWeather } from "../utils/fetchCityWeather";
// import TodaysSummary from "../components/TodaysSummary";
import { ClipLoader } from "react-spinners";
import ForecastMultiDay from "../components/ForecastMultiDay";
import PrecipitationBar from "../components/PrecipitationBar";
import { WeatherContext } from "../context/WeatherContext";

export default function CityPage() {
  const { activeCity, setActiveCity } = useContext(WeatherContext);
  const { cityName } = useParams();
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await fetchCityWeather({ cityName });
      setCityData(data);
      setActiveCity(data);
    }
    getData();
  }, [cityName]);

  if (!cityData) return <ClipLoader color="#ff9500" size={30} />;

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
