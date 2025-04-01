import { NavLink } from "react-router-dom";
import CurrentLocationTile from "../CurrentLocationTile";
import CityTile from "../CityTile";
import "./sidebar.css";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<CurrentLocationTile />
			<h2>WeatherNav</h2>
            <CityTile temp="55 F" city="Tokyo"/>
			<nav>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/city/London">London</NavLink>
					</li>
					<li>
						<NavLink to="/city/New York">New York</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}
