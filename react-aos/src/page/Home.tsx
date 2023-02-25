import { Divider } from "@mui/material";
import Bottom from "./section/Bottom";
import Section1 from "./section/Section1";
import HomeMain from "./section/HomeMain";

export default function Home() {
  return (
    <div>
      <HomeMain />
      <Divider variant='middle' />
      <Section1 />
      <Bottom />
    </div>
  )
};