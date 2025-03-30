import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

function Footer({ currentStep, setCurrentStep }: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;
  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
            variant={"secondary"}
          >
            Next step
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant={"secondary"} asChild>
            <Link href="/portfolios">Close</Link>
          </Button>
          <p className="">Saving...</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
