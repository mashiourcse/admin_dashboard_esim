"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, ConfigProvider } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { theme } from 'antd';

import Link from 'next/link';
import { SimCardInfoCard } from './SimCardDetails';
import TabsLayout from './Simtabs';

// Interface for SimUser data
interface SimUserData {
  key: string;
  id: string;
  iccid: string;
  planName: string;
  status: string;
  
  data_size?: number;
  data_usage: number;

  validity: string;
  created: string;
  expiration: string;
}

// Columns definition for the SimUsers table
interface SimUserColumn {
  title: string;
  dataIndex?: keyof SimUserData;
  key: string;
  render?: (value: any, record: SimUserData, index: number) => React.ReactNode;
}

interface ActionColumn extends Omit<SimUserColumn, 'render'> {
  render: (_: any, record: SimUserData) => React.ReactNode;
}

const SimUserTable: React.FC = () => {
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [antTheme, setAntTheme] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(5); // Track page size

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

  // Sample data for SimUsers
  const data: SimUserData[] = [
{
    key: "1",
    id: "user001",
    iccid: "324324324324324",
    planName: "1 GB / 10 days",
    
    status: "Active",
    data_usage: 0.80,
    data_size: 1,
    validity: "30 days",
    created: "2023-08-01",
    expiration: "2023-08-31"
  },
  {
    key: "2",
    id: "user002",
    iccid: "324324324324324",
    planName: "Premium Plan",
    status: "Active",
    data_usage: 5.80,
    data_size: 3,
    validity: "60 days",
    created: "2023-07-01",
    expiration: "2023-08-30"
  },
  {
    key: "3",
    id: "user003",
    iccid: "324324324324324",
    planName: "Standard Plan",
    status: "Expired",
    data_usage: 8.80,
    data_size: 4,
    validity: "45 days",
    created: "2023-06-15",
    expiration: "2023-08-01"
  },
  {
    key: "4",
    id: "user004",
    iccid: "324324324324324",
    planName: "Basic Plan",
    status: "Active",
    data_usage: 9.80,
    data_size: 12,
    validity: "30 days",
    created: "2023-08-10",
    expiration: "2023-09-09"
  },
  {
    key: "5",
    id: "user005",
    iccid: "324324324324324",
    planName: "Unlimited Plan",
    status: "Active",
    data_usage: 1,
    data_size: 1,
    validity: "90 days",
    created: "2023-06-01",
    expiration: "2023-08-30"
  }
];



const columns: (SimUserColumn | ActionColumn)[] = [
  {
    title: '#',
    key: '#',
    render: (_: any, __: SimUserData, index: number) => {
      // Calculate the global index based on page and pageSize
      return (currentPage - 1) * pageSize + index + 1;
    },
  },
  
 
  {
    title: 'Plan name',
    dataIndex: 'planName',
    key: 'planName',
  },
   {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
        <Button className='rounded-full px-6 py-2 w-[90px]'>{status}</Button>

    )
  },
    {
    title: 'ICCID',
    dataIndex: 'id',  // Use `id` or another field if ICCID is present in your data
    key: 'ICCID',
    render: (id: string) => (
      <span>{id ? <Link href={`/inventory/sim-dashboard/${id}`}>{id}</Link> : "N/A"}</span>
    ),
  },
  {
    title: 'Data Usage',
    dataIndex: 'data_usage',
    key: 'data_usage',

    render: (usage: any, record: any)=> ( <div>
      <span>{`${usage} GB used / ${record.data_size} GB`}</span>
       <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${(usage / 15) * 100}%` }}
        />
      </div>
    </div>)
  },
  {
    title: 'Validity',
    dataIndex: 'validity',
    key: 'validity',
  },
  {
    title: 'Expiration',
    dataIndex: 'expiration',
    key: 'expiration',
  },

 
  {
    title: 'Date Created',
    dataIndex: 'created',
    key: 'created',
    render: (created: string) => <span>{new Date(created).toLocaleDateString()}</span>,
  },
 
  {
    title: 'Actions',
    key: 'actions',
    render: (_: any, record: SimUserData) => (
      <Space size="middle">
        <Button type="link" icon={<DeleteOutlined className='text-red-600' />}  disabled/>
      </Space>
    ),
  },
];

  if (!mounted) {
    return null;
  }




  return (
    <ConfigProvider theme={antTheme}>
       <TabsLayout />
    
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.length,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize || 5);
          },
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'],
        }}
      />
      {/* <Button type="primary" style={{ marginBottom: 16, alignItems: 'center' }}>
        Add New SimUser
      </Button> */}
    </ConfigProvider>
  );
};

export default SimUserTable;
