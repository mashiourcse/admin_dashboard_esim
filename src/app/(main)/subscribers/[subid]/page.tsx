import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SuscriberDashboard from "@/components/Subscribers/SubscriberCard";
import {SubscriberInfoCard} from "@/components/Subscribers/SubscriberInfoCard";
import SubscriberPlans from "@/components/Subscribers/SubscriberPlans";


const SubscriberDetails = ()=>{
const plans = [
  {
    key: "1",
    name: "Basic Plan",
    ICCID: "8901410321114156104",
    dateAssigned: "2025-09-15",
    status: "Active"
  },
  {
    key: "2",
    name: "Premium Plan",
    ICCID: "8901410321114156105",
    dateAssigned: "2025-12-01",
    status: "Active"
  },
  {
    key: "3",
    name: "Family Plan",
    ICCID: "8901410321114156106",
    dateAssigned: "2024-06-10",
    status: "Expired"
  },
  {
    key: "4",
    name: "Student Plan",
    ICCID: "8901410321114156107",
    dateAssigned: "2025-05-20",
    status: "Active"
  },
  {
    key: "5",
    name: "Business Plan",
    ICCID: "8901410321114156108",
    dateAssigned: "2026-03-01",
    status: "Active"
  }
];

 const subscriberData = {
    name: "Nidal Nabi Chowdhury",
    country: "Bangladesh",
    countryCode: "BD",
    email: "nidalchy@gmail.com",
    phone: "+8801976358690",
    created: "2025-08-18",
    notes: ""
  };



    return <div>
         <Breadcrumb pageName="Subscriber Info" />
       {/* <SuscriberDashboard /> */}
       
       <SubscriberPlans data={plans}/>
    </div>
}

export default SubscriberDetails;