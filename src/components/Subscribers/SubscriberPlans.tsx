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
  ICCID: string;
  planExpiry: string;
  status: string; // "Active" or "Expired"
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

const SubscriberPlans: React.FC<{ data: PlanData[] }> = ({ data }) => {
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
      title: "ICCID",
      dataIndex: "ICCID",
      key: "ICCID",
      render: (text: string) => <a>{text}</a>,
    },

    {
      title: "Plan Expiry",
      dataIndex: "planExpiry",
      key: "planExpiry",
      render: (text: string) => <a>{text}</a>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => <a>{text}</a>,
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
          {/* <Switch
            checked={record.status === "Active"}
            onChange={() => handleToggleStatus(record)}
            checkedChildren=""
            unCheckedChildren=""
          />
          <Button
            type="link"
            icon={<DeleteOutlined className="text-red-500" />}
            onClick={() => handleDeleteClick(record)}
          /> */}
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
                  value={formData.ICCID}
                  readOnly
                />
              </Form.Item>
              {/* <Form.Item label="Plan Type">
                <Input name="planType" value={formData.planExpiry} readOnly />
              </Form.Item> */}
              <Form.Item label="Destination">
                <Input
                  name="destination"
                  value={formData.status}
                  readOnly
                />
              </Form.Item>
              {/* <Form.Item label="Data/Validity">
                <Input
                  name="dataOrValidity"
                  value={formData.dataOrValidity}
                  readOnly
                />
              </Form.Item> */}
            </Form>
          </Card>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default SubscriberPlans;