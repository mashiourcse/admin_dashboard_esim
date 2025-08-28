"use client";

import React, { useState } from 'react';
import { Card, Button, Tag, Form, Input, Select, DatePicker, message, Switch, Space, Radio, RadioChangeEvent, Row, Col } from 'antd';
import { 
  EditOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  GlobalOutlined, 
  CalendarOutlined,
  SaveOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

interface SimCard {
  key?: string;
  
  id?: string;
  iccid?: string;
  subscriberName?: string;
  dateAssigned?: string;
  status?: string;
  networkStatus?: string;

  // discarded
  name?: string;
  country?: string;
  countryCode?: string;
  email?: string;
  phone?: string;
  created?: string;
  notes?: string;
}


interface DataUsage{
  key: string;
  usage: string;
  duration: string;
}

interface SimCardInfoCardProps {
  SimCard: SimCard;
  onSave?: (SimCard: SimCard) => void;
}

export const SimCardInfoCard: React.FC<SimCardInfoCardProps> = ({ SimCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Country options

  const handleEdit = () => {
    form.setFieldsValue({
      ...SimCard,
      created: dayjs(SimCard.created),
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
   
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

   const [checked, setChecked] = useState(false);

  const onChange = (checked: boolean) => {
    setChecked(checked);
    console.log(checked ? 'Enabled' : 'Suspended');
  };

  const [radio, setRadio] = useState<number>(2);

  const onChangeRadio =  (e: RadioChangeEvent) => {
    setRadio(e.target.value);
  };

  const dataUsage: DataUsage[] = [

    {
      key: "1",
      usage: "0.00 GiB",
      duration: "Last 30 Days"
    },
    {
      key: "2",
      usage: "0.00 GiB",
      duration: "Last 24 Hours"
    },
    {
      key: "3",
      usage: "0.00 GiB",
      duration: "Average per Day"
    }
  ];

  return (
    <div className="w-full max-w-screen-2xl flex px-2 py-6 gap-6">
      <Card 
        className="shadow-lg rounded-lg"
        title={
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">eSIM Details</h2>
            {!isEditing ? (
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                Edit 
              </Button>
            ) : (
              <div className="space-x-2">
                <Button 
                  icon={<CloseOutlined />} 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  icon={<SaveOutlined />} 
                  onClick={handleSave}
                  loading={loading}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={SimCard}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
  {/* ID Field */}
  <div className="flex items-start flex-col">
    <div className="w-full text-sm font-small text-gray-600 dark:text-white">ID</div>
    <div className="w-full  mt-2">
     <div className="text-base font-bold text-gray-900 dark:text-white">{SimCard.id}</div>
    </div>
  </div>

   {/* ICCID Field */}
  <div className="flex items-start flex-col">
    <div className="w-full text-sm font-small text-gray-600 dark:text-white">ICCID</div>
    <div className="w-full  mt-2">
     <div className="text-base font-bold text-gray-900 dark:text-white">{SimCard.iccid}</div>
    </div>
  </div>

  {/* Subscriber Name Field */}
  <div className="flex items-start flex-col">
    <div className="w-full text-sm font-small text-gray-600 dark:text-white">Assigned Subscriber</div>
    <div className="w-full  mt-2">
      {isEditing ? (
        <Form.Item
          name="subscriberName"
          rules={[{ required: true, message: 'Please enter the subscriber name' }]}
          className="mb-0"
        >
          <Input placeholder="Change subscriber name" />
        </Form.Item>
      ) : (
        <div className="text-base font-bold text-gray-900 dark:text-white">{SimCard.subscriberName}</div>
      )}
    </div>
  </div>

  {/* Date Assigned Field */}
  <div className="flex items-start flex-col">
    <div className="w-full text-sm font-small text-gray-600 dark:text-white">Date Assigned</div>
    <div className="w-full  mt-2">
     <div className="text-base font-bold text-gray-900 dark:text-white">{SimCard.dateAssigned}</div>
    </div>
  </div>

  {/* eSim Status */}
  <div className="flex items-start flex-col">
    <div className="w-full text-sm font-small text-gray-600 dark:text-white">eSim Status</div>
    <div className="w-full  mt-2">
     <div className="text-base font-bold text-gray-900 dark:text-white">

      {'Awaiting Activation'}
     </div>
        
      
    </div>
  </div>

  {/* Network Status */}
  <div className="flex items-start flex-col">
    <div className="w-full text-sm font-small text-gray-600 dark:text-white">Network Status</div>
    <div className="w-full mt-2">
      <Space >
        
        <Switch checked={checked} onChange={onChange} />
      <span className='font-bold'>{checked ? 'Enabled' : 'Suspended'}</span>
      </Space>
    </div>
  </div>
</div>

        </Form>
      </Card>

      <div className='w-full max-w-screen flex-1'>

      <div className='flex flex-col gap-6 '>
        <Card
      title={
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Network</h2>

          </div>
        }
      >
        <Radio.Group onChange={onChangeRadio} value={radio}>
      {
        1 && <Radio value={1} disabled>
         <span className='text-black dark:text-white'>Awaiting Network Connection</span>
      </Radio>
      }
     {
      0 &&  <Radio value={2}>
        <span>Connected</span>
      </Radio>
     }
     
    </Radio.Group>
    
      </Card>

      <Card  title={
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Data Usage</h2>

          </div>
        }>

        <Row gutter={16}>

          {
            dataUsage.map(item => (
               <Col span={8} key={item.key}>
            <Card  bordered={true}>
              <h1 className='text-3xl font-bold mb-2'> {item.usage}</h1>
              <p>{item.duration}</p>
            </Card>
          </Col>
            ))
          }
       
        </Row>

      </Card>
      </div>
      </div>
    </div>
  );
};
