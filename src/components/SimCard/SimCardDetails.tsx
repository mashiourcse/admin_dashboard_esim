"use client";

import React, { useState } from 'react';
import { Card, Button, Tag, Form, Input, Select, DatePicker, message } from 'antd';
import { 
  EditOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  GlobalOutlined, 
  CalendarOutlined,
  SaveOutlined,
  CloseOutlined
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

  name?: string;
  country?: string;
  countryCode?: string;
  email?: string;
  phone?: string;
  created?: string;
  notes?: string;
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
  const countryOptions = [
    { code: 'BD', name: 'Bangladesh' },
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
  ];

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

  return (
    <div className="flex items-center justify-center p-4">
      <Card 
        className="w-full max-w-xl shadow-lg rounded-lg"
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
          <div className="space-y-6">
            
            {/* ID Field */}
            <div className="flex items-start flex-col">
              <div className="w-1/4 text-sm font-medium text-gray-600 dark:text-white pt-2">Id</div>
              <div className="flex-1">
                {isEditing ? (
                  <Form.Item
                    name="id"
                    rules={[{ required: true, message: 'Please enter SimCard name' }]}
                    className="mb-0"
                  >
                    <Input placeholder="id" />
                  </Form.Item>
                ) : (
                  <div className="text-base text-gray-900 dark:text-white">{SimCard.id}</div>
                )}
              </div>
            </div>

                 {/* ID Field */}
            <div className="flex items-start flex-col">
              <div className="w-1/4 text-sm font-medium text-gray-600 dark:text-white pt-2">Iccid</div>
              <div className="flex-1">
                {isEditing ? (
                  <Form.Item
                    name="id"
                    rules={[{ required: true, message: 'Please enter SimCard name' }]}
                    className="mb-0"
                  >
                    <Input placeholder="iccid" />
                  </Form.Item>
                ) : (
                  <div className="text-base text-gray-900 dark:text-white">{SimCard.iccid}</div>
                )}
              </div>
            </div>

            
            {/* Name Field */}
            <div className="flex items-start flex-col">
              <div className="w-1/4 text-sm font-medium text-gray-600 dark:text-white pt-2">Assigned Subscriber</div>
              <div className="flex-1">
                {isEditing ? (
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter SimCard name' }]}
                    className="mb-0"
                  >
                    <Input placeholder="Change subscriber name" />
                  </Form.Item>
                ) : (
                  <div className="text-base text-gray-900 dark:text-white">{SimCard.subscriberName}</div>
                )}
              </div>
            </div>

            {/* Date Assigned Field */}
            <div className="flex items-start flex-col">
              <div className="w-1/4 text-sm font-medium text-gray-600 dark:text-white pt-2">Date Assigned</div>
              <div className="flex-1">
                {isEditing ? (
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter SimCard name' }]}
                    className="mb-0"
                  >
                    <Input placeholder="Date Assigned" />
                  </Form.Item>
                ) : (
                  <div className="text-base text-gray-900 dark:text-white">{SimCard.dateAssigned}</div>
                )}
              </div>
            </div>
            
            {/* Country Field */}
            <div className="flex items-start flex-col">
              <div className="w-1/4 text-sm font-medium text-gray-600 dark:text-white pt-2">eSIM Status</div>
              <div className="flex-1">
                {isEditing ? (
                  <Form.Item
                    name="countryCode"
                    rules={[{ required: true, message: 'Please select a country' }]}
                    className="mb-0"
                  >
                    <Select placeholder="Select country">
                      {countryOptions.map(country => (
                        <Option key={country.code} value={country.code}>
                          {country.name} ({country.code})
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : (
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <Tag icon={<GlobalOutlined />} color="blue">
                      {SimCard.country} ({SimCard.countryCode})
                    </Tag>
                  </div>
                )}
              </div>
            </div>
            
            {/* Email Field */}
            <div className="flex items-start">
              <div className="w-1/4 text-sm font-medium text-gray-600 dark:text-white pt-2">Email</div>
              <div className="flex-1">
                {isEditing ? (
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter email address' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                    className="mb-0"
                  >
                    <Input 
                      prefix={<MailOutlined className="text-gray-500 dark:text-white" />} 
                      placeholder="Enter email address" 
                    />
                  </Form.Item>
                ) : (
                  <div className="flex items-center">
                    <MailOutlined className="mr-2 text-gray-500 dark:text-white" />
                    <a href={`mailto:${SimCard.email}`} className="text-blue-500 hover:underline">
                      {SimCard.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Phone Field */}
            <div className="flex items-start">
              <div className="w-1/4 text-sm font-medium text-gray-600 dark:text-white pt-2">Phone</div>
              <div className="flex-1">
                {isEditing ? (
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                    className="mb-0"
                  >
                    <Input 
                      prefix={<PhoneOutlined className="text-gray-500 dark:text-white" />} 
                      placeholder="Enter phone number" 
                    />
                  </Form.Item>
                ) : (
                  <div className="flex items-center">
                    <PhoneOutlined className="mr-2 text-gray-500 dark:text-white" />
                    <a href={`tel:${SimCard.phone}`} className="text-gray-900 dark:text-white">
                      {SimCard.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Created Field */}
            <div className="flex items-start">
              <div className="w-1/4 text-sm font-medium text-gray-600 dark:text-white pt-2">Created</div>
              <div className="flex-1">
                {isEditing ? (
                  <Form.Item
                    name="created"
                    rules={[{ required: true, message: 'Please select creation date' }]}
                    className="mb-0"
                  >
                    <DatePicker 
                      className="w-full"
                      suffixIcon={<CalendarOutlined className="text-gray-500 dark:text-white" />}
                    />
                  </Form.Item>
                ) : (
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-gray-500 dark:text-white" />
                    <span className="text-gray-700 dark:text-white">{SimCard.created}</span>
                  </div>
                )}
              </div>
            </div>
            
        
          </div>
        </Form>
      </Card>
    </div>
  );
};
