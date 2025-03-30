import { Button } from "@/components/ui/button";
import Image from "next/image";
import PortfolioPreview1Image from "@/assets/portfolioPreview1.png";
import PortfolioPreview2Image from "@/assets/portfolioPreview2.png";

export default function Home() {
  return (
    <main>
      <div className="relative min-h-screen overflow-hidden bg-black text-white">
        <Image
          src={PortfolioPreview1Image}
          alt="portfolio-preview"
          className="absolute top-10 left-30"
          width={250}
          height={250}
        />
        <Image
          src={PortfolioPreview2Image}
          alt="portfolio-preview"
          className="absolute top-[50%] left-[80%]"
          width={250}
          height={250}
        />
        <div className="absolute top-1/2 left-1/2 max-w-[820px] -translate-x-1/2 -translate-y-1/2 transform text-center">
          <h1 className="text-center text-7xl font-bold tracking-wide">
            Build a stunning portfolio in minutes with AI
          </h1>
          <p className="text-1xl mt-8 text-center font-light">
            Creating a portfolio shouldn’t be complicated. Our AI-powered
            portfolio builder helps you craft a professional, visually striking
            website in minutes—no coding or design skills needed. Simply enter
            your details, choose a template, and let AI generate stunning
            layouts and content that showcase your skills, projects, and
            experience. Whether you’re a developer, designer, writer, or
            freelancer, our smart tool ensures your portfolio is polished,
            responsive, and ready to impress.
          </p>
          <Button className="mt-8 cursor-pointer bg-[#0055D4] p-4">
            Get Started - it&apos;s free
          </Button>
        </div>
      </div>
      <div className="bg-[#F0F0F0]">
        <h1>Browse a collection of unique portfolio website templates</h1>
      </div>
    </main>
  );
}
