"use client";

import { SectionBorder } from "@/components/SectionBorder";
import { SectionContent } from "./SectionContent";
import { motion } from "framer-motion";
import Link from "next/link";

// Removed logo imports since we only want to use names now
export const companies = [
  { name: "Art Emotion", link: "/art-emotion" },
  { name: "Review Summarizer", link: "/summarizer" },
  { name: "Python Code Guru", link: "/python-code-guru" },
  { name: "NutriPlan", link: "/nutriplan" },
];

export const Companies = () => {
  return (
    <section>
      <div className="container">
        <SectionBorder>
          <SectionContent className="!pt-0">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest text-gray-500">
              Empowering AI innovation by following projects
            </h2>
            <div className="flex mt-20 overflow-x-clip -mx-4 lg:-mx-8">
              <motion.div
                className="flex flex-none gap-18 md:gap-36 px-9 md:px-18"
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...companies, ...companies].map(
                  ({ name, link }, arrIndex) => (
                    <div key={arrIndex}>
                      <Link
                        href={link}
                        className="h-8 flex items-center justify-center text-white text-2xl font-extrabold whitespace-nowrap"
                      >
                        {name}
                      </Link>
                    </div>
                  )
                )}
              </motion.div>
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Companies;
