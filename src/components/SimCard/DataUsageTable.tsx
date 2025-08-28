"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, ConfigProvider, Card } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { theme } from 'antd';

import Link from 'next/link';
import { SimCardInfoCard } from './SimCardDetails';
import TabsLayout from './Simtabs';

// Interface for DataUsage data
interface DataUsageData {

  key: string;
  iccid: string;
  connect_time: string;
  close_time: string;
  data_mb: string;
  country: string;
 
}

// Columns definition for the DataUsages table
interface DataUsageColumn {
  title: string;
  dataIndex?: keyof DataUsageData;
  key: string;
  render?: (value: any, record: DataUsageData, index: number) => React.ReactNode;
}

interface ActionColumn extends Omit<DataUsageColumn, 'render'> {
  render: (_: any, record: DataUsageData) => React.ReactNode;
}

const DataUsageTable: React.FC = () => {
  
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(5); // Track page size

  
  // Sample data for DataUsages
  const data: DataUsageData[] = [
  {
    key: "b00e70a1",
    iccid: "8901296601255485873",
    connect_time: "2024-06-30 05:33:50",
    close_time: "2023-07-04 07:34:36",
    data_mb: "4054.40",
    country: "Brazil",
  },
  {
    key: "38629c31",
    iccid: "8901472568484487633",
    connect_time: "2024-09-22 03:44:45",
    close_time: "2024-08-11 17:48:06",
    data_mb: "4439.81",
    country: "USA",
  },
  {
    key: "63805d4f",
    iccid: "8901623321028137554",
    connect_time: "2023-11-05 05:06:25",
    close_time: "2024-01-28 05:35:45",
    data_mb: "594.61",
    country: "Brazil",
  },
  {
    key: "8386b7c1",
    iccid: "8901688750849912428",
    connect_time: "2023-05-28 15:55:14",
    close_time: "2023-12-24 16:29:05",
    data_mb: "439.18",
    country: "Canada",
  },
  {
    key: "88028108",
    iccid: "8901848671047654144",
    connect_time: "2024-03-04 00:06:40",
    close_time: "2024-04-23 07:20:58",
    data_mb: "420.06",
    country: "Germany",
  },
  {
    key: "bb8b129a",
    iccid: "8901674922810558743",
    connect_time: "2023-08-11 12:44:19",
    close_time: "2024-02-07 10:16:50",
    data_mb: "1733.92",
    country: "Australia",
  },
  {
    key: "c9915d92",
    iccid: "8901900466217729942",
    connect_time: "2023-04-21 15:13:01",
    close_time: "2023-12-19 09:46:38",
    data_mb: "247.35",
    country: "India",
  },
  {
    key: "d8c1a77f",
    iccid: "8901460039281155394",
    connect_time: "2024-07-03 04:38:15",
    close_time: "2024-08-14 11:22:07",
    data_mb: "3281.55",
    country: "France",
  },
  {
    key: "ee09c1f3",
    iccid: "8901215024788996047",
    connect_time: "2023-09-17 08:10:55",
    close_time: "2024-01-09 23:51:02",
    data_mb: "881.74",
    country: "Japan",
  },
  {
    key: "fa71e309",
    iccid: "8901855473910234429",
    connect_time: "2024-05-06 19:27:42",
    close_time: "2024-12-25 14:18:33",
    data_mb: "129.47",
    country: "UK",
  },
];




const columns: (DataUsageColumn | ActionColumn)[] = [
  {
    title: '#',
    key: '#',
    render: (_: any, __: DataUsageData, index: number) => {
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
    title: 'Connect Time',
    dataIndex: 'connect_time',
    key: 'connect_time',
    render: (connect_time: string) => (
        <span>{connect_time}</span>

    )
  },
    {
    title: 'Close Time',
    dataIndex: 'close_time',  // Use `id` or another field if id is present in your data
    key: 'close_time',
    render: (close_time: string) => (
      <span>{close_time}</span>
    ),
  },

  {
    title: 'Data(MB)',
    dataIndex: 'data_mb',  // Use `id` or another field if id is present in your data
    key: 'data_mb',
    render: (data_mb: string) => (
      <span>{data_mb}</span>
    ),
  },

  {
    title: 'Country',
    dataIndex: 'country',  // Use `id` or another field if id is present in your data
    key: 'country',
    render: (country: string) => (
      <span>{country}</span>
    ),
  },
 
  {
    title: 'Actions',
    key: 'actions',
    render: (_: any, record: DataUsageData) => (
      <Space size="middle">
        <Button type="link" icon={<DeleteOutlined className='text-red-600' />}  disabled/>
      </Space>
    ),
  },
];

 




  return (
   
      
    <>
   <Card 
    title={
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Data Usage Logs</h2>
            }
   
   >
        <div className='mb-6'>
            <Button>Copy</Button><Button>Excel</Button><Button>CSV</Button><Button>PDF</Button>
        </div>
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
   </Card>
      {/* <Button type="primary" style={{ marginBottom: 16, alignItems: 'center' }}>
        Add New DataUsage
      </Button> */}
    </>
  );
};

export default DataUsageTable;
