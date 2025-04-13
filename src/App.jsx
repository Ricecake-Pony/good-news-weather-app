import React, { useContext, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import CityPage from "./pages/CityPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import { WeatherContext } from "./context/WeatherContext";
import fetchRegionalBackground from "./utils/fetchRegionalBackground";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const { activeCity, geoWeatherData, setActiveCity, setBackgroundUrl } =
    useContext(WeatherContext);

  const loadingBarRef = useRef(null);
  const route = useLocation();

  useEffect(() => {
    if (
      route.pathname === "/" &&
      geoWeatherData?.location?.name &&
      activeCity?.location?.name !== geoWeatherData.location.name
    ) {
      setActiveCity(geoWeatherData);
    }
  }, [geoWeatherData, activeCity, route.pathname]);

  useEffect(() => {
    if (activeCity?.current?.condition?.text && activeCity?.location?.region) {
      const fetchBackground = async () => {
        const bgUrl = await fetchRegionalBackground({
          conditionText: activeCity.current.condition.text,
          location: activeCity.location,
        });
        if (bgUrl) {
          setBackgroundUrl(bgUrl);
        } else {
          const fallback = `/fallbackBg.jpg`;
          setBackgroundUrl(fallback);
        }
      };
      fetchBackground();
    }
  }, [activeCity]);

  return (
    <div className="relative min-h-screen w-full">
      {activeCity && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${activeCity?.backgroundUrl || ""})`,
          }}
        />
      )}

      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20">
        <LoadingBar color="#19a2f1" ref={loadingBarRef} height={3} />
        <Routes>
          <Route path="/" element={<Layout loadingBarRef={loadingBarRef} />}>
            <Route index element={<HomePage />} />
            <Route path="city/:cityName" element={<CityPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
