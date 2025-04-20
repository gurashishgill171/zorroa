import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PortfolioEditorProps } from "@/lib/types";
import { savePortfolio } from "./actions";
import { UseFormReturn } from "react-hook-form";
import { GeneralInfoValues, PersonalInfoValues } from "@/lib/validations";

interface FooterProps extends PortfolioEditorProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  form?: UseFormReturn<GeneralInfoValues | PersonalInfoValues>;
}

function Footer({
  currentStep,
  setCurrentStep,
  portfolioData,
  setPortfolioData,
  form,
}: FooterProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;
  const handleNextStep = async (nextStep: string) => {
    const isValid = await form?.trigger();
    if (isValid) {
      setCurrentStep(nextStep);
    }
    return;
  };
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
            onClick={
              nextStep
                ? () => handleNextStep(nextStep)
                : () => setShowDialog(true)
            }
            variant={"secondary"}
          >
            {nextStep ? "Next step" : "Save portfolio"}
          </Button>
          {showDialog && (
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Save Portfolio</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to save your portfolio? Make sure all
                    information is correct before proceeding.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setShowDialog(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      savePortfolio({ portfolioData, setPortfolioData })
                    }
                  >
                    Save
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
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
