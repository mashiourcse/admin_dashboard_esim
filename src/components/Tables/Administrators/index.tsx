"use client";
import axiosInstance from "@/api/axios";
import { formatDateInHumanReadable } from "@/lib/format-date-and-time";
import {
  CopyOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Table,
  theme,
} from "antd";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import AddCard from "./AddCard";
import Loading from "@/components/ui/Loading";

// Interface for user data
interface UserData {
  key: string;
  name: string;
  email: string;
  role: string;
  signupDate: string; // Optional signup date
  phoneNumber?: string; // Add optional phone number
}

interface UserColumn {
  title: string;
  dataIndex?: keyof UserData;
  key: string;
  render?: (value: any, record: UserData, index: number) => React.ReactNode;
}

interface ActionColumn extends Omit<UserColumn, "render"> {
  render: (_: any, record: UserData) => React.ReactNode;
}

const UsersTable: React.FC = () => {
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [antTheme, setAntTheme] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<UserData | null>(null);

  // New states for form editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);

  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
        const response = await axiosInstance.get("/user?results=10");
        console.log(response.data.data);

        const transformedData = response.data.data.map((item: any) => {

          return {
            _id: item.id,
            name: item.firstName + " " + item.lastName,
            email: item.email,
            // signupDate: formatDate(item.createdAt),
            role: item.role,
            createdAt: formatDateInHumanReadable(item.createdAt),
            // phoneNumber: item.phoneNumber,
          };
        });

        console.log(transformedData);

        setData(transformedData); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const data: UserData[] = [
  //   {
  //     key: '1',
  //     name: 'Mashior Rahman',
  //     email: 'mashior.csei.iuc@gmail.com',
  //     role: 'admin',
  //     phoneNumber: '0183423432432',
  //   },
  //   {
  //     key: '2',
  //     name: 'Nidal Chowdhury',
  //     email: 'nidal.chy1993@gmail.com',
  //     role: 'admin',
  //     phoneNumber: '0183423432432',
  //   },
  //   {
  //     key: '3',
  //     name: 'Sibel Gazozcu',
  //     email: 'sibel.gazozcu@telna.com',
  //     role: 'admin',
  //     phoneNumber: '0183423432432',
  //   },
  //   {
  //     key: '4',
  //     name: 'Ishaan Dutta',
  //     email: 'ishaan@telna.com',
  //     role: 'admin',
  //     phoneNumber: '0183423432432',
  //   },
  // ];

  const handleCopyEmail = (data: { email: string }) => {
    navigator.clipboard.writeText(data.email);
    message.success("Email copied!");
  };

  const handleInfoClick = (record: UserData) => {
    setModalData(record);
    setFormData(record); // Initialize form data with the record
    setIsEditing(false); // Start in view mode
    setIsModalVisible(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Implement your save logic here (e.g., API call)
    // For now, we'll just log the data and close
    console.log("Saving user data:", formData);
    setIsEditing(false);
    setIsModalVisible(false);
    message.success("User details updated successfully!");
  };

  const handleCancelClick = () => {
    // Revert form data and exit editing mode
    setFormData(modalData);
    setIsEditing(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    // Reset states on modal close
    setIsEditing(false);
    setFormData(null);
    setModalData(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? { ...prevData, [name]: value } : null,
    );
  };

  const columns: (UserColumn | ActionColumn)[] = [
    {
      title: "#",
      key: "#",
      render: (_: any, __: UserData, index: number) => {
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Admin Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Signup Date",
      dataIndex: "signupDate",
      key: "signupDate",
      render: (text: string) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: UserData) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<InfoCircleOutlined />}
            onClick={() => handleInfoClick(record)}
          />
          {/* <Button type="link" icon={<EditOutlined className="text-black dark:text-white" />} /> */}
          <Button
            type="link"
            icon={<DeleteOutlined className="text-red-500" />}
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
      <AddCard title="" />
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


      <Modal
        title="User Information"
        visible={isModalVisible}
        onOk={isEditing ? handleSaveClick : handleModalCancel}
        onCancel={handleModalCancel}
        footer={null}
      >
        {modalData && formData && (
          <Card
            title={
              <span style={{ fontWeight: "bold" }}>
                {isEditing ? "Edit User" : formData.name}
              </span>
            }
            bordered={true}
            style={{ width: "100%", borderRadius: "8px" }}
            bodyStyle={{ padding: "24px" }}
            actions={[
              <Row
                justify="space-between"
                style={{ padding: "0 16px" }}
                key={"action-row"}
              >
                {isEditing ? (
                  <>
                    <Button
                      key="cancel"
                      onClick={handleCancelClick}
                      style={{ borderRadius: "8px" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      key="save"
                      type="primary"
                      onClick={handleSaveClick}
                      style={{ borderRadius: "8px" }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      key="cancel"
                      onClick={handleModalCancel}
                      style={{ borderRadius: "8px" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      key="edit"
                      type="primary"
                      onClick={handleEditClick}
                      style={{ borderRadius: "8px" }}
                    >
                      Edit User
                    </Button>
                  </>
                )}
              </Row>,
            ]}
          >
            <Form layout="vertical">
              <Form.Item
                label={<span style={{ fontWeight: "bold" }}>User Name</span>}
              >
                <Input
                  name="name"
                  value={formData.name}
                  readOnly={!isEditing}
                  onChange={handleFormChange}
                  bordered={isEditing}
                  style={{ padding: isEditing ? "4px 11px" : 0 }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span style={{ fontWeight: "bold" }}>Email Address</span>
                }
              >
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <Input
                    name="email"
                    value={formData.email}
                    readOnly={!isEditing}
                    onChange={handleFormChange}
                    bordered={isEditing}
                    style={{ padding: isEditing ? "4px 11px" : 0 }}
                  />
                  {!isEditing && (
                    <Button
                      type="text"
                      icon={<CopyOutlined />}
                      onClick={() => handleCopyEmail({ email: formData.email })}
                      style={{ padding: 0 }}
                    />
                  )}
                </div>
              </Form.Item>
              <Form.Item
                label={<span style={{ fontWeight: "bold" }}>Phone Number</span>}
              >
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  readOnly={!isEditing}
                  onChange={handleFormChange}
                  bordered={isEditing}
                  style={{ padding: isEditing ? "4px 11px" : 0 }}
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ fontWeight: "bold" }}>Role</span>}
              >
                <Input
                  name="role"
                  value={formData.role}
                  readOnly={!isEditing}
                  onChange={handleFormChange}
                  bordered={isEditing}
                  style={{ padding: isEditing ? "4px 11px" : 0 }}
                />
              </Form.Item>
            </Form>
          </Card>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default UsersTable;
