// "use client";

// import React, { useState, useEffect } from "react";
// import Massab from "@/assets/images/massab.jpeg";
// import Abubacker from "@/assets/images/abubackerr.png";
// import Ahmad from "@/assets/images/ahmad.png";
// import shahzad from "@/assets/images/shahzad.png";
// import { SectionBorder } from "@/components/SectionBorder";
// import { SectionContent } from "./SectionContent";
// import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
// import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// export const members = [
//   {
//     quote:
//       "This project demonstrates how AI can generate personalized diet plans by analyzing user input like weight and height.It streamlines the meal-planning process, proving that AI can guide people toward healthier eating choices with simplicity and ease.",
//     name: "Abubakar Khalid",
//     title: "Team Leader Backend Developer",
//     image: Abubacker,
//   },
//   {
//     quote:
//       "Me, Shahzad Arif, believe AI is the next big thing that will reshape our world in ways we never imagined. This code-analysis route proves it: just drop in your code snippet, and watch AI break it down and offer insights in real time—showing how truly transformative this tech can be!",
//     name: "M. Shahzad Arif",
//     title: "Business Development Frontend Dev",
//     image: shahzad,
//   },
//   {
//     quote:
//       "Building my first AI-powered project taught me how simple sentiment analysis can unlock valuable insights from user feedback.By automatically highlighting key comments and sentiments, I realized how AI can make everyday tasks more efficient and data-driven.",
//     name: "M. Massab",
//     title: "Frontend Developer",
//     image: Massab,
//   },

//   {
//     quote:
//       "Just share your emotion, art form, and style, and this route will create unique text-based art for you! By mixing in your chosen context and language, it shows how AI can turn simple prompts into fun, creative expressions.",
//     name: "M Ahmad",
//     title: "MERN Stack Developer",
//     image: Ahmad,
//   },
// ];

// export const Members = () => {
//   const [memberIndex, setMemberIndex] = useState(0);

//   // Automatically slide testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMemberIndex((prevIndex) => (prevIndex + 1) % members.length);
//     }, 6000); 

//     return () => clearInterval(interval); // Clear interval on unmount
//   }, [memberIndex]);

//   return (
//     <section id="devs">
//       <div className="container">
//         <SectionBorder borderTop>
//           <SectionContent>
//             <h2 className="text-3xl md:text-5xl text-center my-6">Our Team</h2>
//             <LayoutGroup>
//               <motion.div
//                 className="border-gradient rounded-3xl px-6 md:px-10 lg:px-16 py-16 lg:py-24 relative flex flex-col md:flex-row gap-12 md:mx-10 lg:mx-20"
//                 layout
//               >
//                 <FontAwesomeIcon
//                   icon={faQuoteLeft}
//                   className="absolute size-20 text-violet-400 top-0 left-6 md:left-10 lg:left-16 -translate-y-1/2"
//                 />
//                 <AnimatePresence mode="wait" initial={false}>
//                   {members.map((member, index) =>
//                     memberIndex === index ? (
//                       <motion.blockquote
//                         initial={{ opacity: 0, y: 25 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 25 }}
//                         transition={{ duration: 0.5 }}
//                         key={member.name}
//                         layout
//                         className="flex flex-col lg:flex-row gap-12"
//                       >
//                         <p className="text-xl md:text-2xl font-medium">
//                           {member.quote}
//                         </p>
//                         <cite className="not-italic lg:text-right">
//                           <Image
//                             src={member.image}
//                             alt={member.name}
//                             className="rounded-xl size-28 max-w-none"
//                           />
//                           <div className="font-bold mt-4">{member.name}</div>
//                           <div className="text-xs text-gray-400 mt-2">
//                             {member.title}
//                           </div>
//                         </cite>
//                       </motion.blockquote>
//                     ) : null
//                   )}
//                 </AnimatePresence>
//                 <motion.div
//                   className="flex gap-2 md:flex-col"
//                   layout="position"
//                 >
//                   {members.map((member, index) => (
//                     <div
//                       key={member.name}
//                       className="size-6 relative isolate cursor-pointer inline-flex items-center justify-center"
//                       onClick={() => setMemberIndex(index)}
//                     >
//                       {memberIndex === index && (
//                         <motion.div
//                           className="absolute border-gradient size-full rounded-full -z-10"
//                           layoutId="testimonial-dot"
//                         ></motion.div>
//                       )}
//                       <div className="size-1.5 bg-gray-200 rounded-full"></div>
//                     </div>
//                   ))}
//                 </motion.div>
//               </motion.div>
//             </LayoutGroup>
//           </SectionContent>
//         </SectionBorder>
//       </div>
//     </section>
//   );
// };

