"use server";

import { PortfolioEditorProps } from "@/lib/types";

export async function savePortfolio({ portfolioData }: PortfolioEditorProps) {
  console.log(portfolioData);
}
