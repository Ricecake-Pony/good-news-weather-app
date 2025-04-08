import React from "react";
import getOutdoorActivity from "../../utils/getOutdoorActivity";

export default function OutdoorActivity({ cityData }) {
	const condition = cityData?.current?.condition?.text || "";
	const suggestion = getOutdoorActivity(condition);

	return (
		<div className="activity-suggestion">
			<h3>Today's Activity</h3>
			<p>{suggestion}</p>
		</div>
	);
}