"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, ConfigProvider } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { theme } from 'antd';

// Interface for inventory data
interface InventoryData {
  key: string;
  iccid: string;
  activationCode: string;
  imsi: string;
  subscriberEmail: string;
  dateCreated: string;
  lastModified: string;
  status: string;
}



  // Columns definition for the inventory table
interface InventoryColumn {
    title: string;
    dataIndex?: keyof InventoryData;
    key: string;
    render?: (value: any, record: InventoryData, index: number) => React.ReactNode;
}

interface ActionColumn extends Omit<InventoryColumn, 'render'> {
    render: (_: any, record: InventoryData) => React.ReactNode;
}

const InventoryTable: React.FC = () => {
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

  // Sample data for the inventory
  const data: InventoryData[] = [
    {
      key: '1',
      iccid: '89014103211118522147',
      activationCode: 'ACT12345',
      imsi: '460020123456789',
      subscriberEmail: 'user1@example.com',
      dateCreated: '2023-01-15',
      lastModified: '2023-02-10',
      status: 'Active',
    },
    {
      key: '2',
      iccid: '89014103211118522148',
      activationCode: 'ACT12346',
      imsi: '460020123456790',
      subscriberEmail: 'user2@example.com',
      dateCreated: '2023-02-20',
      lastModified: '2023-03-05',
      status: 'Inactive',
    },
    {
      key: '3',
      iccid: '89014103211118522149',
      activationCode: 'ACT12347',
      imsi: '460020123456791',
      subscriberEmail: 'user3@example.com',
      dateCreated: '2023-03-10',
      lastModified: '2023-04-01',
      status: 'Active',
    },
    {
      key: '4',
      iccid: '89014103211118522150',
      activationCode: 'ACT12348',
      imsi: '460020123456792',
      subscriberEmail: 'user4@example.com',
      dateCreated: '2023-04-05',
      lastModified: '2023-05-01',
      status: 'Pending',
    },
    {
      key: '5',
      iccid: '89014103211118522151',
      activationCode: 'ACT12349',
      imsi: '460020123456793',
      subscriberEmail: 'user5@example.com',
      dateCreated: '2023-05-15',
      lastModified: '2023-06-10',
      status: 'Active',
    },
    {
      key: '1',
      iccid: '89014103211118522147',
      activationCode: 'ACT12345',
      imsi: '460020123456789',
      subscriberEmail: 'user1@example.com',
      dateCreated: '2023-01-15',
      lastModified: '2023-02-10',
      status: 'Active',
    },
    {
      key: '2',
      iccid: '89014103211118522148',
      activationCode: 'ACT12346',
      imsi: '460020123456790',
      subscriberEmail: 'user2@example.com',
      dateCreated: '2023-02-20',
      lastModified: '2023-03-05',
      status: 'Inactive',
    },
    {
      key: '3',
      iccid: '89014103211118522149',
      activationCode: 'ACT12347',
      imsi: '460020123456791',
      subscriberEmail: 'user3@example.com',
      dateCreated: '2023-03-10',
      lastModified: '2023-04-01',
      status: 'Active',
    },
    {
      key: '4',
      iccid: '89014103211118522150',
      activationCode: 'ACT12348',
      imsi: '460020123456792',
      subscriberEmail: 'user4@example.com',
      dateCreated: '2023-04-05',
      lastModified: '2023-05-01',
      status: 'Pending',
    },
    {
      key: '5',
      iccid: '89014103211118522151',
      activationCode: 'ACT12349',
      imsi: '460020123456793',
      subscriberEmail: 'user5@example.com',
      dateCreated: '2023-05-15',
      lastModified: '2023-06-10',
      status: 'Active',
    },
    {
      key: '1',
      iccid: '89014103211118522147',
      activationCode: 'ACT12345',
      imsi: '460020123456789',
      subscriberEmail: 'user1@example.com',
      dateCreated: '2023-01-15',
      lastModified: '2023-02-10',
      status: 'Active',
    },
    {
      key: '2',
      iccid: '89014103211118522148',
      activationCode: 'ACT12346',
      imsi: '460020123456790',
      subscriberEmail: 'user2@example.com',
      dateCreated: '2023-02-20',
      lastModified: '2023-03-05',
      status: 'Inactive',
    },
    {
      key: '3',
      iccid: '89014103211118522149',
      activationCode: 'ACT12347',
      imsi: '460020123456791',
      subscriberEmail: 'user3@example.com',
      dateCreated: '2023-03-10',
      lastModified: '2023-04-01',
      status: 'Active',
    },
    {
      key: '4',
      iccid: '89014103211118522150',
      activationCode: 'ACT12348',
      imsi: '460020123456792',
      subscriberEmail: 'user4@example.com',
      dateCreated: '2023-04-05',
      lastModified: '2023-05-01',
      status: 'Pending',
    },
    {
      key: '5',
      iccid: '89014103211118522151',
      activationCode: 'ACT12349',
      imsi: '460020123456793',
      subscriberEmail: 'user5@example.com',
      dateCreated: '2023-05-15',
      lastModified: '2023-06-10',
      status: 'Active',
    },
    {
      key: '1',
      iccid: '89014103211118522147',
      activationCode: 'ACT12345',
      imsi: '460020123456789',
      subscriberEmail: 'user1@example.com',
      dateCreated: '2023-01-15',
      lastModified: '2023-02-10',
      status: 'Active',
    },
    {
      key: '2',
      iccid: '89014103211118522148',
      activationCode: 'ACT12346',
      imsi: '460020123456790',
      subscriberEmail: 'user2@example.com',
      dateCreated: '2023-02-20',
      lastModified: '2023-03-05',
      status: 'Inactive',
    },
    {
      key: '3',
      iccid: '89014103211118522149',
      activationCode: 'ACT12347',
      imsi: '460020123456791',
      subscriberEmail: 'user3@example.com',
      dateCreated: '2023-03-10',
      lastModified: '2023-04-01',
      status: 'Active',
    },
    {
      key: '4',
      iccid: '89014103211118522150',
      activationCode: 'ACT12348',
      imsi: '460020123456792',
      subscriberEmail: 'user4@example.com',
      dateCreated: '2023-04-05',
      lastModified: '2023-05-01',
      status: 'Pending',
    },
    {
      key: '5',
      iccid: '89014103211118522151',
      activationCode: 'ACT12349',
      imsi: '460020123456793',
      subscriberEmail: 'user5@example.com',
      dateCreated: '2023-05-15',
      lastModified: '2023-06-10',
      status: 'Active',
    },
    {
      key: '1',
      iccid: '89014103211118522147',
      activationCode: 'ACT12345',
      imsi: '460020123456789',
      subscriberEmail: 'user1@example.com',
      dateCreated: '2023-01-15',
      lastModified: '2023-02-10',
      status: 'Active',
    },
    {
      key: '2',
      iccid: '89014103211118522148',
      activationCode: 'ACT12346',
      imsi: '460020123456790',
      subscriberEmail: 'user2@example.com',
      dateCreated: '2023-02-20',
      lastModified: '2023-03-05',
      status: 'Inactive',
    },
    {
      key: '3',
      iccid: '89014103211118522149',
      activationCode: 'ACT12347',
      imsi: '460020123456791',
      subscriberEmail: 'user3@example.com',
      dateCreated: '2023-03-10',
      lastModified: '2023-04-01',
      status: 'Active',
    },
    {
      key: '4',
      iccid: '89014103211118522150',
      activationCode: 'ACT12348',
      imsi: '460020123456792',
      subscriberEmail: 'user4@example.com',
      dateCreated: '2023-04-05',
      lastModified: '2023-05-01',
      status: 'Pending',
    },
    {
      key: '5',
      iccid: '89014103211118522151',
      activationCode: 'ACT12349',
      imsi: '460020123456793',
      subscriberEmail: 'user5@example.com',
      dateCreated: '2023-05-15',
      lastModified: '2023-06-10',
      status: 'Active',
    },
    {
      key: '1',
      iccid: '89014103211118522147',
      activationCode: 'ACT12345',
      imsi: '460020123456789',
      subscriberEmail: 'user1@example.com',
      dateCreated: '2023-01-15',
      lastModified: '2023-02-10',
      status: 'Active',
    },
    {
      key: '2',
      iccid: '89014103211118522148',
      activationCode: 'ACT12346',
      imsi: '460020123456790',
      subscriberEmail: 'user2@example.com',
      dateCreated: '2023-02-20',
      lastModified: '2023-03-05',
      status: 'Inactive',
    },
    {
      key: '3',
      iccid: '89014103211118522149',
      activationCode: 'ACT12347',
      imsi: '460020123456791',
      subscriberEmail: 'user3@example.com',
      dateCreated: '2023-03-10',
      lastModified: '2023-04-01',
      status: 'Active',
    },
    {
      key: '4',
      iccid: '89014103211118522150',
      activationCode: 'ACT12348',
      imsi: '460020123456792',
      subscriberEmail: 'user4@example.com',
      dateCreated: '2023-04-05',
      lastModified: '2023-05-01',
      status: 'Pending',
    },
    {
      key: '5',
      iccid: '89014103211118522151',
      activationCode: 'ACT12349',
      imsi: '460020123456793',
      subscriberEmail: 'user5@example.com',
      dateCreated: '2023-05-15',
      lastModified: '2023-06-10',
      status: 'Active',
    },
  ];



const columns: (InventoryColumn | ActionColumn)[] = [
    {
        title: '#',
        key: '#',
        render: (_: any, __: InventoryData, index: number) => {
            // Calculate the global index based on page and pageSize
            return (currentPage - 1) * pageSize + index + 1;
        },
    },
    {
        title: 'ICCID',
        dataIndex: 'iccid',
        key: 'iccid',
    },
    {
        title: 'Activation Code',
        dataIndex: 'activationCode',
        key: 'activationCode',
    },
    {
        title: 'IMSI',
        dataIndex: 'imsi',
        key: 'imsi',
    },
    {
        title: 'Subscriber Email',
        dataIndex: 'subscriberEmail',
        key: 'subscriberEmail',
    },
    {
        title: 'Date Created',
        dataIndex: 'dateCreated',
        key: 'dateCreated',
    },
    {
        title: 'Date Assigned',
        dataIndex: 'lastModified',
        key: 'lastModified',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => <span>{status}</span>,
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_: any, record: InventoryData) => (
            <Space size="middle">
                <Button type="link" icon={<InfoCircleOutlined />} />
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
        Add New Inventory
      </Button>
    </ConfigProvider>
  );
};

export default InventoryTable;
