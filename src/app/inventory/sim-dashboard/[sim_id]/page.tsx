
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SimDashboard from "@/components/SimCard";



const SimDashboardPage = () => {
 
    return (
        <div>
          <Breadcrumb pageName={`SIM Dashboard`} />
        
            <SimDashboard />
        </div>
    );
};

export default SimDashboardPage;