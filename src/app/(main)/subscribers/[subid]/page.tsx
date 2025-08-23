import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SuscriberDashboard from "@/components/Subscribers/SubscriberCard";
import SubscriberPlans from "@/components/Subscribers/SubscriberPlans";


const SubscriberDetails = ()=>{
const plans = [
  {
    key: "1",
    name: "Basic Plan",
    ICCID: "8901410321114156104",
    planExpiry: "2025-09-15",
    status: "Active"
  },
  {
    key: "2",
    name: "Premium Plan",
    ICCID: "8901410321114156105",
    planExpiry: "2025-12-01",
    status: "Active"
  },
  {
    key: "3",
    name: "Family Plan",
    ICCID: "8901410321114156106",
    planExpiry: "2024-06-10",
    status: "Expired"
  },
  {
    key: "4",
    name: "Student Plan",
    ICCID: "8901410321114156107",
    planExpiry: "2025-05-20",
    status: "Active"
  },
  {
    key: "5",
    name: "Business Plan",
    ICCID: "8901410321114156108",
    planExpiry: "2026-03-01",
    status: "Active"
  }
];


    return <div>
         <Breadcrumb pageName="Subscriber Info" />
       <SuscriberDashboard />
       <SubscriberPlans data={plans}/>
    </div>
}

export default SubscriberDetails;