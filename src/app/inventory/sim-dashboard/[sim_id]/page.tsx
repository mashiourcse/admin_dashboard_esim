import { NextPage } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SimDashboard from "@/components/SimCard";

// You can get `params` directly from the context in Next.js 13
interface SimDashboardPageProps {
  params: { sim_id: string };
}

const SimDashboardPage: NextPage<SimDashboardPageProps> = ({ params }) => {
  const { sim_id } = params;

  return (
    <div>
      <Breadcrumb pageName={`SIM Dashboard`} />
      <SimDashboard />
    </div>
  );
};

export default SimDashboardPage;
