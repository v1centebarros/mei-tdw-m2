import { Suspense } from "react";
import Builder from "@/components/Builder";

export default function Page() {

  return (
    <Suspense>
      <Builder />
    </Suspense>
  );
}