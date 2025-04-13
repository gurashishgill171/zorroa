import React from "react";
import { PortfolioEditorProps } from "@/lib/types";
import DummyUser from "@/assets/dummyUser.jpg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ProjectImagePlaceholder from "@/assets/projectImage.png";

function Template1({ portfolioData, setPortfolioData }: PortfolioEditorProps) {
  return (
    <main>
      <div className="flex w-full max-w-[1280px] flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">Hi, I'm Gurashish 👋</h1>
            <p className="text-xl font-light">
              Software Engineer turned Entrepreneur. I love building things and
              helping people. Very active on Twitter.
            </p>
          </div>
          <Image
            src={DummyUser}
            alt="dummy-user"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold">About</h1>
          <p className="text-muted-foreground">
            At the end of 2022, I quit my job as a software engineer to go
            fulltime into building and scaling my own SaaS businesses. In the
            past, I pursued a double degree in computer science and business,
            interned at big tech companies in Silicon Valley, and competed in
            over 21 hackathons for fun. I also had the pleasure of being a part
            of the first ever in-person cohort of buildspace called buildspace
            sf1.
          </p>
        </div>

        <div>
          <h1 className="text-xl font-bold">Work Experience</h1>
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-md font-bold">Incedo Inc.</h4>
                <p className="text-md text-muted-foreground">
                  Software Engineer
                </p>
              </div>
              <div>
                <p className="text-md text-muted-foreground">
                  July 2023 - Present
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold">Education</h1>
        </div>

        <div>
          <h1 className="text-xl font-bold">Skills</h1>
          <div className="mt-4 flex gap-2">
            {portfolioData?.skills?.map((skill) => (
              <Badge key={skill} variant="default">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-center text-xl font-bold">My Projects</h1>
          <h4 className="text-center text-4xl font-bold">
            Checkout my latest work{" "}
          </h4>
          <p className="text-muted-foreground text-center text-xl font-light">
            I've worked on variety of projects, here are few of my favourites.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {portfolioData?.projects?.map((project) => (
              <div
                key={project.title}
                className="flex flex-col gap-2 rounded-lg border"
              >
                <div className="h-[180px] w-full">
                  <Image
                    src={project.photoUrl || ProjectImagePlaceholder}
                    alt="project-image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h4 className="text-xl font-bold">{project.title}</h4>
                  <p className="text-muted-foreground text-sm font-light">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project?.skills?.map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Template1;
