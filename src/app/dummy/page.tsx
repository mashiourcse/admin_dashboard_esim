import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { channeldata as channel_data } from "@/utils/data";
import axios from "@/api/axios";

export const metadata = {
  title: "Tables",
};

// Directly fetch data inside the component using async function
const TablesPage = async () => {
  let data = null;

  try {
    const response = await axios.get('/0.8/?results=10'); // Adjust endpoint as needed
    data = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <>
      <Breadcrumb pageName="Administrators" />

      <div className="space-y-10">
        {/* Display the data if available */}
        {data ? (
          <div>
            <h1>Fetched Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <div>No data available</div>
        )}
        
        {/* You can add other components below, like Tables and Skeletons */}
        <Suspense fallback={<div>Loading...</div>}>
          {/* Other Components */}
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
