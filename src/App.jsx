import React from "react";
import CurrentLocationTile from "./components/CurrentLocationTile";

export default function App() {
  return (
    <>
    <CurrentLocationTile/>
    <div className="bg-slate-800 text-white p-4 rounded-lg">
      Weather app starting point!
    </div>
    <div className="bg-indigo-700 text-white p-4 rounded-xl">Tailwind is working!</div>
    </>

  );
}
