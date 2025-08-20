"use client";
import axiosInstance from "@/api/axios";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Space, Table, theme } from "antd";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

// Interface for inventory data
interface InventoryData {
  key: string;
  iccid: string;
  activationCode: string;
  imsi: string;
  subscriberEmail: string;
  dateCreated: string;
  lastModified: string;
  sim_status: string;
}

// Columns definition for the inventory table
interface InventoryColumn {
  title: string;
  dataIndex?: keyof InventoryData;
  key: string;
  render?: (
    value: any,
    record: InventoryData,
    index: number,
  ) => React.ReactNode;
}

interface ActionColumn extends Omit<InventoryColumn, "render"> {
  render: (_: any, record: InventoryData) => React.ReactNode;
}

const InventoryTable: React.FC = () => {
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [antTheme, setAntTheme] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(5); // Track page size

  const [data, setData] = useState<InventoryData[]>([]); // State to store the inventory data
  const [loading, setLoading] = useState<boolean>(false); // Loading state for the API request

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (currentTheme === "dark") {
        setAntTheme({
          token: {
            colorPrimary: "#1D1D1D",
            colorBgBase: "#020D1A",
            colorTextBase: "#FFFFFF",
          },
          algorithm: theme.darkAlgorithm,
        });
      } else {
        setAntTheme({
          token: {
            colorPrimary: "#1890ff",
            colorBgBase: "#FFFFFF",
            colorTextBase: "#000000",
          },
          algorithm: theme.defaultAlgorithm,
        });
      }
    }
  }, [currentTheme, mounted]);

  // Fetch inventory data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/inventories?results=10");
        // console.log(response.data.data);
        
        setData(response.data.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching inventory data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sample data for the inventory
  // const data: InventoryData[] = [
  //   {
  //     key: "1",
  //     iccid: "89014103211118522147",
  //     activationCode: "ACT12345",
  //     imsi: "460020123456789",
  //     subscriberEmail: "user1@example.com",
  //     dateCreated: "2023-01-15",
  //     lastModified: "2023-02-10",
  //     status: "Active",
  //   },
  // ];

  const columns: (InventoryColumn | ActionColumn)[] = [
    {
      title: "#",
      key: "#",
      render: (_: any, __: InventoryData, index: number) => {
        // Calculate the global index based on page and pageSize
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "ICCID",
      dataIndex: "iccid",
      key: "iccid",
    },
    {
      title: "Activation Code",
      dataIndex: "activationCode",
      key: "activationCode",
    },
    {
      title: "IMSI",
      dataIndex: "imsi",
      key: "imsi",
    },
    {
      title: "Subscriber Email",
      dataIndex: "subscriberEmail",
      key: "subscriberEmail",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Date Assigned",
      dataIndex: "lastModified",
      key: "lastModified",
    },
    {
      title: "Status",
      dataIndex: "sim_status",
      key: "status",
      render: (status: string) => <span>{status}</span>,
    },
    {
      title: "Actions",
      key: "actions",
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
          pageSizeOptions: ["5", "10", "20"],
        }}
      />
      <Button type="primary" style={{ marginBottom: 16, alignItems: "center" }}>
        Add New Inventory
      </Button>
    </ConfigProvider>
  );
};

export default InventoryTable;