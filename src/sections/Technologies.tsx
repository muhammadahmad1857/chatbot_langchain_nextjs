"use client";

import pythonLogo from "../assets/images/python.png";
import dockerLogo from "../assets/images/docker-logo.png";
import figmaLogo from "../assets/images/figma-logo.png";
import githubLogo from "../assets/images/github-logo.png";
import vsCodeLogo from "../assets/images/vs-code-logo.png";
import nextLogo from "../assets/images/next-logo.png";
import gemini from "../assets/images/gemini.png";
import fastAPI from "../assets/images/FastAPI.png";
import { SectionBorder } from "@/components/SectionBorder";
import { SectionContent } from "./SectionContent";
import { Button } from "@/components/Button";
import { Orbit } from "@/components/Orbit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "@/components/Logo";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export const benefits = [
  "Effortless integration",
  "Intelligent automation",
  "Robust security",
];

export const logos = [
  {
    src: pythonLogo,
    alt: "Python logo",
    rotate: 0,
  },
  {
    src: dockerLogo,
    alt: "docker logo",
    rotate: 45,
  },
  {
    src: figmaLogo,
    alt: "figma logo",
    rotate: 90,
  },
  {
    src: githubLogo,
    alt: "github logo",
    rotate: 135,
  },
  {
    src: vsCodeLogo,
    alt: "vs code logo",
    rotate: 180,
  },
  {
    src: nextLogo,
    alt: "Nextjs logo",
    rotate: 225,
  },
  {
    src: gemini,
    alt: "google logo",
    rotate: 270,
  },
  {
    src: fastAPI,
    alt: "Fast API logo",
    rotate: 315,
  },
];

export const Technologies = () => {
  return (
    <section id="technology">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent className="md:px-20 lg:px-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-200 leading-tight">
                  Technologies we use to empower your bussiness
                </h2>
                <ul className="mt-12 flex flex-col gap-8">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-4">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="size-6 text-violet-400"
                      />
                      <span className="text-xl font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link href={"#projects"}>
                  <Button className="mt-16">See Projects</Button>
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="size-[270px] md:size-[450px] flex flex-shrink-0 relative">
                  <div className="absolute inset-0">
                    <Orbit className="size-full" />
                  </div>
                  <div className="absolute-center">
                    <Orbit className="size-[180px] md:size-[300px]" />
                  </div>
                  <div className="absolute-center">
                    <Orbit className="size-full" />
                  </div>
                  <div className="absolute-center">
                    <Logo className="size-24" />
                  </div>
                  {logos.map(({ src, alt, rotate }) => (
                    <motion.div
                      className="absolute inset-0"
                      initial={{
                        rotate: rotate,
                      }}
                      animate={{
                        rotate: [
                          rotate,
                          rotate + 45,
                          rotate + 45,
                          rotate + 90,
                          rotate + 90,
                          rotate + 135,
                          rotate + 135,
                          rotate + 180,
                          rotate + 180,
                          rotate + 225,
                          rotate + 225,
                          rotate + 270,
                          rotate + 270,
                          rotate + 315,
                          rotate + 315,
                          rotate + 360,
                          rotate + 360,
                        ],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "anticipate",
                        repeatType: "loop",
                        repeatDelay: 3,
                      }}
                      key={alt}
                    >
                      <motion.div
                        className="inline-flex size-10 md:size-14 items-center justify-center border border-[var(--color-border)] rounded-lg absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-0 bg-gray-950"
                        initial={{
                          translate: "-50% -50%",
                          rotate: -rotate,
                        }}
                        animate={{
                          rotate: [
                            -rotate,
                            -rotate - 45,
                            -rotate - 45,
                            -rotate - 90,
                            -rotate - 90,
                            -rotate - 135,
                            -rotate - 135,
                            -rotate - 180,
                            -rotate - 180,
                            -rotate - 225,
                            -rotate - 225,
                            -rotate - 270,
                            -rotate - 270,
                            -rotate - 315,
                            -rotate - 315,
                            -rotate - 360,
                            -rotate - 360,
                          ],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "anticipate",
                          repeatType: "loop",
                          repeatDelay: 3,
                        }}
                      >
                        <Image
                          src={src}
                          alt={alt}
                          className="size-6 md:size-9"
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Technologies;
