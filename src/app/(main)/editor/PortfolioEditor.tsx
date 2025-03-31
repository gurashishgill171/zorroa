"use client";

import React, { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Footer from "./Footer";
import { PortfolioValues } from "@/lib/validations";

function PortfolioEditor() {
  const [portfolioData, setPortfolioData] = useState<PortfolioValues>({});
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;
  return (
    <div className="flex min-h-screen grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your portfolio.</h1>
        <p className="text-muted-foreground text-sm">
          Follow the steps below to create your portfolio. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div className="w-full space-y-6 overflow-y-auto p-3 md:w-1/2">
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                portfolioData={portfolioData}
                setPortfolioData={setPortfolioData}
              />
            )}
          </div>
          <div className="hidden w-1/2 p-3 md:flex md:border-l">
            <pre>{JSON.stringify(portfolioData, null, 2)}</pre>
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}

export default PortfolioEditor;
