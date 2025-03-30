"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import GeneralForm from "./forms/GeneralForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";

function PortfolioEditor() {
  return (
    <div className="flex min-h-screen grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your portfolio.</h1>
        <p className="text-muted-foreground text-sm font-light">
          Follow the steps below to create your portfolio. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div className="w-full overflow-y-auto p-3 md:w-1/2">
            {/* <GeneralForm /> */}
            <PersonalInfoForm />
          </div>
          <div className="hidden w-1/2 p-3 md:flex md:border-l">
            right section
          </div>
        </div>
      </main>
      <footer className="w-full border-t px-3 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex gap-2">
            <Button>Previous step</Button>
            <Button variant={"secondary"}>Next step</Button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button variant={"secondary"} asChild>
              <Link href="/portfolios">Close</Link>
            </Button>
            <p className="">Saving...</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PortfolioEditor;
