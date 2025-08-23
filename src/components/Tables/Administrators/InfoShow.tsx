import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface UserData {
  key: string;
  name: string;
  email: string;
  //phone: string;
  role: string;
}

interface UserDataProps {
  userData: UserData;
}

const UserCard: React.FC<UserDataProps> = ({ userData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Show User Info
      </Button>
      <Modal
        title="User Information"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ marginBottom: '10px' }}>
          <strong>User Name:</strong> {userData.name}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Email Address:</strong> {userData.email}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Phone Number:</strong> {"+8801819351610"}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Role:</strong> {userData.role}
        </div>
        <Button onClick={handleCancel}>Close</Button>
      </Modal>
    </>
  );
};

export default UserCard;
        