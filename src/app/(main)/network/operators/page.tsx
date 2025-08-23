import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opertors Page",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Operators" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
        This is operators section
        </div>
        <div className="col-span-5 xl:col-span-2">
      
        </div>
      </div>
    </div>
  );
};

