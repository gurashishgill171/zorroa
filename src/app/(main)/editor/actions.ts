"use server";

import { prisma } from "@/lib/prisma";
import { PortfolioEditorProps } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function savePortfolio({ portfolioData }: PortfolioEditorProps) {
  // either create or update portfolio
  const { id } = portfolioData;
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!id) {
    return prisma.portfolio.create({
      data: {
        ...portfolioData,
        photo: "",
        userId,
        workExperiences: {
          create: portfolioData.workExperiences?.map((workExperience) => ({
            ...workExperience,
            startDate: new Date(workExperience.startDate),
            endDate: new Date(workExperience.endDate ?? ""),
          })),
        },
        educations: {
          create: portfolioData.educations?.map((education) => ({
            ...education,
            startDate: new Date(education.startDate),
            endDate: new Date(education.endDate ?? ""),
          })),
        },
        projects: {
          create: portfolioData.projects?.map((project) => ({
            ...project,
          })),
        }
      },
    });
  }
}
