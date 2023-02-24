import { Divider } from "@mui/material";
import Bottom from "./section/Bottom";
import Section1 from "./section/Section1";
import Top from "./section/Top";

export default function Home() {
  return (
    <div>
      <Top />
      <Divider variant='middle' />
      <Section1 />
      <Bottom />
    </div>
  )
};