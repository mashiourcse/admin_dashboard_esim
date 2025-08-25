import React from 'react';
import { Tabs } from 'antd';
import { SimCardInfoCard } from './SimCardDetails';

const { TabPane } = Tabs;

const TabsLayout: React.FC = () => {
     const simCard = {
  key: "12345",
  id: "sim123",
  iccid: "8901410321867112345",
  subscriberName: "John Doe",
  dateAssigned: "2025-08-25",
  status: "Active",
  networkStatus: "Connected",
  
  name: "SIM-XYZ",
  country: "Bangladesh",
  countryCode: "+880",
  email: "john.doe@example.com",
  phone: "+8801234567890",
  created: "2025-08-15",
  notes: "This SIM card is used for testing."
};
  return (
    <Tabs defaultActiveKey="1" centered >
      <TabPane tab="Summary" key="1">
        <SimCardInfoCard SimCard={simCard}/>
      </TabPane>
      <TabPane tab="Activation" key="2">
        <p className='mb-6'>Activation</p>
       

      </TabPane>
      <TabPane tab="Data Usage Logs" key="3">
        <p className='mb-6'>Data Usage Logs</p>
       
      </TabPane>
    </Tabs>
  );
};

export default TabsLayout;
