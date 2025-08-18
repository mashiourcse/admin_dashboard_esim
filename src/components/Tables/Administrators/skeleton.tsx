'use client';

import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Skeleton version of the UsersTable
const SkeletonUsersTable: React.FC = () => {
  // Columns definition for skeleton table
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: () => (
        <div style={{ width: '120px', height: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
      ),
    },
    {
      title: 'User Email ID',
      dataIndex: 'email',
      key: 'email',
      render: () => (
        <div style={{ width: '180px', height: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: () => (
        <div style={{ width: '80px', height: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#f0f0f0',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#f0f0f0',
              borderRadius: '50%',
            }}
          />
        </Space>
      ),
    },
  ];

  // Simulate 6 rows of skeleton
  const skeletonData = new Array(6).fill({});

  return (
    <>
      <Button type="primary" style={{ marginBottom: 16 }}>
        Add New User
      </Button>
      <Table
        columns={columns}
        dataSource={skeletonData}
        pagination={false}
        rowClassName="skeleton-row"
      />
    </>
  );
};

export default SkeletonUsersTable;
