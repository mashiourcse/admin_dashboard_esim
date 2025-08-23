"use client";
import axiosInstance from "@/api/axios";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Space, Table, theme } from "antd";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderCard from "./HeaderCard";
import Loading from "@/components/ui/Loading";

// Interface for inventory data
interface InventoryData {
  key: string;
  iccid: string;
  id?: string;
  activationCode: string;
  imsi: string;
  subscriber: string;
  dashboard_url?: string;
  createdAt: string;
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

        const transformedData = response.data.data.map((item: any) => {
          const formatDate = (dateStr: string) =>
            new Date(dateStr).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

          return {
            _id: item._id,
            iccid: item.iccid,
            sim_status: item.sim_status,
            created_date: item.created_date,
            modified_date: item.modified_date,
            // imsi:
            //   item.imsis?.map((imsiObj: any) => imsiObj.imsi).join(", ") ||
            //   null,
            imsi: item.mapped_imsi,
            createdAt: formatDate(item.createdAt),
            updatedAt: formatDate(item.updatedAt),
          };
        });

        setData(transformedData); // Set the fetched data to state
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
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <span>{(id)? id : "N/A"}</span>,
    },
    {
      title: "Activation Code",
      dataIndex: "activationCode",
      key: "activationCode",
      render: (activationCode: string) => <span>{(activationCode)? activationCode : "N/A"}</span>,
    },
    {
      title: "IMSI",
      dataIndex: "imsi",
      key: "imsi",
    },
   // dashboard_url
    {
      title: "Subscriber",
      dataIndex: "subscriber",
      key: "subscriber",
      render: (subscriber: string) => <span>{subscriber ? subscriber : "N/A"}</span>,
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => <div style={{width: "125px"}} className="text-xs">{createdAt ? createdAt : "Not Assigned"}</div>,
    },
    {
      title: "Date Assigned",
      dataIndex: "lastModified",
      key: "lastModified",
       render: (lastModified: string) => <span>{lastModified ? lastModified : "Not Assigned"}</span>,
    },
     {
      title: "Dashboard URL",
      dataIndex: "dashboard_url",
      key: "dashboard_url",
       render: (dashboard_url: string) => <Link href={`/inventory/sim-dashboard/${"1"}`}>{dashboard_url ? "Click here" : "Click here"}</Link>,
      // upore 1 jekane ase oikane dashboard_url bosaben, eita basically sim_id hobe
      // jeta sim dashboard page e pathano hobe
      },

    {
      title: "Status",
      dataIndex: "sim_status",
      key: "sim_status",
      render: (status: string) => <div style={{width: "70px"}}>{status}</div>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: InventoryData) => (
        <Space size="middle">
          <Button type="link" icon={<InfoCircleOutlined />} />
          <Button type="link" icon={<EditOutlined className="text-black dark:text-white" />} />
          <Button type="link" icon={<DeleteOutlined className="text-red" />} />
        </Space>
      ),
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider theme={antTheme}>
      <HeaderCard title="" />
      <br />
      {loading? <Loading/> : <Table
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
      />}
      {/* <Button type="primary" style={{ marginBottom: 16, alignItems: "center" }}>
        Add New Inventory
      </Button> */}
    </ConfigProvider>
  );
};

export default InventoryTable;
