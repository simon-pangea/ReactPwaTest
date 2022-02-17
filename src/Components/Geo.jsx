import React, { useRef, useState } from "react";

export default function Geo() {
  const [geoData, setGeodata] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setGeodata("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    setGeodata(
      "Latitude: " +
        position.coords.latitude +
        "\nLongitude: " +
        position.coords.longitude
    );
  };

  return (
    <div>
      <button onClick={getLocation}>LOCATION</button>
      {geoData.length > 0 && <p>{geoData}</p>}
      <br />
    </div>
  );
}
