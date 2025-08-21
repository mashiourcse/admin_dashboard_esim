"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Button, Space, Segmented, ConfigProvider, Card } from "antd";
import { DownOutlined } from "@ant-design/icons";
import PlansTable from "."; // Import your PlansTable component
import { useTheme } from "next-themes";
import { theme } from 'antd';

const Wrapper = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("USA");
  const [selectedRegion, setSelectedRegion] = useState<string>("Global");
const [selectedStatus, setSelectedStatus] = useState<string>("All Plans");
const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [antTheme, setAntTheme] = useState<any>(null);

 useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (currentTheme === 'dark') {
        setAntTheme({
          token: {
            colorPrimary: '#1D1D1D',
            colorBgBase: '#020D1A',
            colorTextBase: '#FFFFFF',
          },
          algorithm: theme.darkAlgorithm,
        });
      } else {
        setAntTheme({
          token: {
            colorPrimary: '#1890ff',
            colorBgBase: '#FFFFFF',
            colorTextBase: '#000000',
          },
          algorithm: theme.defaultAlgorithm,
        });
      }
    }
  }, [currentTheme, mounted]);
  // Filter options for dropdown menus
  const countryMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setSelectedCountry("USA")}>
        USA
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setSelectedCountry("Canada")}>
        Canada
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setSelectedCountry("UK")}>
        UK
      </Menu.Item>
      <Menu.Item key="4" onClick={() => setSelectedCountry("Germany")}>
        Germany
      </Menu.Item>
    </Menu>
  );

  const regionMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setSelectedRegion("North America")}>
        North America
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setSelectedRegion("Europe")}>
        Europe
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setSelectedRegion("Asia")}>
        Asia
      </Menu.Item>
      <Menu.Item key="4" onClick={() => setSelectedRegion("Africa")}>
        Africa
      </Menu.Item>
    </Menu>
  );

  const statusMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setSelectedStatus("All Plans")} >
        All Plans
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setSelectedStatus("Active")} className="text-green-500">
        Active
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setSelectedStatus("Inactive")} className="text-red-500">
        Closed
      </Menu.Item>
    </Menu>
  );

  // Dropdown for filtering
  return (
    <div>
      <ConfigProvider theme={antTheme}>

      <Card>
        <Space direction="horizontal" size="large" style={{ marginBottom: "0px" }} className="flex justify-between">
        {/* Dropdown for Countries, Regions, Global */}
        <Segmented
        options={['Global', 'Countries', 'Regions']}
        defaultValue={selectedRegion}
        onChange={(value) => setSelectedRegion(value)}

        />

        {/* Dropdown for Plan Status */}
        <Dropdown overlay={statusMenu} trigger={["click"]} >
          <Button>
            {selectedStatus} <DownOutlined />
          </Button>
        </Dropdown>

        {/* Dropdown for Select Country */}
        {/* <Dropdown overlay={countryMenu} trigger={["click"]}>
          <Button>
            {selectedCountry} <DownOutlined />
          </Button>
        </Dropdown> */}
      </Space>
      </Card>

        </ConfigProvider>
      <br />
      {/* Plans Table */}
      <PlansTable />
    </div>
  );
};

export default Wrapper;
