import { useEffect, useState } from "react";
import { AppBar, Icon, Toolbar } from "@mui/material";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Top() {
  const [date, setDate] = useState(new Date());
  const [temperature, setTemperature] = useState('');

  const updateTime = () => {
    setDate(new Date());
  };

  const updateTemperature = () => {
    let temp = 0;
    fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en')
      .then(res => res.json())
      .then(data => {
        data.temperature.data.forEach((record: any) => {
          temp += record.value;
        })
        temp /= data.temperature.data.length;
        setTemperature(temp.toFixed(1));
      })
      .catch(err => {
        console.error(err);
        setTemperature('');
      });
  };

  useEffect(() => {
    updateTemperature();
    setInterval(() => updateTime(), 1000);
    setInterval(() => updateTemperature(), 1000 * 60 * 10);
  }, []);

  return (
    <div className='Top'>
      <div className='TimeAndTemp'>
        <h1>{date.toTimeString().slice(0, 8)}</h1>
        <h1>{temperature + '°C'}</h1>
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