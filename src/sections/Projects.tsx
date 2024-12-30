import React from "react";
import Image from "next/image";
import Link from "next/link";

// Icons / Images
import CheckCircleIcon from "@/assets/images/check-circle.svg";
import ArrowUpRightIcon from "@/assets/images/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import project1 from "@/assets/images/art-emotion.webp";
import project2 from "@/assets/images/pythonCodeGuru.webp";
import project3 from "@/assets/images/nutrition.webp";
import project4 from "@/assets/images/summarizer.webp";

// Components
import { SectionBorder } from "@/components/SectionBorder";

// Example portfolio data
const portfolioProjects = [
  {
    title: "Art Emotion",
    results: [
      { title: "Convert emotion to art" },
      { title: "Can sing for you" },
    ],
    link: "/art-emotion",
    image: project1,
  },
  {
    title: "Python code guru",
    results: [
      { title: "analyze your python code" },
      { title: "Accelerate your python skills" },
    ],
    link: "/python-code-guru",
    image: project2,
  },
  {
    title: "NutriPlan",
    results: [
      { title: "Supports personalized multi-cuisine diet plans." },
      { title: "Highly rated for simplicity and accuracy." },
    ],
    link: "/nutriplan",
    image: project3,
  },
  {
    title: "Review Summarizer",
    results: [
      {
        title: "Enhanced user experience with fast summarization.",
      },
      { title: "Widely praised for clarity and efficiency." },
    ],
    link: "/summarizer",
    image: project4,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects">
      <div className="container">
        {/* Wrap with SectionBorder and SectionContent, just like Pricing */}
        <SectionBorder borderTop>
          <div className="container py-24 md:py-36 lg:py-48">
            {/* Heading and description */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-semibold text-center text-gray-200">
              Featured Projects
            </h2>
            <p className="mt-4 text-center md:text-lg max-w-md mx-auto text-white/60 lg:text-xl">
              See how I transformed concepts into engaging digital experiences.
            </p>

            {/* Sticky Projects List */}
            <div className="flex flex-col mt-10 md:mt-20 gap-20">
              {portfolioProjects.map((project, projectIndex) => (
                <div
                  key={project.title}
                  className="bg-[#300E20] rounded-3xl z-0 after:z-10 overflow-hidden 
                             after:content-[''] after:absolute after:inset-0 
                             after:outline-2 after:outline after:-outline-offset-2 
                             after:rounded-3xl after:outline-white/20 
                             px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 
                             after:pointer-events-none sticky"
                  style={{
                    // Offset top for sticky position
                    top: `calc(64px + ${projectIndex * 40}px)`,
                  }}
                >
                  {/* Subtle grain background */}
                  <div
                    className="absolute inset-0 -z-10 opacity-5"
                    style={{ backgroundImage: `url(${grainImage.src})` }}
                  ></div>

                  <div className="lg:flex lg:items-center lg:justify-between lg:gap-16">
                    {/* Text Content */}
                    <div className="lg:pb-16">
                      <h3 className="text-2xl mt-2 md:text-4xl md:mt-5">
                        {project.title}
                      </h3>
                      <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                      <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                        {project.results.length > 0 ? (
                          project.results.map((result) => (
                            <li
                              key={result.title}
                              className="flex gap-2 text-sm md:text-base 
                                         text-white/50 items-center max-w-full 
                                         whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                              <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
                              <span className="w-52 text-wrap">
                                {result.title}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-white/50 text-sm md:text-base">
                            Project not yet completed
                          </li>
                        )}
                      </ul>
                      {/* Live site button */}
                      <Link href={project.link}>
                        <button
                          className="bg-white text-gray-950 h-12 w-full rounded-xl font-semibold 
                                           inline-flex items-center justify-center gap-2 mt-8 
                                           md:w-auto px-6"
                        >
                          Visit Live Site
                          <ArrowUpRightIcon className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="relative flex justify-center items-center">
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="rounded-lg mt-8 lg:mt-0 object-fill  lg:h-auto lg:w-auto"
                        style={{
                          maxHeight: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionBorder>
      </div>
    </section>
  );
};

export default ProjectsSection;
