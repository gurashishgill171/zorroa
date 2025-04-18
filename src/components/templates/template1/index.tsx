import React from "react";
import { PortfolioEditorProps } from "@/lib/types";
import DummyUser from "@/assets/dummyUser.jpg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ProjectImagePlaceholder from "@/assets/projectImage.png";

function Template1({ portfolioData }: PortfolioEditorProps) {
  return (
    <main>
      <div className="flex w-full max-w-[1280px] flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">
              Hi, I&apos;m {portfolioData?.firstName} 👋
            </h1>
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
          <p className="text-muted-foreground">{portfolioData?.about}</p>
        </div>

        <div>
          <h1 className="text-xl font-bold">Work Experience</h1>
          <div className="mt-2 flex flex-col gap-4">
            {portfolioData?.workExperiences?.map((workEx, index) => (
              <div key={index} className="flex items-start justify-between">
                <div>
                  <h1 className="text-md font-bold">{workEx.company}</h1>
                  <h4 className="text-md text-muted-foreground">
                    {workEx.position}
                  </h4>
                  <p className="text-sm font-light">{workEx.description}</p>
                </div>
                <div>
                  <span>
                    {workEx.startDate ? workEx.startDate : "N/A"} –{" "}
                    {workEx.endDate ? workEx.endDate : "Present"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold">Education</h1>
          <div className="mt-2 flex flex-col gap-4">
            {portfolioData?.educations?.map((education, index) => (
              <div key={index} className="flex items-start justify-between">
                <div>
                  <h1 className="text-md font-bold">{education.school}</h1>
                  <h4 className="text-md text-muted-foreground">
                    {education.degree}
                  </h4>
                  <p className="text-sm font-light">{education.description}</p>
                </div>
                <div>
                  <span>
                    {education.startDate ? education.startDate : "N/A"} –{" "}
                    {education.endDate ? education.endDate : "Present"}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
            I&apos;ve worked on variety of projects, here are few of my
            favourites.
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
