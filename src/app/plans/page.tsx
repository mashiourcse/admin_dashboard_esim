import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";


import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Tables",
};



const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Plans" />

      <div className="space-y-10">
       
        Plans component will be added here
        
       
      </div>
    </>
  );
};

export default TablesPage;
