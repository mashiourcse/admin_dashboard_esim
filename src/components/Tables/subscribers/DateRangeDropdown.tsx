import { DownOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown } from "antd";
import React, { useState } from "react";

const { RangePicker } = DatePicker;

const DateRangeDropdown: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>("All");
  const [customRangeVisible, setCustomRangeVisible] = useState(false);
  const [dateRange, setDateRange] = useState<any>([]);

  const handleMenuClick = (e: any) => {
    setSelectedRange(e.key);
    if (e.key === "Custom Range") {
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
      console.log("Custom Range:", dateRange);
      setCustomRangeVisible(false);
    }
  };

  // const menu = (
  //   <Menu onClick={handleMenuClick}>
  //     <Menu.Item key="All">All</Menu.Item>
  //     <Menu.Item key="Last 365 Days">Last 365 Days</Menu.Item>
  //     <Menu.Item key="Last Month">Last Month</Menu.Item>
  //     <Menu.Item key="Last Week">Last Week</Menu.Item>
  //     <Menu.Item key="Current Week">Current Week</Menu.Item>
  //     <Menu.Item key="Current Month">Current Month</Menu.Item>
  //     <Menu.Item key="Current Year">Current Year</Menu.Item>
  //     <Menu.Item key="Custom Range">Custom Range</Menu.Item>
  //   </Menu>
  // );

  // ✅ New menu items
  const items = [
    { label: "All", key: "All" },
    { label: "Last 365 Days", key: "Last 365 Days" },
    { label: "Last Month", key: "Last Month" },
    { label: "Last Week", key: "Last Week" },
    { label: "Current Week", key: "Current Week" },
    { label: "Current Month", key: "Current Month" },
    { label: "Current Year", key: "Current Year" },
    { label: "Custom Range", key: "Custom Range" },
  ];

  return (
    <div>
      {/* <Dropdown overlay={menu} trigger={["click"]}> */}
      <Dropdown
        menu={{ items, onClick: handleMenuClick }} // ✅ use `menu` instead of `overlay`
        trigger={["click"]}
      >
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
