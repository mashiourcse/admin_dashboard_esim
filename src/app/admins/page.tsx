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
import HomeClient from "@/components/Home/HomeClient";

export const metadata: Metadata = {
  title: "Tables",
};



const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Administrators" />

      <div className="space-y-10">
        <UsersTable />

       
       
      </div>
    </>
  );
};

export default TablesPage;
