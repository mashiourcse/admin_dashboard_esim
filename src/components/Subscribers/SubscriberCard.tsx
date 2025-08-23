"use client";
import React, { useEffect, useState } from 'react';
import { Card, Typography, Space, Row, Col, theme, ConfigProvider } from 'antd';
import { useTheme } from 'next-themes';

const { Text } = Typography;

interface SubscriberData {
  key: string;
  subscriberName: string;
  emailId: string;
  noOfPlans: number;
  phone?: string;
  activePlans: number;
  dateCreated: string;
  status?: string;
}

const subscriberData: SubscriberData = {
  key: "1",
  subscriberName: 'John Doe',
  emailId: "mash@gmail.com",
  noOfPlans: 4,
  activePlans: 2,
  dateCreated: '2025-08-15',
  status: 'active'
};


const SuscriberDashboard: React.FC = () => {

const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [antTheme, setAntTheme] = useState<any>(null);

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

    return (
    <ConfigProvider theme={antTheme}> 
    <div style={{ padding: '20px' }}>
    
       <div className="p-8">
      
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            className=" py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"iccid"}
          >
            <Text className='mr-5 font-extrabold'>Subscriber Name: </Text>
            <Text>{subscriberData.subscriberName}</Text>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className="py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"activationCode"}
          >
            <strong className='mr-5'>Email: </strong>
            <Text>{subscriberData.emailId}</Text>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className="py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"imsi"}
          >
            <strong className='mr-5'>Date Created: </strong>
            <Text>{subscriberData.dateCreated}</Text>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className=" py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"subscriberName"}
          >
            <strong className='mr-5'>Active Plans: </strong>
            <Text>{subscriberData.activePlans}</Text>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className=" py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"subscriberName"}
          >
            <strong className='mr-5'>Total Plans: </strong>
            <Text>{subscriberData.activePlans}</Text>
          </Card>
        </Col>

        {/* <Col span={8}>
          <Card
            className="rounded-full py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"dateAssigned"}
          >
            <strong className='mr-5'>Date Assigned: </strong>
            <Text>{subscriberData.dateAssigned}</Text>
          </Card>
        </Col> */}

        <Col span={8}>
          <Card
            className={`py-4 px-6 border border-gray-300 w-full flex justify-between`}
            key={"status"}
          >
            <strong className='mr-5'>Status: </strong>
            <Text type={subscriberData.status === 'active' ? 'success' : 'danger'} 
             className={`${subscriberData.status === 'active' ? 'text-green-100' : 'text-red-100'}`}
            >{subscriberData.status}</Text>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
    </ConfigProvider>
  );
};

export default SuscriberDashboard;
