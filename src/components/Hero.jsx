import { motion } from "framer-motion";
import { styles } from "../styles";
import { githubLink, linkedinLink } from "../constants";
import { github, linkedin } from "../assets";
import { BusCanvas } from "./canvas";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1024 });

  return (
    <section
      className={`
        relative w-full mx-auto
        ${!isMobileOrTablet ? "h-screen" : "min-h-[70vh] py-24"}
      `}
    >
      {!isMobileOrTablet && <BusCanvas />}
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#0CAFFF]" />
          <div className="w-1 sm:h-80 h-40 blue-gradient" />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m <span className="text-[#0CAFFF]">Bharath</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop stunning Mobile and Web applications
          </p>
          <div className="flex flex-row items-center justify-center gap-2 mt-5 max-w-36 bg-[#0CAFFF] rounded-3xl p-0">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10"
            >
              <img
                src={github}
                alt="github profile"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 cursor-pointer"
              />
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10"
            >
              <img
                src={linkedin}
                alt="linkedin profile"
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#0CAFFF] flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 bg-[#0CAFFF] rounded-full mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
