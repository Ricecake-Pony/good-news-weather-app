import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import GoodNews from "../GoodNews";
import OutdoorActivity from "../OutdoorActivity";
import WeatherFact from "../WeatherFact";

export default function RightSideBar() {
  const { activeCity } = useContext(WeatherContext);
  if (!activeCity?.current) return null;

  return (
    <aside className="hidden md:block w-full md:w-[300px] max-w-[350px] min-w-[280px] p-4 flex flex-col gap-4 overflow-y-auto bg-white/10 backdrop-blur-md border-l shadow-inner text-white rounded-l-2xl before:absolute before:inset-0 before:rounded-l-2xl before:bg-white/5 before:blur-xl before:z-[-1]">
      <OutdoorActivity cityData={activeCity} />
      <WeatherFact />
      <GoodNews />
    </aside>
  );
}
