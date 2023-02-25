import { Divider } from "@mui/material";
import Footer from "./section/Footer";
import Section1 from "./section/Section1";
import HomeMain from "./section/HomeMain";

export default function Home() {
  return (
    <div>
      <HomeMain />
      <Divider variant='middle' />
      <Section1 />
      <Footer />
    </div>
  )
};