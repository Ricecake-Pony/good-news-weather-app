import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Layout from "./components/Layout";
import { WeatherContext } from "./context/WeatherContext";
import CityPage from "./pages/CityPage";
import HomePage from "./pages/HomePage";
import fetchRegionalBackground from "./utils/fetchRegionalBackground";

export default function App() {
  const {
    activeCity,
    geoWeatherData,
    setActiveCity,
    backgroundUrl,
    setBackgroundUrl,
  } = useContext(WeatherContext);

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
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
      {backgroundUrl && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
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
