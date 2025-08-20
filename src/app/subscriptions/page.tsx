import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import SubscriptionTable from "@/components/Tables/subscriptions";

export const metadata: Metadata = {
  title: "Tables",
};



const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Subscriptions" />

      <div className="space-y-10">
        <SubscriptionTable />
        
        
       
      </div>
    </>
  );
};

export default TablesPage;
