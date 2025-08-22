import axiosInstance from "@/api/axios";
import { Button } from "antd";
import React, { useState } from "react";
import UserModal from "./UserModal";

interface AddCardProps {
  title: string;
}

const AddCard: React.FC<AddCardProps> = ({ title }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = async (values: any) => {
    console.log("Form submitted with values:", values);
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      password: values.password,
      role: values.role,
      permission: values.permissions,
    };

    // console.log(userData);
    
    try {
      const res = await axiosInstance.post("/user/create", userData); // replace with your backend API URL
      console.log("User created successfully:", res.data);
      setModalVisible(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
    
  };

  return (
    <div className="flex flex-row items-start justify-between rounded-lg bg-white p-6 shadow-md dark:bg-[#122031]">
      <div>
        <h2 className="text-[20px] font-bold leading-[30px] text-dark dark:text-white">
          Add Your Team
        </h2>
        <p>
          Add your team member to grant access to Connectivity Platform features
        </p>
      </div>
      <Button
        type="primary"
        style={{ marginBottom: 0, marginTop: 16 }}
        onClick={() => setModalVisible(true)}
      >
        Add New Admin
      </Button>
      <UserModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default AddCard;
