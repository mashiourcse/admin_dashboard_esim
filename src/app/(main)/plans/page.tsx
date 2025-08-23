import { Select } from "antd";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import  PlansTable  from "@/components/Tables/plans";
import { Metadata } from "next";
import Wrapper from "@/components/Tables/plans/wrapper";

// Destructure Select.Option correctly


export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
 

  return (
    <>
      <Breadcrumb pageName="Plans & Pricing" />

      <div className="space-y-10">
     

        {/* Table Component */}
       <Wrapper />
      </div>
    </>
  );
};

export default TablesPage;
