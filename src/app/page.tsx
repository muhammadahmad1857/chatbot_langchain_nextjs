// import CallToAction from "@/sections/CallToAction";
// import Companies from "@/sections/Companies";
// import Technologies from "@/sections/Technologies";
// import Hero from "@/sections/Hero";
// import Members from "@/sections/members";
// import { ProjectsSection } from "@/sections/Projects";
// // import SignIn from "@/components/sign-in";

// export default function Home() {
//   return (
//     <>
//       <Hero
//         desc={`Harness the power of AI with Kognifi. Elevate your productivity
//               and streamline your workflow with our cutting-edge platform.`}
//         btnPath="#projects"
//         btnText="See our projects"
//         prompt1="Could you please generate a detail of the following review?"
//         prompt2="Could you please convert my
//                   emotion to an art?"
//         showImage={true}
//       />
//       {/* <SignIn /> */}
//       <Companies />
//       <Technologies />
//       <ProjectsSection />
//       {/* <Pricing /> */}
//       <Members />
//       <CallToAction />
//     </>
//   );
// }

import { Button } from "@/components/Button";
import Card from "@/components/Card";
import { SectionBorder } from "@/components/SectionBorder";
import Hero from "@/sections/Hero";
import { SectionContent } from "@/sections/SectionContent";
import Link from "next/link";
import React from "react";

const CallingAgent = () => {
  return (
    <>
      <Hero
        btnPath="#call"
        btnText="Click to see services!"
        desc="We create art that shines. Art that brings joy, inspires, and brings understanding."
        projectName="Calling Agent"
      />
      <section id="call">
        <div className="container">
          <SectionBorder borderTop>
            <SectionContent>
              <h1 className="text-4xl -mt-20 font-bold text-white text-center tracking-tight uppercase">
                What we provide?
              </h1>
              <div className="grid md:grid-cols-2 mt-4 grid-cols-1 gap-4 mb-6">
                <Card
                  serviceName="Handle Your Business"
                  desc="Let our AI handle your business calls efficiently. Specify your task, and our AI will ensure it is carried out seamlessly."
                />
                <Card
                  serviceName="Get Call Transcripts"
                  desc="Receive detailed call transcripts for every interaction. Stay informed and keep track of important details effortlessly."
                />
                <Card
                  serviceName="Task Delegation Made Easy"
                  desc="Delegate tasks with precision. Our AI calling agent ensures your instructions are followed accurately, saving you time and effort."
                />
                <Card
                  serviceName="Customizable Call Scenarios"
                  desc="Tailor the conversation to your needs. From customer support to business inquiries, our AI adapts to suit your requirements."
                />
              </div>
              <Link href="/call" className="flex items-center justify-center">
                <Button variant="secondary" className="w-full  max-w-md">
                  Give it a try
                </Button>
              </Link>
            </SectionContent>
          </SectionBorder>
        </div>
      </section>
    </>
  );
};

export default CallingAgent;
