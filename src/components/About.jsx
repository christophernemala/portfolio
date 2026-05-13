import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useMediaQuery } from "react-responsive";

const impactMetrics = [
  { value: "AED 100M+", label: "Receivables Portfolio Managed" },
  { value: "70%", label: "Reduction in Unapplied Cash" },
  { value: "15M+", label: "Receipt Allocation Managed" },
  { value: "Multi-Entity", label: "Finance Operations" },
];

const expertisePillars = [
  {
    title: "O2C Operations & Receivables Transformation",
    points: [
      "DSO reduction and aging control",
      "Cash application efficiency",
      "Intercompany reconciliation",
      "Collection recovery strategy",
      "Dispute resolution governance",
    ],
  },
  {
    title: "Finance Automation & Operational Intelligence",
    points: [
      "AI agents and workflow automation",
      "OCR extraction systems",
      "Python-based reconciliation logic",
      "Exception monitoring frameworks",
      "Manual process reduction",
    ],
  },
  {
    title: "Governance, Compliance & Revenue Assurance",
    points: [
      "IFRS 9 aligned receivables monitoring",
      "Revenue assurance controls",
      "Multi-entity reconciliation",
      "Audit-ready reporting",
      "SLA and policy compliance",
    ],
  },
  {
    title: "Data Intelligence & Executive Reporting",
    points: [
      "Power BI executive dashboards",
      "DAX, SQL, and Oracle Fusion datasets",
      "Predictive collections analytics",
      "Liquidity and overdue exposure visibility",
      "C-suite KPI monitoring frameworks",
    ],
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
  "AI Workflow Systems",
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
    className="rounded-[20px] border border-cyan-400/20 bg-slate-950/60 px-6 py-5 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-md"
  >
    <p className="text-white text-[24px] font-black tracking-tight">{value}</p>
    <p className="mt-2 text-slate-400 text-[13px] leading-5 uppercase tracking-[0.18em]">
      {label}
    </p>
  </motion.div>
);

const ExpertiseCard = ({ title, points, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.12 * index, 0.75)}
    className="rounded-[24px] border border-white/10 bg-black/40 p-6 backdrop-blur-md hover:border-cyan-400/40 transition-colors duration-300"
  >
    <h3 className="text-white text-[20px] font-bold leading-7">{title}</h3>
    <ul className="mt-5 space-y-3">
      {points.map((point) => (
        <li key={point} className="flex gap-3 text-slate-400 text-[15px] leading-6">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300 shrink-0" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Executive Profile</p>
        <h2 className={styles.sectionHeadText}>
          Strategic Finance Operations & Intelligent Automation Specialist.
        </h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950/90 via-black/80 to-slate-900/70 p-7 md:p-9 shadow-[0_0_60px_rgba(30,58,95,0.25)] backdrop-blur-md"
        >
          <p className="text-cyan-300 text-[13px] uppercase tracking-[0.24em] font-semibold">
            Oracle Fusion • IFRS 9 • AI Automation • Power BI • O2C Governance
          </p>
          <h3 className="mt-5 text-white text-[28px] md:text-[36px] font-black leading-tight">
            Transforming enterprise receivables operations into scalable, AI-enabled financial intelligence systems.
          </h3>
          <p className="mt-6 text-slate-400 text-[17px] leading-[30px]">
            Christopher Nemala specializes in Order-to-Cash operations, receivables governance, and finance process automation across enterprise environments. With experience managing receivable portfolios exceeding AED 100M+, he focuses on improving liquidity visibility, accelerating collections cycles, and modernizing finance operations through data intelligence and automation.
          </p>
          <p className="mt-5 text-slate-400 text-[17px] leading-[30px]">
            His expertise combines financial governance and compliance, ERP and receivables systems, and AI-driven process automation. By integrating Oracle Fusion workflows, Power BI analytics, and automation frameworks, Christopher helps transform traditional receivables functions into operationally intelligent finance environments focused on speed, accuracy, and cash flow performance.
          </p>
          <blockquote className="mt-8 border-l-2 border-cyan-300 pl-6 text-white/90 text-[20px] md:text-[24px] leading-9 font-serif italic">
            “Modern finance operations should not function as reactive reporting centers. The objective is to build intelligent financial ecosystems capable of predicting risk, accelerating recovery cycles, and improving operational decision-making in real time.”
          </blockquote>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {impactMetrics.map((metric, index) => (
            <MetricCard key={metric.label} index={index} {...metric} />
          ))}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
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
        className="mt-10 rounded-[28px] border border-white/10 bg-gradient-to-r from-slate-950/80 to-black/70 p-7 md:p-9 backdrop-blur-md"
      >
        <h3 className="text-white text-[26px] font-black">Business Impact</h3>
        <p className="mt-5 text-slate-400 text-[17px] leading-[30px] max-w-5xl">
          In high-pressure liquidity environments, receivables performance directly influences operational flexibility and financial stability. Christopher focuses on building scalable finance systems that accelerate cash recovery, improve reporting accuracy, reduce operational friction, strengthen governance, and enhance executive visibility across complex finance environments.
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
