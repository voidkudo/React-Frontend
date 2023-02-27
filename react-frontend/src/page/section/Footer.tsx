import { Icon } from "@mui/material";

import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <div className='Footer'>
      <div className='GithubText'>
        <Icon>
          <GitHubIcon />
        </Icon>
        &nbsp;GitHub:&nbsp;@
        <a href='https://github.com/voidkudo' target={'_blank'} className='GithubLink'> voidkudo</a>
      </div>
      <div>© {new Date().getFullYear()} Toby Yeung • All right reserved</div>
    </div>
  )
};