import CallToAction from "@/sections/CallToAction";
import Companies from "@/sections/Companies";
import Technologies from "@/sections/Technologies";
import Hero from "@/sections/Hero";
import Members from "@/sections/members";
import { ProjectsSection } from "@/sections/Projects";

export default function Home() {
  return (
    <>
      <Hero
        desc={`Harness the power of AI with cognify labz. Elevate your productivity
              and streamline your workflow with our cutting-edge platform.`}
        btnPath="#projects"
        btnText="See our projects"
        prompt1="Could you please generate a detail of the following review?"
        prompt2="Could you please convert my
                  emotion to an art?"
        showImage={true}
      />
      <Companies />
      <Technologies />
      <ProjectsSection />
      {/* <Pricing /> */}
      <Members />
      <CallToAction />
    </>
  );
}
