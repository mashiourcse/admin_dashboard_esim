"use client";
import React, { useEffect, useState } from 'react';
import { Card, Typography, Space, Row, Col, theme, ConfigProvider } from 'antd';
import { useTheme } from 'next-themes';

const { Text } = Typography;

interface SIMData {
  id: number;
  ICCID: string;
  activationCode: string;
  IMSI: string;
  subscriberName: string;
  dateAssigned: string;
  status: 'in-service' | 'pre-service';
}

const simData: SIMData = {
  id: 1,
  ICCID: '89014103211118568000',
  activationCode: 'A12345678',
  IMSI: '310150123456789',
  subscriberName: 'John Doe',
  dateAssigned: '2025-08-15',
  status: 'in-service',
};


const SimDashboard: React.FC = () => {

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
            className="rounded-full py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"iccid"}
          >
            <Text className='mr-5 font-extrabold'>ICCID: </Text>
            <Text>{simData.ICCID}</Text>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className="rounded-full py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"activationCode"}
          >
            <strong className='mr-5'>Activation Code: </strong>
            <Text>{simData.activationCode}</Text>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className="rounded-full py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"imsi"}
          >
            <strong className='mr-5'>IMSI: </strong>
            <Text>{simData.IMSI}</Text>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className="rounded-full py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"subscriberName"}
          >
            <strong className='mr-5'>Subscriber: </strong>
            <Text>{simData.subscriberName}</Text>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className="rounded-full py-4 px-6 border border-gray-300 w-full flex justify-between"
            key={"dateAssigned"}
          >
            <strong className='mr-5'>Date Assigned: </strong>
            <Text>{simData.dateAssigned}</Text>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className={`rounded-full py-4 px-6 border border-gray-300 w-full flex justify-between`}
            key={"status"}
          >
            <strong className='mr-5'>Status: </strong>
            <Text type={simData.status === 'in-service' ? 'success' : 'danger'} 
             className={`${simData.status === 'in-service' ? 'text-green-100' : 'text-red-100'}`}
            >{simData.status}</Text>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
    </ConfigProvider>
  );
};

export default SimDashboard;
