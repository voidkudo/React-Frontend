import { useEffect, useState } from "react";
import { Icon } from "@mui/material";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';

export default function HomeMain() {
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState();

  const updateTime = () => {
    setDate(new Date());
  };

  const updateWeather = () => {
    fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en')
      .then(res => res.json())
      .then(data => setWeather(data));
  };

  const getTemperature = (weather: any) => {
    try {
      let temperature = 0;
      weather.temperature.data.forEach((record: any) => {
        temperature += record.value;
      })
      temperature /= weather.temperature.data.length;
      return temperature.toFixed(1);
    }
    catch {
      return undefined;
    }
  };

  const getHumidity = (weather: any) => {
    try {
      let humidity = 0;
      weather.humidity.data.forEach((record: any) => {
        humidity += record.value;
      })
      humidity /= weather.humidity.data.length;
      return humidity.toFixed(0);
    }
    catch {
      return undefined;
    }
  };

  const getWeatherContent = (weather: any) => {
    const temperature = getTemperature(weather);
    const humidity = getHumidity(weather);
    if (temperature !== undefined && humidity !== undefined) {
      return (
        <h1>
          <Icon>
            <ThermostatIcon />
          </Icon>
          {temperature + '°C・'}
          <Icon>
            <OpacityIcon />
          </Icon>
          {humidity + '%'}
        </h1>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    updateWeather();
    setInterval(() => updateTime(), 1000);
    setInterval(() => updateWeather(), 1000 * 60 * 10);
  }, []);

  return (
    <div className='Top'>
      <div className='TimeAndTemp'>
        <h1>{date.toTimeString().slice(0, 8)}</h1>
        {getWeatherContent(weather)}
      </div>
      <div className='ScrollDown'>
        <div>Scroll Down</div>
        <Icon>
          <KeyboardArrowDownIcon />
        </Icon>
      </div>
    </div>
  )
}