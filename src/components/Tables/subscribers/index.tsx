"use client";
import axiosInstance from "@/api/axios";
import { formatDateInHumanReadable } from "@/lib/format-date-and-time";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space, Table, theme } from "antd";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import DateRangeDropdown from "./DateRangeDropdown";
import Link from "next/link";

// Interface for subscriber data
interface SubscriberData {
  key: string;
  id?: string;
  subscriber: string;
  email: string;
  noOfPlans: number;
  phone?: string;
  activePlans: number;
  createdAt: string;
}

// Columns definition for the subscribers table
interface SubscriberColumn {
  title: string;
  dataIndex?: keyof SubscriberData;
  key: string;
  render?: (
    value: any,
    record: SubscriberData,
    index: number,
  ) => React.ReactNode;
}

interface ActionColumn extends Omit<SubscriberColumn, "render"> {
  render: (_: any, record: SubscriberData) => React.ReactNode;
}

const SubscribersTable: React.FC = () => {
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [antTheme, setAntTheme] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(5); // Track page size

  const [data, setData] = useState<SubscriberData[]>([]); // State to store the subscriber data
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

  // Fetch subscriber data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/subscribers?results=10");
        // console.log(response.data.data);

        const transformedData = response.data.data.map((item: any) => {
          return {
            _id: item._id,
            id: item.custom_id,
            subscriber: item.first_name + " " + item.last_name,
            email: item.email,
            createdAt: formatDateInHumanReadable(item.createdAt),
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

  // Sample data for subscribers
  // const data: SubscriberData[] = [
  //   {
  //     key: "1",
  //     subscriberName: "John Doe",
  //     emailId: "johndoe@example.com",
  //     phone: "123-456-7890",
  //     noOfPlans: 3,
  //     activePlans: 2,
  //     dateCreated: "2023-01-15",
  //   },
  //   {
  //     key: "2",
  //     subscriberName: "Jane Smith",
  //     emailId: "janesmith@example.com",
  //     phone: "234-567-8901",
  //     noOfPlans: 2,
  //     activePlans: 1,
  //     dateCreated: "2022-12-05",
  //   },
  // ];

  const columns: (SubscriberColumn | ActionColumn)[] = [
    {
      title: "SL.NO",
      key: "#",
      render: (_: any, __: SubscriberData, index: number) => {
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
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    // {
    //   title: 'Phone',
    //   dataIndex: 'phone',
    //   key: 'phone',
    // },
    {
      title: "No of Plans",
      dataIndex: "noOfPlans",
      key: "noOfPlans",
    },
    {
      title: "Active Plans",
      dataIndex: "activePlans",
      key: "activePlans",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SubscriberData) => (
        <Space size="middle">
          <Link type="link" href="/subscribers/1"  >
          <InfoCircleOutlined />
          </Link>
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
      <DateRangeDropdown />

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
      {/* <Button type="primary" style={{ marginBottom: 16, alignItems: 'center' }}>
        Add New Subscriber
      </Button> */}
    </ConfigProvider>
  );
};

export default SubscribersTable;
