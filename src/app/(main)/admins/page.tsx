import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";

import UsersTable from "@/components/Tables/Administrators";

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
