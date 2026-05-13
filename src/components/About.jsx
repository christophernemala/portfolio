import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useMediaQuery } from "react-responsive";

const impactMetrics = [
  { value: "AED 100M+", label: "Portfolio Oversight" },
  { value: "70%", label: "Unapplied Cash Processing Reduction" },
  { value: "85%", label: "Zero-Touch Receipt Allocation Target" },
  { value: "100%", label: "IFRS 9 Audit Compliance Focus" },
];

const expertisePillars = [
  {
    number: "01",
    title: "Portfolio Governance & IFRS 9",
    body: "Architecting robust frameworks for multi-entity finance operations. Regulatory compliance becomes a data-driven advantage through disciplined revenue governance, receivables monitoring, and ECL modeling.",
  },
  {
    number: "02",
    title: "AI-Driven O2C Optimization",
    body: "Deploying autonomous finance agents across receipt allocation, dispute management, dunning, and exception handling. The focus is radical reduction of unapplied cash and manual intervention across the Order-to-Cash cycle.",
  },
  {
    number: "03",
    title: "Business Intelligence & Predictive Analytics",
    body: "Transforming raw ERP data into executive-level intelligence using Power BI, SQL, and Python. The objective is to move beyond what happened toward liquidity forecasting, credit risk visibility, and predictive finance control.",
  },
];

const technicalStack = [
  "Oracle Fusion ERP",
  "SAP",
  "Microsoft Dynamics 365",
  "Power BI",
  "DAX",
  "SQL",
  "Python",
  "Power Automate",
  "AI Finance Agents",
  "OCR Processing",
  "IFRS 9",
  "Revenue Assurance",
];

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
        <div className="black-fade-gradient rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const MetricCard = ({ value, label, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.15 * index, 0.75)}
    className="rounded-[20px] border border-cyan-400/20 bg-[#002D5E]/40 px-6 py-5 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-md"
  >
    <p className="text-white text-[26px] font-black tracking-tight">{value}</p>
    <p className="mt-2 text-slate-300 text-[13px] leading-5 uppercase tracking-[0.18em]">
      {label}
    </p>
  </motion.div>
);

const ExpertiseCard = ({ number, title, body, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.12 * index, 0.75)}
    className="rounded-[24px] border border-white/10 bg-[#2D2E2E]/55 p-7 backdrop-blur-md hover:border-cyan-400/40 transition-colors duration-300"
  >
    <p className="text-cyan-300 text-[13px] font-bold tracking-[0.28em]">{number}</p>
    <h3 className="mt-4 text-white text-[21px] font-bold leading-7">{title}</h3>
    <p className="mt-5 text-slate-300 text-[15px] leading-7">{body}</p>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Executive Profile</p>
        <h2 className={styles.sectionHeadText}>
          Finance Transformation & AI Architecture.
        </h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#002D5E]/85 via-black/85 to-[#2D2E2E]/80 p-7 md:p-10 shadow-[0_0_60px_rgba(0,45,94,0.35)] backdrop-blur-md"
        >
          <p className="text-cyan-300 text-[13px] uppercase tracking-[0.24em] font-semibold">
            Institutional Finance Governance • Autonomous Technology • CFO Intelligence
          </p>
          <div className="mt-6 space-y-6 text-white/90 text-[19px] md:text-[22px] leading-9 font-serif">
            <p>
              I operate at the intersection of institutional finance governance and autonomous technology. With a track record of managing high-liquidity portfolios exceeding AED 100M, my mission is to transition the Office of the CFO from a reactive reporting function to a proactive engine of value creation.
            </p>
            <p>
              My methodology leverages Oracle Fusion ERP as a foundation, upon which I build bespoke AI automation layers and Python-driven analytics to eliminate operational friction. I specialize in the last mile of finance transformation: turning complex IFRS 9 compliance requirements and fragmented O2C processes into streamlined, zero-touch workflows.
            </p>
            <p>
              In an era of rapid volatility, I provide the technical architecture and strategic oversight necessary to compress DSO, optimize working capital, and ensure revenue assurance.
            </p>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-white text-[28px] md:text-[34px] font-serif italic tracking-wide">
              Christopher Nemala
            </p>
            <p className="mt-2 text-slate-300 text-[13px] uppercase tracking-[0.22em]">
              Finance Architect • O2C Transformation • AI Automation
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {impactMetrics.map((metric, index) => (
            <MetricCard key={metric.label} index={index} {...metric} />
          ))}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {expertisePillars.map((pillar, index) => (
          <ExpertiseCard key={pillar.title} index={index} {...pillar} />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        className="mt-16 rounded-[28px] border border-white/10 bg-slate-950/60 p-7 md:p-9 backdrop-blur-md"
      >
        <h3 className="text-white text-[26px] font-black">Technical Ecosystem</h3>
        <div className="mt-6 flex flex-wrap gap-3">
          {technicalStack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-cyan-100 text-[14px] tracking-wide"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.25, 0.75)}
        className="mt-10 rounded-[28px] border border-white/10 bg-gradient-to-r from-[#002D5E]/70 to-black/70 p-7 md:p-9 backdrop-blur-md"
      >
        <h3 className="text-white text-[26px] font-black">Value Unlocked</h3>
        <p className="mt-5 text-slate-300 text-[17px] leading-[30px] max-w-5xl">
          This positioning transforms the portfolio from a finance specialist profile into a finance architecture narrative: governance depth, automation execution, working capital control, and executive-grade intelligence across the full receivables lifecycle.
        </p>
      </motion.div>

      <div className="flex flex-wrap mt-20 gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
