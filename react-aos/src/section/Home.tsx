import { useEffect, useState } from "react";
import { Icon } from "@mui/material";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Home() {
  const [date, setDate] = useState(new Date());

  const updateTime = () => {
    setDate(new Date());
  };

  useEffect(() => {
    setInterval(() => updateTime(), 1000);
  }, []);

  return (
    <div className='Home'>
      <h1>{date.toTimeString().slice(0, 8)}</h1>
      <div className='ScrollDown'>
        <div>Scroll Down</div>
        <Icon>
          <KeyboardArrowDownIcon />
        </Icon>
      </div>
    </div>
  )
}