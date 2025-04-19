import { Button } from "@/components/ui/button";
import Image from "next/image";
import PortfolioPreview1Image from "@/assets/portfolioPreview1.png";
import PortfolioPreview2Image from "@/assets/portfolioPreview2.png";
import PortfolioImage from "@/assets/portfolio.png";
import AIImage from "@/assets/ai.png";
import PayImage from "@/assets/pay.png";
import CompetitionImage from "@/assets/competitive.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const displayData = [
  {
    title: "A better portfolio in minutes",
    description:
      "Replace your old portfolio in a few simple clicks. Our builder gives recruiters what they want.",
    image: PortfolioImage,
  },
  {
    title: "Beat the competition",
    description:
      "Our tested portfolio templates are designed to make you more attractive to recruiters.",
    image: CompetitionImage,
  },
  {
    title: "Easy with AI",
    description:
      "Quickly generate formal phrases and summaries. Sound professional, faster.",
    image: AIImage,
  },
  {
    title: "Get paid more",
    description:
      "A higher salary begins with a strong portfolio. Our salary analyzer tells you if your job offer is competitive (or not).",
    image: PayImage,
  },
];

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
      <div className="min-h-[70vh] w-full bg-gradient-to-r from-blue-600 to-violet-600 p-4">
        <h1 className="text-center text-4xl font-bold tracking-wide text-white">
          Pick one of many world-class templates <br /> and build your portfolio
          in minutes.
        </h1>
        <Carousel className="mx-auto mt-8 w-[60%]">
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Image
                  src={PortfolioPreview1Image}
                  alt="portfolio-preview"
                  width={250}
                  height={250}
                />
              </CarouselItem>
            ))}
            ]
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FFFFFF] p-4">
        <h1 className="text-5xl font-bold">
          Get hired fast with a powerful portfolio
        </h1>
        <div className="mt-12 grid grid-cols-2 gap-12">
          {displayData.map((item) => (
            <div
              key={item.title}
              className="flex max-w-[380px] items-start gap-4"
            >
              <Image src={item.image} alt={item.title} width={60} height={60} />
              <div>
                <h1 className="text-xl font-bold">{item.title}</h1>
                <p className="text-muted-foreground text-md">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
