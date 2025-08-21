import { Button } from 'antd';
import React, { useState } from 'react';


interface AddCardProps {
    title: string;
    
}

const HeaderCard: React.FC<AddCardProps> = ({
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
                <h2 className='text-[20px] font-bold leading-[30px] text-dark dark:text-white'>Inventory Management</h2>
            <p>Here's you can access all the information about the registered sims</p>
            </div>
          <Button type="primary" 
    style={{ marginBottom: 0, marginTop: 16 }} 
    onClick={() => setModalVisible(true)}>
        Upload Inventory
      </Button>
        
        </div>
    );
};

export default HeaderCard;