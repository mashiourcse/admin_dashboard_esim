import React, { useState } from 'react';
import { Dropdown, Menu, DatePicker, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const { RangePicker } = DatePicker;

const DateRangeDropdown: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('All');
  const [customRangeVisible, setCustomRangeVisible] = useState(false);
  const [dateRange, setDateRange] = useState<any>([]);

  const handleMenuClick = (e: any) => {
    setSelectedRange(e.key);
    if (e.key === 'Custom Range') {
      setCustomRangeVisible(true);
    } else {
      setCustomRangeVisible(false);
      // Handle logic for other ranges (e.g., Last 365 Days, Last Month, etc.)
    }
  };

  const handleRangeChange = (dates: any) => {
    if (dates) {
      setDateRange(dates);
    }
  };

  const handleApplyCustomRange = () => {
    if (dateRange.length === 2) {
      // Process the custom range selected
      console.log('Custom Range:', dateRange);
      setCustomRangeVisible(false);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Last 365 Days">Last 365 Days</Menu.Item>
      <Menu.Item key="Last Month">Last Month</Menu.Item>
      <Menu.Item key="Last Week">Last Week</Menu.Item>
      <Menu.Item key="Current Week">Current Week</Menu.Item>
      <Menu.Item key="Current Month">Current Month</Menu.Item>
      <Menu.Item key="Current Year">Current Year</Menu.Item>
      <Menu.Item key="Custom Range">Custom Range</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          {selectedRange} <DownOutlined />
        </Button>
      </Dropdown>

      {customRangeVisible && (
        <div style={{ marginTop: 10 }}>
          <RangePicker
            format="YYYY-MM-DD"
            value={dateRange}
            onChange={handleRangeChange}
          />
          <br />
          <Button
            type="primary"
            onClick={handleApplyCustomRange}
            style={{ marginTop: 10 }}
          >
            Apply Custom Range
          </Button>
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdown;
