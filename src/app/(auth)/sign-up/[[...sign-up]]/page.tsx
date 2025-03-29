import { SignUp } from "@clerk/nextjs";
import React from "react";

function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <SignUp />
    </main>
  );
}

export default Page;
