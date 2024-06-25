import React, { useEffect, useState } from "react";
import Temperature from "./components/Temperature";
import Highlights from "./components/Comman";

function App() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=3d91655a9ba0469c979104608242404&q=${city}&aqi=no;`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not get data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);
  return (
    <div className="bg-slate-800 h-screen flex justify-center  items-start">
      <div class="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="mt-40">
          {weatherData && (
            <Temperature
              setCity={setCity}
              stats={{
                temp: weatherData.current.temp_c,
                condition: weatherData.current.condition.text,
                isDay: weatherData.current.is_day,
                location: weatherData.location.name,
                time: weatherData.location.localtime,
              }}
            />
          )}
        </div>
          <div className="lg:mt-[16rem] md:mt-[1rem] grid grid-cols-2 gap-6">
          <h1 className="text-slate-200 text-2xl col-span-2 flex justify-center">
            Today's Highlights
          </h1>
          {weatherData && (
            <>
              <Highlights
                stats={{
                  title: "Wind Speed",
                  value: weatherData.current.wind_mph,
                  unit: "mph",
                  direction: weatherData.current.wind_dir,
                }}
              />
              <Highlights
                stats={{
                  title: "Humidity",
                  value: weatherData.current.humidity,
                  unit: "%",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;