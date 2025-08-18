import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";


import { Metadata } from "next";
import { Suspense } from "react";
import {ChannelData} from "@/utils/props";

import { channeldata as channel_data } from "@/utils/data";
import SkeletonUsersTable from "@/components/Tables/Administrators/skeleton";
import UsersTable  from "@/components/Tables/Administrators";
import InventoryTable from "@/components/Tables/inventory";
import SubscribersTable from "@/components/Tables/subscribers";

export const metadata: Metadata = {
  title: "Tables",
};



const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Subscribers" />

      <div className="space-y-10">
        <SubscribersTable />
        
        
       
      </div>
    </>
  );
};

export default TablesPage;
