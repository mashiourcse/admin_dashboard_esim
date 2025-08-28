"use client";

import { Card, Col, Row, Typography, Tabs, List, Radio } from "antd";
import Link from 'next/link';
import Image from 'next/image';
import { CheckIcon } from "@/assets/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Activation: React.FC = () => {
  return (
    <div className="p-4 min-h-screen">
      <Row gutter={[24, 24]}>
        {/* Left Column - QR Code and Manual Activation */}
        <Col xs={24} md={12}>
          {/* QR Code Card */}
          <Card 
            className="shadow-md rounded-lg mb-6"
            title={
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">QR Code</h2>
                <Link href="/iphone" className="text-blue-500 hover:underline">Email To User</Link>
              </div>
            }
          >
            <div className="flex justify-center p-4">
              <Image
                src="/images/qr/qr.png"
                alt="QR Code"
                width={200}
                height={200}
                className="border-2 border-gray-200 rounded"
              />
            </div>
          </Card>

          {/* Manual Activation Card */}
          <Card 
            className="shadow-md rounded-lg"
            title={
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Manual Activation</h2>
            }
          >
            <Tabs defaultActiveKey="ios" className="w-full">
              <TabPane tab="iPhone / iOS" key="ios">
                <div className="space-y-4">
                  <div>
                    <Title level={5} className="mb-1">Activation Code</Title>
                    <Text copyable className="bg-gray-100 p-2 rounded block font-mono dark:text-white dark:bg-black">
                      TM20250805175559CF1888EA
                    </Text>
                  </div>
                  <div>
                    <Title level={5} className="mb-1">SM-DP Address</Title>
                    <Text className="bg-gray-100 p-2 rounded block font-mono dark:text-white dark:bg-black">
                      consumer.e-sim.global
                    </Text>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Android" key="android">
                <div>
                  <Title level={5} className="mb-1">Activation Code</Title>
                  <Text copyable className="bg-gray-100 p-2 rounded block font-mono dark:text-white dark:bg-black">
                    LPA:15consumer.e-sim.globalSTX20250805175559CF1888EA
                  </Text>
                </div>
              </TabPane>
            </Tabs>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link 
                href="https://example.com/guide" 
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                Installing with Manual Activation Code
              </Link>
            </div>
          </Card>
        </Col>

        {/* Right Column - Instructions and Tips */}
        <Col xs={24} md={12}>
          {/* Activation Instructions Card */}
          <Card 
            className="shadow-md rounded-lg mb-6"
            title={
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Activation Instructions</h2>
            }
          >
            <div className="space-y-6">
              <div>
                <Title level={5} className="mb-2 dark:text-white">QR Code Installation</Title>
                

                <ol className="list-disc pl-5 space-y-2 text-gray-700 dark:text-white">
                    <li> <p> Scan the QR code with the Camera app.</p></li>
                    <li>Follow the prompts on screen to add a new Data Plan.</li>
                </ol>
              </div>
              
              <div>
                <Title level={5} className="mb-2 dark:text-white">Apple iOS Devices</Title>
                
                <ol className="list-disc pl-5 space-y-2 text-gray-700 dark:text-white">
                    <li>Once complete, go to Settings &gt; Cellular (Mobile or Mobile Service).</li>
                    <li>Select the new eSIM plan under Cellular Data Plans, and set Data Roaming to ON.</li>
                </ol>
              </div>
              
              <div>
                <Title level={5} className="mb-2 dark:text-white">Android Devices</Title>
                <Text className="text-gray-700 dark:text-white">
                  
                  
                </Text>
                <ol className="list-disc pl-5 space-y-2 text-gray-700 dark:text-white">
                    <li>Once complete, go to Settings &gt; Network and Internet.</li>
                    <li>Turn on Data Roaming. </li>
                    <li>Set the eSIM as the Mobile Data SIM.</li>
                </ol>
              </div>
            </div>
          </Card>

          {/* Tips & Reminders Card */}
          <Card 
            className="shadow-md rounded-lg"
            title={
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tips & Reminders</h2>
            }
          >
            <ol className="list-disc pl-5 space-y-2 text-gray-700 dark:text-white">
              <li>Set the eSIM plan as your cellular data plan when you arrive at your destination. Find this in Settings &gt; Cellular Data &gt; Cellular Data.</li>
              <li>Turn off Data Roaming on your main SIM card to avoid any unexpected charges.</li>
              <li>Turn on Low Data Mode (iOS) or Data Saver mode (Android) to conserve data.</li>
            </ol>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Activation;