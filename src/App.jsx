import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  Achievements,
  WeatherCanvas,
  LighthouseCanvas,
} from "./components";
import { useMediaQuery } from "react-responsive";

const App = () => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1024 });

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-black">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Tech />
        <Achievements />
        <Works />
        <Contact />
        <WeatherCanvas />
        {!isMobileOrTablet && (
          <div className="relative w-full h-[100vh] overflow-hidden z-[-2]">
            <LighthouseCanvas />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
