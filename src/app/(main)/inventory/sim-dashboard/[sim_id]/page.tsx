
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SimDashboard from "@/components/SimCard";
import { SimdetailsWrapper } from "./components/Wrapper"
import SimUserTable from "@/components/SimCard/SimUserPlan";



const SimDashboardPage = () => {
 
    return (
        <div>
          <Breadcrumb pageName={`SIM Dashboard`} />
        
           <SimdetailsWrapper />
           
        </div>
    );
};

export default SimDashboardPage;