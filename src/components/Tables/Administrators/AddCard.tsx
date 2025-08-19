import { Button } from 'antd';
import React, { useState } from 'react';
import UserModal from './UserModal';

interface AddCardProps {
    title: string;
    
}

const AddCard: React.FC<AddCardProps> = ({
    title,
   
}) => {

      const [modalVisible, setModalVisible] = useState(false);
    
      const handleModalCancel = () => {
        setModalVisible(false);
      };
    
      const handleModalSubmit = (values: any) => {
        console.log('Form submitted with values:', values);
        setModalVisible(false);
      };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-row items-start justify-between dark:bg-[#122031]">
            <div>
                <h2 className='text-[20px] font-bold leading-[30px] text-dark dark:text-white'>Add Your Team</h2>
            <p>Add your team member to grant access to Connectivity Platform features</p>
            </div>
          <Button type="primary" 
    style={{ marginBottom: 0, marginTop: 16 }} 
    onClick={() => setModalVisible(true)}>
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