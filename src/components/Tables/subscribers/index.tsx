"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, ConfigProvider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { theme } from 'antd';

// Interface for subscriber data
interface SubscriberData {
  key: string;
  displayName: string;
  emailId: string;
  noOfPlans: number;
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
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
    },
     {
      key: '1',
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
    },
     {
      key: '1',
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
    },
     {
      key: '1',
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
    },
     {
      key: '1',
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
    },
     {
      key: '1',
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
    },
     {
      key: '1',
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
    },
     {
      key: '1',
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
    },
     {
      key: '1',
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
    },
     {
      key: '1',
      displayName: 'John Doe',
      emailId: 'johndoe@example.com',
      noOfPlans: 3,
      activePlans: 2,
      dateCreated: '2023-01-15',
    },
    {
      key: '2',
      displayName: 'Jane Smith',
      emailId: 'janesmith@example.com',
      noOfPlans: 2,
      activePlans: 1,
      dateCreated: '2023-02-20',
    },
    {
      key: '3',
      displayName: 'James Brown',
      emailId: 'jamesbrown@example.com',
      noOfPlans: 4,
      activePlans: 3,
      dateCreated: '2023-03-10',
    },
    {
      key: '4',
      displayName: 'Emily Davis',
      emailId: 'emilydavis@example.com',
      noOfPlans: 1,
      activePlans: 1,
      dateCreated: '2023-04-05',
    },
    {
      key: '5',
      displayName: 'Michael Wilson',
      emailId: 'michaelwilson@example.com',
      noOfPlans: 2,
      activePlans: 2,
      dateCreated: '2023-05-15',
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
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Email ID',
      dataIndex: 'emailId',
      key: 'emailId',
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
          <Button type="link" icon={<EditOutlined />} />
          <Button type="link" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider theme={antTheme}>
      <br />
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
      <Button type="primary" style={{ marginBottom: 16, alignItems: 'center' }}>
        Add New Subscriber
      </Button>
    </ConfigProvider>
  );
};

export default SubscribersTable;
