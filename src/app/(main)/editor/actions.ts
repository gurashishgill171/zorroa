"use server";

import { prisma } from "@/lib/prisma";
import { PortfolioEditorProps } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function savePortfolio({ portfolioData }: PortfolioEditorProps) {
  // either create or update portfolio
  const {id} = portfolioData;
  const {userId} = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if(!id) {
    return prisma.portfolio.create({
      data: {
        ...portfolioData,
        userId,
        
      }
    })
  }
}
