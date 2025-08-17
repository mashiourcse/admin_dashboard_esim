import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Users } from "@/components/Tables/users";

import { Metadata } from "next";
import { Suspense } from "react";
import {ChannelData} from "@/utils/props";

import { channeldata as channel_data } from "@/utils/data";

export const metadata: Metadata = {
  title: "Tables",
};



const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="space-y-10">
        {/* <Suspense fallback={<TopProductsSkeleton />}>
         
        </Suspense> */}

        <InvoiceTable />
        
       
      </div>
    </>
  );
};

export default TablesPage;
