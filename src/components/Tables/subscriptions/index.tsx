"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, ConfigProvider } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { theme } from 'antd';
import DateRangeDropdown from './DateRangeDropdown';

// Interface for Subscription data
interface SubscriptionData {
  key: string;
  emailId: string;
  planName: string;
  ICCID: string;
  WSP: number;
  RSP: number;
  dateCreated: string;
  expiryDate: string;
  Status: string;
}

// Columns definition for the Subscriptions table
interface SubscriptionColumn {
  title: string;
  dataIndex?: keyof SubscriptionData;
  key: string;
  render?: (value: any, record: SubscriptionData, index: number) => React.ReactNode;
}

interface ActionColumn extends Omit<SubscriptionColumn, 'render'> {
  render: (_: any, record: SubscriptionData) => React.ReactNode;
}

const SubscriptionTable: React.FC = () => {
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

  // Sample data for Subscriptions
  const data: SubscriptionData[] = [
  {
    key: '1',
    emailId: 'john.doe@example.com',
    planName: 'Basic Plan',
    ICCID: '8901410321112100503',
    WSP: 15.99,
    RSP: 20.99,
    dateCreated: '2023-01-15',
    expiryDate: '2024-01-15',
    Status: 'Active',
  },
  {
    key: '2',
    emailId: 'jane.smith@example.com',
    planName: 'Premium Plan',
    ICCID: '8901410321112100504',
    WSP: 25.99,
    RSP: 20.99,
    dateCreated: '2022-07-30',
    expiryDate: '2023-07-30',
    Status: 'Expired',
  },
  {
    key: '3',
    emailId: 'mike.jones@example.com',
    planName: 'Standard Plan',
    ICCID: '8901410321112100505',
    WSP: 19.99,
    RSP: 20.99,
    dateCreated: '2023-03-01',
    expiryDate: '2024-03-01',
    Status: 'Active',
  },
  {
    key: '4',
    emailId: 'lisa.white@example.com',
    planName: 'Family Plan',
    ICCID: '8901410321112100506',
    WSP: 35.99,
    RSP: 20.99,
    dateCreated: '2023-06-10',
    expiryDate: '2024-06-10',
    Status: 'Active',
  },
  {
    key: '5',
    emailId: 'robert.brown@example.com',
    planName: 'Student Plan',
    ICCID: '8901410321112100507',
    WSP: 10.99,
    RSP: 20.99,
    dateCreated: '2022-11-20',
    expiryDate: '2023-11-20',
    Status: 'Expired',
  },
  {
    key: '6',
    emailId: 'susan.green@example.com',
    planName: 'Business Plan',
    ICCID: '8901410321112100508',
    WSP: 49.99,
    RSP: 20.99,
    dateCreated: '2023-02-15',
    expiryDate: '2024-02-15',
    Status: 'Active',
  },
  {
    key: '7',
    emailId: 'david.miller@example.com',
    planName: 'Basic Plan',
    ICCID: '8901410321112100509',
    WSP: 12.99,
    RSP: 20.99,
    dateCreated: '2023-08-01',
    expiryDate: '2024-08-01',
    Status: 'Active',
  },
  {
    key: '8',
    emailId: 'emily.davis@example.com',
    planName: 'VIP Plan',
    ICCID: '8901410321112100510',
    WSP: 59.99,
    RSP: 20.99,
    dateCreated: '2022-12-05',
    expiryDate: '2023-12-05',
    Status: 'Expired',
  },
  {
    key: '9',
    emailId: 'william.clark@example.com',
    planName: 'Family Plan',
    ICCID: '8901410321112100511',
    WSP: 39.99,
    RSP: 20.99,
    dateCreated: '2023-04-10',
    expiryDate: '2024-04-10',
    Status: 'Active',
  },
  {
    key: '10',
    emailId: 'sophia.martin@example.com',
    planName: 'Premium Plan',
    ICCID: '8901410321112100512',
    WSP: 27.99,
    RSP: 20.99,
    dateCreated: '2023-07-21',
    expiryDate: '2024-07-21',
    Status: 'Active',
  },
];



  const columns: (SubscriptionColumn | ActionColumn)[] = [
    {
      title: '#',
      key: '#',
      render: (_: any, __: SubscriptionData, index: number) => {
        // Calculate the global index based on page and pageSize
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    
    {
      title: 'Email ID',
      dataIndex: 'emailId',
      key: 'emailId',
    },
    {
      title: 'Plan name',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: 'ICCID',
      dataIndex: 'ICCID',
      key: 'ICCID',
    },
    {
      title: 'WSP',
      dataIndex: 'WSP',
      key: 'WSP',
    },
    {
      title: 'RSP',
      dataIndex: 'RSP',
      key: 'RSP',
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: SubscriptionData) => (
        <Space size="middle">
          <Button type="link" icon={<InfoCircleOutlined />} />
        
        </Space>
      ),
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider theme={antTheme}>
      
      <DateRangeDropdown/>
      
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
        Add New Subscription
      </Button> */}
    </ConfigProvider>
  );
};

export default SubscriptionTable;
