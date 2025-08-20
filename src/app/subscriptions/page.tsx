import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

import SubscribersTable from "@/components/Tables/subscribers";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Subscriptions" />
      <div className="space-y-10">
        <SubscribersTable />
      </div>
    </>
  );
};

export default TablesPage;
