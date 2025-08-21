"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, ConfigProvider } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { theme } from 'antd';
import DateRangeDropdown from './DateRangeDropdown';

// Interface for subscriber data
interface SubscriberData {
  key: string;
  subscriberName: string;
  emailId: string;
  noOfPlans: number;
  phone: string;
  activePlans: number;
  dateCreated: string;
}

// Columns definition for the subscribers table
interface SubscriberColumn {
  title: string;
  dataIndex?: keyof SubscriberData;
  key: string;
  render?: (value: any, record: SubscriberData, index: number) => React.ReactNode;
}

interface ActionColumn extends Omit<SubscriberColumn, 'render'> {
  render: (_: any, record: SubscriberData) => React.ReactNode;
}

const SubscribersTable: React.FC = () => {
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

  // Sample data for subscribers
  const data: SubscriberData[] = [
  {
    key: '1',
    subscriberName: 'John Doe',
    emailId: 'johndoe@example.com',
    phone: '123-456-7890',
    noOfPlans: 3,
    activePlans: 2,
    dateCreated: '2023-01-15',
  },
  {
    key: '2',
    subscriberName: 'Jane Smith',
    emailId: 'janesmith@example.com',
    phone: '234-567-8901',
    noOfPlans: 2,
    activePlans: 1,
    dateCreated: '2022-12-05',
  },
  {
    key: '3',
    subscriberName: 'Alice Johnson',
    emailId: 'alicejohnson@example.com',
    phone: '345-678-9012',
    noOfPlans: 5,
    activePlans: 3,
    dateCreated: '2023-03-25',
  },
  {
    key: '4',
    subscriberName: 'Bob Brown',
    emailId: 'bobbrown@example.com',
    phone: '456-789-0123',
    noOfPlans: 4,
    activePlans: 2,
    dateCreated: '2021-07-18',
  },
  {
    key: '5',
    subscriberName: 'Charlie Davis',
    emailId: 'charliedavis@example.com',
    phone: '567-890-1234',
    noOfPlans: 3,
    activePlans: 3,
    dateCreated: '2023-05-02',
  },
  {
    key: '6',
    subscriberName: 'Diana Moore',
    emailId: 'dianamoore@example.com',
    phone: '678-901-2345',
    noOfPlans: 1,
    activePlans: 1,
    dateCreated: '2022-10-22',
  },
  {
    key: '7',
    subscriberName: 'Eve Wilson',
    emailId: 'evewilson@example.com',
    phone: '789-012-3456',
    noOfPlans: 2,
    activePlans: 1,
    dateCreated: '2021-12-14',
  },
  {
    key: '8',
    subscriberName: 'Frank Harris',
    emailId: 'frankharris@example.com',
    phone: '890-123-4567',
    noOfPlans: 3,
    activePlans: 1,
    dateCreated: '2020-09-10',
  },
  {
    key: '9',
    subscriberName: 'Grace Lewis',
    emailId: 'gracelewis@example.com',
    phone: '901-234-5678',
    noOfPlans: 5,
    activePlans: 4,
    dateCreated: '2023-02-28',
  },
  {
    key: '10',
    subscriberName: 'Henry Walker',
    emailId: 'henrywalker@example.com',
    phone: '012-345-6789',
    noOfPlans: 4,
    activePlans: 2,
    dateCreated: '2022-08-17',
  },
  {
    key: '11',
    subscriberName: 'Isla Martin',
    emailId: 'islamartin@example.com',
    phone: '123-456-7890',
    noOfPlans: 3,
    activePlans: 3,
    dateCreated: '2021-04-11',
  },
  {
    key: '12',
    subscriberName: 'Jack White',
    emailId: 'jackwhite@example.com',
    phone: '234-567-8901',
    noOfPlans: 2,
    activePlans: 1,
    dateCreated: '2023-06-30',
  },
  {
    key: '13',
    subscriberName: 'Kelly Scott',
    emailId: 'kellyscott@example.com',
    phone: '345-678-9012',
    noOfPlans: 1,
    activePlans: 1,
    dateCreated: '2022-03-19',
  },
  {
    key: '14',
    subscriberName: 'Liam Turner',
    emailId: 'liamturner@example.com',
    phone: '456-789-0123',
    noOfPlans: 4,
    activePlans: 2,
    dateCreated: '2023-01-07',
  },
  {
    key: '15',
    subscriberName: 'Mia Adams',
    emailId: 'miaadams@example.com',
    phone: '567-890-1234',
    noOfPlans: 3,
    activePlans: 1,
    dateCreated: '2020-11-25',
  },
  {
    key: '16',
    subscriberName: 'Noah Clark',
    emailId: 'noahclark@example.com',
    phone: '678-901-2345',
    noOfPlans: 2,
    activePlans: 2,
    dateCreated: '2021-12-09',
  },
  {
    key: '17',
    subscriberName: 'Olivia Young',
    emailId: 'oliviayoung@example.com',
    phone: '789-012-3456',
    noOfPlans: 3,
    activePlans: 3,
    dateCreated: '2022-07-12',
  },
  {
    key: '18',
    subscriberName: 'Paul Allen',
    emailId: 'paulallen@example.com',
    phone: '890-123-4567',
    noOfPlans: 4,
    activePlans: 2,
    dateCreated: '2020-06-03',
  },
  {
    key: '19',
    subscriberName: 'Quincy King',
    emailId: 'quincyking@example.com',
    phone: '901-234-5678',
    noOfPlans: 2,
    activePlans: 1,
    dateCreated: '2021-05-18',
  },
  {
    key: '20',
    subscriberName: 'Riley Carter',
    emailId: 'rileycarter@example.com',
    phone: '012-345-6789',
    noOfPlans: 3,
    activePlans: 1,
    dateCreated: '2023-04-25',
  },
];


  const columns: (SubscriberColumn | ActionColumn)[] = [
    {
      title: '#',
      key: '#',
      render: (_: any, __: SubscriberData, index: number) => {
        // Calculate the global index based on page and pageSize
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: 'Subscriber Name',
      dataIndex: 'subscriberName',
      key: 'subscriberName',
    },
    
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'No of Plans',
      dataIndex: 'noOfPlans',
      key: 'noOfPlans',
    },
    {
      title: 'Active Plans',
      dataIndex: 'activePlans',
      key: 'activePlans',
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: SubscriberData) => (
        <Space size="middle">
          <Button type="link" icon={<InfoCircleOutlined />} />
          {/* <Button type="link" icon={<EditOutlined />} />
          <Button type="link" icon={<DeleteOutlined />} /> */}
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
        Add New Subscriber
      </Button> */}
    </ConfigProvider>
  );
};

export default SubscribersTable;
