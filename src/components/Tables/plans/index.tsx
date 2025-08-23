"use client";

import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  message,
  Modal,
  Space,
  Switch,
  Table,
  theme,
} from "antd";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface PlanData {
  key: string;
  name: string;
  wholesalePrice?: string;
  retailPrice: string;
  planType?: string;
  destination: string;
  dataOrValidity: string;
  status: string; // "Active" or "De-activated"
}

interface PlanColumn {
  title: string;
  dataIndex?: keyof PlanData;
  key: string;
  render?: (value: any, record: PlanData, index: number) => React.ReactNode;
}

interface ActionColumn extends Omit<PlanColumn, "render"> {
  render: (_: any, record: PlanData) => React.ReactNode;
}

const PlansTable: React.FC<{ data: PlanData[] }> = ({ data }) => {
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [antTheme, setAntTheme] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<PlanData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PlanData | null>(null);

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

  // const data: PlanData[] = [
  //   {
  //     key: '1',
  //     planName: 'Basic Plan',
  //     sellingPrice: '$10',
  //     planType: 'Prepaid',
  //     destination: 'USA',
  //     dataOrValidity: '10GB / 30 Days',
  //     status: true,
  //   },
  //   {
  //     key: '2',
  //     planName: 'Premium Plan',
  //     sellingPrice: '$30',
  //     planType: 'Postpaid',
  //     destination: 'Canada',
  //     dataOrValidity: '30GB / 60 Days',
  //     status: false,
  //   },
  //   {
  //     key: '3',
  //     planName: 'Family Plan',
  //     sellingPrice: '$50',
  //     planType: 'Prepaid',
  //     destination: 'Europe',
  //     dataOrValidity: '100GB / 90 Days',
  //     status: true,
  //   },
  // ];

  const handleInfoClick = (record: PlanData) => {
    setModalData(record);
    setFormData(record); // Initialize form data with the record
    setIsEditing(false); // Start in view mode
    setIsModalVisible(true);
  };

  const handleToggleStatus = (record: PlanData) => {
    const updatedData = data.map((plan) =>
      plan.key === record.key ? { ...plan, status: !plan.status } : plan,
    );
    // Normally here, you would update state via API call
    message.success(`Plan ${record.status ? "Disabled" : "Enabled"}`);
  };

  const handleDeleteClick = (record: PlanData) => {
    // You would remove the plan from the data or send API request here
    message.success("Plan deleted");
  };

  const columns: (PlanColumn | ActionColumn)[] = [
    {
      title: "#",
      key: "#",
      render: (_: any, __: PlanData, index: number) => {
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Plan Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    
    {
      title: "WSP",
      dataIndex: "wholesalePrice",
      key: "wholesalePrice",
      render: (text: string) => <a>{(text)? text : "N/A"}</a>,
    },
    
    {
      title: "RSP",
      dataIndex: "retailPrice",
      key: "retailPrice",
    },
    
    // {
    //   title: "Plan Type",
    //   dataIndex: "planType",
    //   key: "planType",
    // },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      // render: (destinations: any[]) => (
      //   <>
      //     {/* {destinations.map((destination: string, index: number) => (
      //       // <p key={`${destination}-${Math.random()}`}>{destination}</p>
      //     ))} */}
      //   </>
      // ),
    },
    {
      title: "Data/Validity",
      dataIndex: "dataOrValidity",
      key: "dataOrValidity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: PlanData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<InfoCircleOutlined />}
            onClick={() => handleInfoClick(record)}
          />
          <Switch
            checked={record.status === "Active"}
            onChange={() => handleToggleStatus(record)}
            checkedChildren=""
            unCheckedChildren=""
          />
          <Button
            type="link"
            icon={<DeleteOutlined className="text-red-500" />}
            onClick={() => handleDeleteClick(record)}
          />
        </Space>
      ),
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider theme={antTheme}>
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

      <Modal
        title="Plan Information"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {modalData && formData && (
          <Card title="Plan Details" bordered={true} style={{ width: "100%" }}>
            <Form layout="vertical">
              <Form.Item label="Plan Name">
                <Input name="planName" value={formData.name} readOnly />
              </Form.Item>
              <Form.Item label="Selling Price">
                <Input
                  name="sellingPrice"
                  value={formData.retailPrice}
                  readOnly
                />
              </Form.Item>
              <Form.Item label="Plan Type">
                <Input name="planType" value={formData.planType} readOnly />
              </Form.Item>
              <Form.Item label="Destination">
                <Input
                  name="destination"
                  value={formData.destination}
                  readOnly
                />
              </Form.Item>
              <Form.Item label="Data/Validity">
                <Input
                  name="dataOrValidity"
                  value={formData.dataOrValidity}
                  readOnly
                />
              </Form.Item>
            </Form>
          </Card>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default PlansTable;