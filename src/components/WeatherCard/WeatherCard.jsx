import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { WeatherContext } from "../../context/WeatherContext";

const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function WeatherCard({ cityData }) {
  const { backgroundUrl } = useContext(WeatherContext);
  const [weatherUrl, setWeatherUrl] = useState("");

  useEffect(() => {
    if (!cityData?.current || !cityData?.location) {
      return;
    }

    const randomNum = Math.floor(Math.random() * 10);
    const fallbackImage = "./public/fallback.jpg";

    async function fetchWeatherImage() {
      const condition = current.condition.text.toLowerCase();
      let weatherQuery = "weather";

      if (condition.includes("sun") || condition.includes("clear")) {
        weatherQuery = "sunny sky clear";
      } else if (condition.includes("rain") || condition.includes("drizzle")) {
        weatherQuery = "rainy weather storm clouds";
      } else if (
        condition.includes("snow") ||
        condition.includes("sleet") ||
        condition.includes("ice")
      ) {
        weatherQuery = "snow cold landscape";
      } else if (
        condition.includes("cloud") ||
        condition.includes("overcast")
      ) {
        weatherQuery = "cloudy sky";
      } else if (condition.includes("fog") || condition.includes("mist")) {
        weatherQuery = "foggy weather road";
      } else if (
        condition.includes("thunder") ||
        condition.includes("blizzard")
      ) {
        weatherQuery = "thunderstorm lightning dark clouds";
      } else {
        weatherQuery = condition;
      }

      const photoParams = new URLSearchParams({
        query: `${weatherQuery} weather`,
        client_id: `${unsplashKey}`,
        content_filter: "high",
      });

      const photoByWeather = `https://api.unsplash.com/search/photos/?${photoParams.toString()}`;

      try {
        const response = await axios.get(photoByWeather, {
          headers: {
            "Accept-Version": "v1",
          },
        });

        if (response.data?.results?.length > 0) {
          const weatherPhotos = response.data.results;
          const weatherPhoto =
            weatherPhotos[randomNum % weatherPhotos.length]?.urls?.regular;
          if (weatherPhoto === backgroundUrl) {
            setWeatherUrl(fallbackImage);
          } else {
            setWeatherUrl(weatherPhoto);
          }
        } else {
          setWeatherUrl(fallbackImage);
        }
      } catch (error) {
        console.error("Error fetching weather image: ", error);
        setWeatherUrl(fallbackImage);
      }
    }
    fetchWeatherImage();
  }, [cityData, backgroundUrl]);

  if (!cityData?.current || !cityData?.location) {
    return (
      <div className="flex justify-center items-center h-48">
        <RingLoader color="#19a2f1" size={35} />
      </div>
    );
  }

  const { current, location } = cityData;

  return (
    <div
      className="w-[90vw] max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl relative flex sm:flex-row flex-col ring-1 ring-white/20 sm:w-full"
      style={{
        backgroundImage: `url(${weatherUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:w-1/4 w-full h-auto sm:h-full bg-black/10 backdrop-blur-md z-10 p-6 md:p-8 text-white flex flex-col items-start text-left gap-2 rounded-l-2xl sm:rounded-tr-none sm:rounded-bl-2xl before:absolute before:inset-0 before:rounded-l-2xl sm:before:rounded-bl-2xl before:bg-white/5 before:blur-xl before:z-[-1]">
        <img
          src={`https:${current.condition.icon}`}
          alt="weather icon"
          className="w-14 h-14"
        />
        <div className="text-base font-medium opacity-90">
          {current.condition.text}
        </div>
        <div className="text-4xl font-bold">{current.temp_f}°F</div>
        <div className="text-xl font-semibold">{location.name}</div>
      </div>
      <div className="sm:w-3/4 w-full h-auto sm:h-full relative z-0 rounded-r-2xl sm:rounded-tl-none sm:rounded-r-2xl">
        <div className="absolute inset-0 bg-black/25 z-0 rounded-r-2xl" />
      </div>
    </div>
  );
}
