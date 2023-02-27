import { AppBar, createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import { Pages } from "../App";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  const currentPage = Pages.includes(window.location.pathname.replace('/', '')) ? window.location.pathname.replace('/', '') : 'home';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2B3A55',
      },
      secondary: {
        main: '#CE7777',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar className='AppBar' position='fixed' color='primary'>
        <Tabs value={currentPage} onChange={(event, newValue) => navigate('/' + newValue)} centered indicatorColor='secondary'>
          <Tab label={<span className='Tab'>HOME</span>} value='home' icon={<HomeIcon className='Tab' />} iconPosition='start' />
          {
            Pages.map(tab =>
              <Tab key={tab} label={<span className='Tab'>{tab.toUpperCase()}</span>} value={tab} />
            )
          }
        </Tabs>
      </AppBar>
    </ThemeProvider>
  )
};