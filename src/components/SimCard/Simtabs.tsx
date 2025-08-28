"use client";
import React, { useEffect, useState } from 'react';
import { ConfigProvider, Tabs, theme } from 'antd';
import { SimCardInfoCard } from './SimCardDetails';
import SimUserTable from './SimUserPlan';
import Activation  from './Activation';
import { useTheme } from 'next-themes';
import { DataUsage } from './DataUsage';

const { TabPane } = Tabs;

const TabsLayout: React.FC = () => {
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [antTheme, setAntTheme] = useState<any>(null);
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
useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (currentTheme === 'dark') {
        setAntTheme({
          token: {
            colorPrimary: '#1D1D1D',
            colorBgBase: '#020D1A',
            colorTextBase: '#FFFFFF',
          },
          algorithm: theme.darkAlgorithm,
        });
      } else {
        setAntTheme({
          token: {
            colorPrimary: '#1890ff',
            colorBgBase: '#FFFFFF',
            colorTextBase: '#000000',
          },
          algorithm: theme.defaultAlgorithm,
        });
      }
    }
  }, [currentTheme, mounted]);

   if (!mounted) {
    return null;
  }

  return (
     <ConfigProvider theme={antTheme}>
    <Tabs defaultActiveKey="1" centered >
      <TabPane tab="Summary" key="1">
        <SimCardInfoCard SimCard={simCard}/>
        <SimUserTable />
      </TabPane>
      <TabPane tab="Activation" key="2">
        <div>
          <Activation/>
        </div>
       

      </TabPane>
      <TabPane tab="Data Usage Logs" key="3">
        <DataUsage />
       
      </TabPane>
    </Tabs>
    </ConfigProvider>
  );
};

export default TabsLayout;
