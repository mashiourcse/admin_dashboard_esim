import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us Page",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Contact Us" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
        This is Contact Us section
        </div>
        <div className="col-span-5 xl:col-span-2">
      
        </div>
      </div>
    </div>
  );
};

