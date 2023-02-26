import { useEffect, useMemo, useState } from "react";
import { Icon } from "@mui/material";
import { DateTime } from "luxon";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WavesIcon from '@mui/icons-material/Waves';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function HomeMain() {
  const [date, setDate] = useState(DateTime.now());
  const [weather, setWeather] = useState({});

  const updateTime = () => {
    setDate(DateTime.now());
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

  const getUVData = (weather: any) => {
    try {
      let UVIndex = 0;
      let exposureLevel = '';
      weather.uvindex.data.forEach((record: any) => {
        UVIndex += record.value;
      });
      UVIndex /= weather.uvindex.data.length;
      const exposureLevels = weather.uvindex.data.map((record: any) => record.desc);
      let maxCount = 0;
      for (let i = 0; i < exposureLevels.length; i++) {
        let count = 0;
        for (let j = 0; j < exposureLevels.length; j++) {
          if (exposureLevels[i] === exposureLevels[j]) {
            count++;
          }
        }
        if (count > maxCount) {
          maxCount = count;
          exposureLevel = exposureLevels[i];
        }
      }
      return { index: UVIndex.toFixed(0), level: exposureLevel };
    }
    catch {
      return undefined;
    }
  }

  const getDateTimeContent = (date: DateTime) => {
    return (
      <div className='DateTime'>
        <h1>{date.toFormat('yyyy-MM-dd, cccc')}</h1>
        <h1>{date.toFormat('hh:mm:ss a')}</h1>
      </div>
    )
  };

  const getWeatherContent = (weather: any) => {
    const temperature = getTemperature(weather);
    const humidity = getHumidity(weather);
    const uvData = getUVData(weather);
    return (
      <div className='Weather'>
        <h1>
          <Icon>
            <ThermostatIcon />
          </Icon>
          {temperature === undefined ? '--' : temperature + '°C・'}
        </h1>
        <h1>
          <Icon>
            <WavesIcon />
          </Icon>
          {humidity === undefined ? '--' : humidity + '%'}
        </h1>
        {
          uvData !== undefined ?
            <h1>
              {'・'}
              <Icon>
                <WbSunnyIcon />
              </Icon>
              {' ' + uvData!.index + ' (' + uvData!.level.toUpperCase() + ')'}
            </h1> : null
        }
      </div>
    );
  };

  useEffect(() => {
    updateWeather();
    setInterval(() => updateTime(), 1000);
    setInterval(() => updateWeather(), 1000 * 60 * 10);
  }, []);

  return (
      <div className='HomeMain'>
        <div className='HomeMainContainer'>
          {getDateTimeContent(date)}
          {useMemo(() => getWeatherContent(weather), [weather])}
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