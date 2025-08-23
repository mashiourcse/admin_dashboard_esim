
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SimDashboard from "@/components/SimCard";
import Wrapper from "@/components/Tables/plans/wrapper";



const SimDashboardPage = () => {
 
    return (
        <div>
          <Breadcrumb pageName={`SIM Dashboard`} />
        
            <SimDashboard />
            <Wrapper/>
        </div>
    );
};

export default SimDashboardPage;