import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { WeatherProvider } from "./context/WeatherContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<WeatherProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</WeatherProvider>
	</BrowserRouter>
);
