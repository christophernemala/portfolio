import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, linkedin, host } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, projectsIntro } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import RainOnGlass from "./RainOnGlass";

/**
 * ProjectCard
 * -----------
 * Reusable project card component with tilt and motion effects.
 */
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  website,
  sourceCode,
  linkedinPost,
  featured = false,
}) => {
  const actionLinks = [
    {
      icon: host,
      url: website,
      alt: "website",
      iconSize: "w-7 h-7"
    },
    {
      icon: github,
      url: sourceCode,
      alt: "github",
      iconSize: "w-8 h-8"
    },
    {
      icon: linkedin,
      url: linkedinPost,
      alt: "linkedin",
      iconSize: "w-10 h-10"
    },
  ];

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.75)}
      className={featured ? "lg:col-span-2" : ""}
    >
      <Tilt
        options={{
          max: 30,
          scale: 1,
          speed: 400,
        }}
        className="black-gradient p-5 rounded-2xl w-full h-full"
      >
        <div className="relative w-full h-[220px] sm:h-[260px]">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain rounded-xl bg-stone-900"
          />

          {/* Action Icons (Website / GitHub / LinkedIn) */}
          <div className="absolute top-3 right-3 flex gap-3 z-10">
            {actionLinks
              .filter((item) => item.url)
              .map((item) => (
                <div
                  key={item.alt}
                  onClick={() => window.open(item.url, "_blank")}
                  className="
                    black-gradient
                    w-12 h-12
                    rounded-full
                    flex justify-center items-center
                    cursor-pointer
                    transition-all
                    hover:scale-110
                    hover:ring-2 hover:ring-white/20
                  "
                >
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className={`${item.iconSize} object-contain`}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[22px]">
            {name}
          </h3>
          <p className="mt-2 text-stone-300 text-[14px] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className={`text-[13px] ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

/**
 * Works
 * -----
 * Projects section with glowing parent animation.
 */
const Works = () => {
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mt-24"
    >
      {/* Animated glowing halo */}
      <motion.div
        aria-hidden
        className="
          pointer-events-none
          absolute -inset-[2px]
          rounded-3xl
          bg-gradient-to-r
          from-white/5
          via-white/15
          to-white/5
          blur-xl
          opacity-70
        "
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <div
        className="
          relative
          px-6 py-12
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-sm
          overflow-hidden
        "
      >
        <RainOnGlass />
        
        {/* Reveal wash */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="
              absolute inset-0
              bg-gradient-to-tr
              from-transparent
              via-white/5
              to-transparent
            "
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            transition={{
              duration: 1.4,
              ease: "easeOut",
            }}
          />
        </motion.div>

        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My work</p>
          <h2 className={styles.sectionHeadText}>
            Projects & Learnings.
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-slate-400 text-[17px] max-w-3xl leading-[30px]"
        >
          {projectsIntro}
        </motion.p>

        {featuredProject && (
          <div className="mt-20">
            <ProjectCard
              index={0}
              {...featuredProject}
              featured
            />
          </div>
        )}

        <div
          className="
            mt-16
            grid gap-8
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index + 1}
              {...project}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(Works, "");
