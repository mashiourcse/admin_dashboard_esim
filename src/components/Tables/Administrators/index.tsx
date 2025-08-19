"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, ConfigProvider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { theme } from 'antd'; // Import Ant Design theme module
import UserModal from './UserModal';
import AddCard from './AddCard';

// Interface for user data
interface UserData {
  key: string;
  name: string;
  email: string;
  role: string;
}

interface UserColumn{
   title: string;
      dataIndex?: keyof UserData;
      key: string;
      render?: (value: any, record: UserData, index: number) => React.ReactNode;
}

interface ActionColumn extends Omit<UserColumn, 'render'> {
    render: (_: any, record: UserData) => React.ReactNode;
}

const UsersTable: React.FC = () => {
  const { theme: currentTheme } = useTheme(); 
  const [mounted, setMounted] = useState(false); // Track if component has mounted
  const [antTheme, setAntTheme] = useState<any>(null); 
   const [currentPage, setCurrentPage] = useState(1); 
    const [pageSize, setPageSize] = useState(5); 

      
  useEffect(() => {
    setMounted(true); 
  }, []);

  // Effect to update the Ant Design theme when `currentTheme` changes
  useEffect(() => {
    if (mounted) {
      if (currentTheme === 'dark') {
        setAntTheme({
          token: {
            colorPrimary: '#1D1D1D', // Dark mode primary color
            colorBgBase: '#020D1A', // Background color for dark mode
            colorTextBase: '#FFFFFF', // Text color for dark mode
          },
          algorithm: theme.darkAlgorithm, // Use darkAlgorithm for dark mode
        });
      } else {
        setAntTheme({
          token: {
            colorPrimary: '#1890ff', // Light mode primary color
            colorBgBase: '#FFFFFF', // Background color for light mode
            colorTextBase: '#000000', // Text color for light mode
          },
          algorithm: theme.defaultAlgorithm, // Use defaultAlgorithm for light mode
        });
      }
    }
  }, [currentTheme, mounted]);
  // Sample data with type annotation
  const data: UserData[] = [
    {
      key: '1',
      name: 'Mashior Rahman',
      email: 'mashior.csei.iuc@gmail.com',
      role: 'admin',
    },
    {
      key: '2',
      name: 'Nidal Chowdhury',
      email: 'nidal.chy1993@gmail.com',
      role: 'admin',
    },
    {
      key: '3',
      name: 'Nidal Chowdhury',
      email: 'nidalchy@gmail.com',
      role: 'admin',
    },
    {
      key: '4',
      name: 'Sibel Gazozcu',
      email: 'sibel.gazozcu@telna.com',
      role: 'admin',
    },
    {
      key: '5',
      name: 'Ishaan Dutta',
      email: 'ishaan@telna.com',
      role: 'admin',
    },
    {
      key: '6',
      name: 'Falguni Jesrani',
      email: 'falguni.jesrani@telna.com',
      role: 'moderator',
    },

    {
      key: '7',
      name: 'Bijon Kumar Dey',
      email: 'bijon@gmail.com',
      role: 'admin',
    },

  ];

  // Columns definition with appropriate types
  const columns: (UserColumn | ActionColumn)[] = [
     {
        title: '#',
        key: '#',
        render: (_: any, __: UserData, index: number) => {
            // Calculate the global index based on page and pageSize
            return (currentPage - 1) * pageSize + index + 1;
        },
    },
    {
      title: 'Admin Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: UserData) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} />
          <Button type="link" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  if (!mounted) {
    return null; // Avoid rendering anything before the client side
  }

  return (
    <ConfigProvider theme={antTheme}> {/* Apply dynamic theme based on the currentTheme */}
    
    
    <AddCard title=''/>
      
      <Table columns={columns} dataSource={data} pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.length, 
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize || 5); 
          },
          showSizeChanger: true, 
          pageSizeOptions: ['5', '10', '20'],
        }} />
    
    
        

    </ConfigProvider>
  );
};

export default UsersTable;
