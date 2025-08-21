
"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SimDashboard from "@/components/SimCard";
import { useParams } from "next/navigation";

import React from "react";

interface SimDashboardPageProps {
    params: { sim_id: string };
}

const SimDashboardPage: React.FC<SimDashboardPageProps> = () => {
 
    const { sim_id } = useParams<SimDashboardPageProps["params"]>();
    return (
        <div>
          <Breadcrumb pageName={`SIM Dashboard`} />
          <p>{sim_id}</p>
            <SimDashboard />
        </div>
    );
};

export default SimDashboardPage;