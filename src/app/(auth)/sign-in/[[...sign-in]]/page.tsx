import { SignIn } from "@clerk/nextjs";
import React from "react";

function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <SignIn />
    </main>
  );
}

export default Page;
