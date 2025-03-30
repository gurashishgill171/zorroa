import { Metadata } from "next";
import React from "react";
import PortfolioEditor from "./PortfolioEditor";

export const metaData: Metadata = {
  title: "Design your portfolio",
};

function Page() {
  return <PortfolioEditor />;
}

export default Page;