// export default Members;

"use client";

import React, { useState, useEffect } from "react";
import Massab from "@/assets/images/massab.jpeg";
import Abubacker from "@/assets/images/abubackerr.png";
import Ahmad from "@/assets/images/ahmad.png";
import shahzad from "@/assets/images/shahzad.png";
import { SectionBorder } from "@/components/SectionBorder";
import { SectionContent } from "./SectionContent";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export const members = [
  {
    quote:
      "This project demonstrates how AI can generate personalized diet plans by analyzing user input like weight and height.It streamlines the meal-planning process, proving that AI can guide people toward healthier eating choices with simplicity and ease.",
    name: "Abubakar Khalid",
    title: "Team Leader Backend Developer",
    image: Abubacker,
  },
  {
    quote:
      "Me, Shahzad Arif, believe AI is the next big thing that will reshape our world in ways we never imagined. This code-analysis route proves it: just drop in your code snippet, and watch AI break it down and offer insights in real time—showing how truly transformative this tech can be!",
    name: "M. Shahzad Arif",
    title: "Business Development Frontend Dev",
    image: shahzad,
  },
  {
    quote:
      "Building my first AI-powered project taught me how simple sentiment analysis can unlock valuable insights from user feedback.By automatically highlighting key comments and sentiments, I realized how AI can make everyday tasks more efficient and data-driven.",
    name: "M. Massab",
    title: "Frontend Developer",
    image: Massab,
  },

  {
    quote:
      "Just share your emotion, art form, and style, and this route will create unique text-based art for you! By mixing in your chosen context and language, it shows how AI can turn simple prompts into fun, creative expressions.",
    name: "M Ahmad",
    title: "MERN Stack Developer",
    image: Ahmad,
  },
];

export const Members = () => {
  const [memberIndex, setMemberIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setMemberIndex((prevIndex) => (prevIndex + 1) % members.length);
      }, 2000);
    }
  };

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  return (
    <section id="devs">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent>
            <h2 className="text-3xl md:text-5xl text-center my-6">Our Team</h2>
            <LayoutGroup>
              <motion.div
                className="border-gradient rounded-3xl px-6 md:px-10 lg:px-16 py-16 lg:py-24 relative flex flex-col md:flex-row gap-12 md:mx-10 lg:mx-20"
                layout
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="absolute size-20 text-violet-400 top-0 left-6 md:left-10 lg:left-16 -translate-y-1/2"
                />
                <AnimatePresence mode="wait" initial={false}>
                  {members.map((member, index) =>
                    memberIndex === index ? (
                      <motion.blockquote
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 25 }}
                        transition={{ duration: 0.5 }}
                        key={member.name}
                        layout
                        className="flex flex-col lg:flex-row gap-12"
                      >
                        <p className="text-xl md:text-2xl font-medium">
                          {member.quote}
                        </p>
                        <cite className="not-italic lg:text-right">
                          <Image
                            src={member.image}
                            alt={member.name}
                            className="rounded-xl size-28 max-w-none"
                          />
                          <div className="font-bold mt-4">{member.name}</div>
                          <div className="text-xs text-gray-400 mt-2">
                            {member.title}
                          </div>
                        </cite>
                      </motion.blockquote>
                    ) : null
                  )}
                </AnimatePresence>
                <motion.div
                  className="flex gap-2 md:flex-col"
                  layout="position"
                >
                  {members.map((member, index) => (
                    <div
                      key={member.name}
                      className="size-6 relative isolate cursor-pointer inline-flex items-center justify-center"
                      onClick={() => setMemberIndex(index)}
                    >
                      {memberIndex === index && (
                        <motion.div
                          className="absolute border-gradient size-full rounded-full -z-10"
                          layoutId="testimonial-dot"
                        ></motion.div>
                      )}
                      <div className="size-1.5 bg-gray-200 rounded-full"></div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </LayoutGroup>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Members;
