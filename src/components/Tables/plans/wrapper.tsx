"use client";
import axiosInstance from "@/api/axios";
import { getCountriesNameByCodes } from "@/utils/countries";
import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Dropdown,
  Menu,
  Segmented,
  Space,
  theme,
} from "antd";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import PlansTable from "."; // Import your PlansTable component

const Wrapper = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("USA");
  const [selectedRegion, setSelectedRegion] = useState<string>("Global");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Plans");
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [antTheme, setAntTheme] = useState<any>(null);

  // Plan data
  const [data, setData] = useState<PlanData[]>([]); // State to store the plan data
  const [loading, setLoading] = useState<boolean>(false); // Loading state for the API request

  const [allPlans, setAllPlans] = useState<PlanData[]>([]);

  interface TimeAllowance {
    duration: number;
    unit: "SECOND" | "CALENDAR_MONTH";
  }

  function formatValidity(time: TimeAllowance) {
    switch (time.unit) {
      case "SECOND":
        return `${(time.duration / 86400).toFixed(0)} Days`; // convert seconds → days
      case "CALENDAR_MONTH":
        return `${time.duration} Month${time.duration > 1 ? "s" : ""}`; // months
      default:
        return `${time.duration} ${time.unit}`; // fallback
    }
  }

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
        console.log("Fetching plans data...");

        const response = await axiosInstance.get("/plans?results=10");
        // console.log(response.data.data);
        // const formattedData = response.data.data.map((plan: any) => ({
        //   ...plan,
        //   dataOrValidity: `${(plan.data_usage_allowance / 1024 ** 3).toFixed(0)} GB, ${formatValidity(plan.time_allowance)}`,
        //   // Format ISO dates to human-readable
        //   earliestActivation: new Date(
        //     plan.earliest_activation_date,
        //   ).toLocaleString(),
        //   latestActivation: new Date(
        //     plan.latest_available_date,
        //   ).toLocaleString(),
        //   createdDate: new Date(plan.created_date).toLocaleString(),
        //   modifiedDate: new Date(plan.modified_date).toLocaleString(),
        // }));

        const formattedData = response.data.data.map((plan: any) => {
          // const destinations = plan.supported_countries
          //   .map((isoCode: string) => countries.find((c) => c.iso3_code === isoCode))
          //   .filter(Boolean); // remove null/undefined if code not found
          // console.log(destinations);

          const destinations = getCountriesNameByCodes(
            plan.supported_countries,
          );
          return {
            ...plan,
            dataOrValidity: `${(plan.data_usage_allowance / 1024 ** 3).toFixed(0)} GB, ${formatValidity(plan.time_allowance)}`,
            earliestActivation: new Date(
              plan.earliest_activation_date,
            ).toLocaleString(),
            latestActivation: new Date(
              plan.latest_available_date,
            ).toLocaleString(),
            createdDate: new Date(plan.created_date).toLocaleString(),
            modifiedDate: new Date(plan.modified_date).toLocaleString(),
            destination: destinations,
          };
        });

        // store all data
        setAllPlans(formattedData);

        setData(formattedData); // initially show all
        // console.log(formattedData);
        // setData(response.data.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching plans data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add a useEffect that listens to selectedStatus:
  useEffect(() => {
    const filtered =
      selectedStatus === "All Plans"
        ? allPlans
        : allPlans.filter((plan) => plan.status === selectedStatus);

    // if (selectedStatus === "Active") {
    //   filtered = allPlans.filter((plan) => plan.status === "Active");
    // } else if (selectedStatus === "De-activated") {
    //   filtered = allPlans.filter((plan) => plan.status === "De-activated");
    // }

    setData(filtered);
  }, [selectedStatus, allPlans]);

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
      <Menu.Item key="1" onClick={() => setSelectedStatus("All Plans")}>
        All Plans
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => setSelectedStatus("Active")}
        className="text-green-500"
      >
        Active
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => setSelectedStatus("De-activated")}
        className="text-red-500"
      >
        De-activated
      </Menu.Item>
    </Menu>
  );

  // Interface for plan data
  interface PlanData {
    key: string;
    name: string;
    retailPrice: string;
    planType: string;
    destination: string;
    dataOrValidity: string;
    status: string; // "Active" or "De-activated"
  }
  // const data: PlanData[] = [
  //   {
  //     key: "1",
  //     planName: "Basic Plan 2",
  //     sellingPrice: "$10",
  //     planType: "Prepaid",
  //     destination: "USA",
  //     dataOrValidity: "10GB / 30 Days",
  //     status: true,
  //   },
  //   {
  //     key: "2",
  //     planName: "Premium Plan",
  //     sellingPrice: "$30",
  //     planType: "Postpaid",
  //     destination: "Canada",
  //     dataOrValidity: "30GB / 60 Days",
  //     status: false,
  //   },
  //   {
  //     key: "3",
  //     planName: "Family Plan",
  //     sellingPrice: "$50",
  //     planType: "Prepaid",
  //     destination: "Europe",
  //     dataOrValidity: "100GB / 90 Days",
  //     status: true,
  //   },
  // ];

  // Dropdown for filtering
  return (
    <div>
      <ConfigProvider theme={antTheme}>
        <Space
          direction="horizontal"
          size="large"
          style={{ marginBottom: "20px" }}
          className="flex justify-between"
        >
          {/* Dropdown for Countries, Regions, Global */}
          <Segmented
            options={["Global", "Countries", "Regions"]}
            defaultValue={selectedRegion}
            onChange={(value) => setSelectedRegion(value)}
          />

          {/* Dropdown for Plan Status */}
          <Dropdown overlay={statusMenu} trigger={["click"]}>
            <Button>
              {selectedStatus} <DownOutlined />
            </Button>
          </Dropdown>

        {/* Dropdown for Select Country */}
        <Dropdown overlay={countryMenu} trigger={["click"]}>
          <Button>
            {selectedCountry} <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
      </Card>

        </ConfigProvider>
      <br />
      {/* Plans Table */}
      <PlansTable data={data} />
    </div>
  );
};

export default Wrapper;