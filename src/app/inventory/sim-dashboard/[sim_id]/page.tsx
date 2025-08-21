import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SimDashboard from "@/components/SimCard";

import React from "react";

interface SimDashboardPageProps {
    params: { sim_id: string };
}

const SimDashboardPage: React.FC<SimDashboardPageProps> = ({ params }) => {
    const { sim_id } = params;
    return (
        <div>
          <Breadcrumb pageName={`SIM Dashboard / ${sim_id}`} />
            <SimDashboard />
        </div>
    );
};

export default SimDashboardPage;