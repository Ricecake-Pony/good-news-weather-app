import React, { useContext } from "react";
import OutdoorActivity from "../OutdoorActivity";
import WeatherFact from "../WeatherFact";
import GoodNews from "../GoodNews";
import { WeatherContext } from "../../context/WeatherContext";

export default function RightSideBar() {
	const { activeCity } = useContext(WeatherContext);
	if (!activeCity?.current) return null; 

	return (
		<div className="right-sidebar">
			<OutdoorActivity condition={activeCity.current.condition.text} />
			<WeatherFact />
			<GoodNews />
		</div>
	);
}
