import React from "react";
// import { ClipLoader } from "react-spinners";
import getOutdoorActivity from "../../utils/getOutdoorActivity";

export default function OutdoorActivity({ cityData }) {
  // if (!cityData?.current || !cityData?.location) {
  //   return (
  //     <div className="flex justify-center items-center h-48">
  //       <ClipLoader color="#19a2f1" size={35} />
  //     </div>
  //   );
  // }

  const condition = cityData?.current?.condition?.text || "";
  const suggestion = getOutdoorActivity(condition);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white shadow-md">
      <h3 className="text-lg font-semibold mb-2">🌿 Today's Activity</h3>
      <p className="text-sm">{suggestion}</p>
    </div>
  );
}
