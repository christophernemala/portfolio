import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services, Introduction } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useMediaQuery } from "react-responsive";

const ServiceCard = ({ title, index, icon }) => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1024 });
  
  return (
    <Tilt 
      options={{ max: isMobileOrTablet ? 0 : 45, scale: 1, speed: 450 }}
      className="xs:w-[250px] w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full p-[1px] rounded-[20px]"
      >
        <div
          className="black-fade-gradient rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-slate-400 text-[17px] max-w-3xl leading-[30px]"
      >
        {Introduction}
      </motion.p>

      <div className="flex flex-wrap mt-20 gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
