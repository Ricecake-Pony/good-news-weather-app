import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import { WeatherProvider } from './context/WeatherContext.jsx';

createRoot(document.getElementById("root")).render(
	<WeatherProvider>
		<App />
	</WeatherProvider>
);
