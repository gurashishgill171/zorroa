import React from "react";
import { PortfolioEditorProps } from "@/lib/types";

function Template1({ portfolioData, setPortfolioData }: PortfolioEditorProps) {
  return <pre>{JSON.stringify(portfolioData, null, 2)}</pre>;
}

export default Template1;
