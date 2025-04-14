import React from "react";
import getOutdoorActivity from "../../utils/getOutdoorActivity";

export default function OutdoorActivity({ cityData }) {
  const condition = cityData?.current?.condition?.text || "";
  const suggestion = getOutdoorActivity(condition);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white shadow-md">
      <h3 className="text-lg font-semibold mb-2">🌿 Today's Activity</h3>
      <p className="text-sm">{suggestion}</p>
    </div>
  );
}
