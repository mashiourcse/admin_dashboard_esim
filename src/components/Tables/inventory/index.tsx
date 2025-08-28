"use client";
import axiosInstance from "@/api/axios";
import Loading from "@/components/ui/Loading";
import { formatDateInHumanReadable } from "@/lib/format-date-and-time";
import { handleCopyClipboard } from "@/lib/utils";
import { CopyOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Table,
  theme
} from "antd";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import HeaderCard from "./HeaderCard";
import Link from "next/link";

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

        // const baseUrl = 
        //   window.location.protocol +
        //   "//" +
        //   window.location.hostname +
        //   (window.location.port ? ":" + window.location.port : "");
        const baseUrl = 'my.oneworldgsm.com';

        const transformedData = response.data.data.map((item: any) => {
          return {
            _id: item._id,
            id: item.custom_id,
            iccid: item.iccid,
            sim_status: item.sim_status,
            created_date: item.created_date,
            modified_date: item.modified_date,
            // imsi:
            //   item.imsis?.map((imsiObj: any) => imsiObj.imsi).join(", ") ||
            //   null,
            imsi: item.mapped_imsi,
            createdAt: formatDateInHumanReadable(item.createdAt),
            updatedAt: formatDateInHumanReadable(item.updatedAt),
            dashboard_url: baseUrl + "/" + item.custom_id,
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
      title: "SL.NO",
      key: "#",
      render: (_: any, __: InventoryData, index: number) => {
        // Calculate the global index based on page and pageSize
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <span>{id ? id : "N/A"}</span>,
    },
    {
      title: "Subscriber",
      dataIndex: "subscriber",
      key: "subscriber",
      render: (subscriber: string) => (
        <span>{subscriber ? subscriber : "N/A"}</span>
      ),
    },
    {
      title: "ICCID",
      dataIndex: "iccid",
      key: "iccid",
      render: (iccid: string) => (
        <span>{iccid ? <Link href={`/inventory/sim-dashboard/${iccid}`}>{iccid}</Link> : "N/A"}</span>
      ),
    },
    // {
    //   title: "Activation Code",
    //   dataIndex: "activationCode",
    //   key: "activationCode",
    //   render: (activationCode: string) => (
    //     <span>{activationCode ? activationCode : "N/A"}</span>
    //   ),
    // },
    // {
    //   title: "IMSI",
    //   dataIndex: "imsi",
    //   key: "imsi",
    // },
    // dashboard_url

    // {
    //   title: "Date Created",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (createdAt: string) => (
    //     <div style={{ width: "125px" }} className="text-xs">
    //       {createdAt ? createdAt : "Not Assigned"}
    //     </div>
    //   ),
    // },
    {
      title: "Date Assigned",
      dataIndex: "lastModified",
      key: "lastModified",
      render: (lastModified: string) => (
        <span>{lastModified ? lastModified : "Not Assigned"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "sim_status",
      key: "sim_status",
      render: (status: string) => <div style={{ width: "70px" }}>{status}</div>,
    },
    {
      title: "Dashboard URL",
      dataIndex: "dashboard_url",
      key: "dashboard_url",
      render: (dashboard_url: string) => (
        <div className="flex items-center gap-1">
          <span>{dashboard_url ? dashboard_url : "Not Assigned"}</span>
          <Button
            type="text"
            icon={<CopyOutlined />}
            onClick={() => handleCopyClipboard({ text: dashboard_url })}
            style={{ padding: 0 }}
          />
        </div>
      ),
      // upore 1 jekane ase oikane dashboard_url bosaben, eita basically sim_id hobe
      // jeta sim dashboard page e pathano hobe
    },

    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_: any, record: InventoryData) => (
    //     <Space size="middle">
    //       <Button type="link" icon={<InfoCircleOutlined />} />
    //       <Button
    //         type="link"
    //         icon={<EditOutlined className="text-black dark:text-white" />}
    //       />
    //       <Button type="link" icon={<DeleteOutlined className="text-red" />} />
    //     </Space>
    //   ),
    // },
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