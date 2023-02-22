import { Icon } from "@mui/material";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Home() {
  return (
    <div className='Home'>
      Home
      <div className='ScrollDown'>
        <div>Scroll Down</div>
        <Icon>
          <KeyboardArrowDownIcon />
        </Icon>
      </div>
    </div>
  )
}