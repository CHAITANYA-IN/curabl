import React from 'react';
import { Divider, Descriptions, Card, Tabs, Collapse, List } from 'antd';
import { capitalize } from '../../../libs/utils'

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Meta } = Card;

function DoctorProfile({ data }) {

  return <Card
    title={<h1>Details</h1>}
  >
    <Meta description={data?.description} />
    <Tabs style={{ "margin-top": "10px" }} defaultActiveKey="1" type="card">
      <TabPane tab="Personal" key="1">
        <Divider plain orientation="left"><h3>Name</h3></Divider>
        <Descriptions bordered={true} style={{ marginTop: "5px", }}>
          <Descriptions.Item label="First Name" span={3}>
            {(data && data?.name && data?.name?.firstName) ? data.name.firstName : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Middle Name" span={3}>
            {(data && data?.name && data?.name?.middleName) ? data.name.middleName : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name" span={3}>
            {(data && data?.name && data?.name?.lastName) ? data.name.lastName : "Not Specified"}
          </Descriptions.Item>
        </Descriptions>
        <Divider plain orientation="left"><h3>Other</h3></Divider>
        <Descriptions bordered={true} style={{ marginTop: "5px", }}>
          <Descriptions.Item label="Designation" span={3}>
            {(data && data?.designation && data?.designation) ? data.designation : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Blood Group" span={3}>
            {(data && data?.bloodGroup && data?.bloodGroup) ? data.bloodGroup : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Date of Birth" span={3}>
            {data && data?.dob ? new Date(data?.dob).toLocaleDateString() : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Age" span={3}>
            {(data && data?.age && data?.age) ? data.age : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Gender" span={3}>
            {capitalize(data?.gender)}
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Contact" key="2">
        <Divider plain orientation="left"><h3>Address</h3></Divider>
        <Descriptions bordered={true} style={{ marginTop: "5px", }}>
          <Descriptions.Item label="House Number" span={3}>
            {(data && data?.address && data?.address?.houseNo) ? data.address.houseNo : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Street" span={3}>
            {(data && data?.address && data?.address?.street) ? data.address.street : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Landmark" span={3}>
            {(data && data?.address && data?.address?.landmark) ? data.address.landmark : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Area" span={3}>
            {(data && data?.address && data?.address?.area) ? data.address.area : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="State" span={3}>
            {(data && data?.address && data?.address?.state) ? data.address.state : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Country" span={3}>
            {(data && data?.address && data?.address?.country) ? data.address.country : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Postal code" span={3}>
            {(data && data?.address && data?.address?.postalCode) ? data.address.postalCode : "Not Specified"}
          </Descriptions.Item>
        </Descriptions>
        <Divider plain orientation="left"><h3>Other</h3></Divider>
        <Descriptions bordered={true} style={{ marginTop: "5px", }}>
          <Descriptions.Item label="Email" span={3}>
            {(data && data?.email && data?.email) ? data.email : "Not Specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Mobile Number" span={3}>
            {(data && data?.contactNo && data?.contactNo) ? data.contactNo : "Not Specified"}
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Professional" key="3">
        <Descriptions title={<h2><b>Experience: </b>{(data && data?.experience) ? data.experience : "Not Specified"} years</h2>}>
        </Descriptions>
        <Collapse>
          <Panel showArrow={false} header={"Disease"}>
            <List dataSource={data?.disease} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Services"}>
            <List dataSource={data?.services} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Specializations"}>
            <List dataSource={data?.specializations} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Memberships"}>
            <List dataSource={data?.memberships} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Education"}>
            <List dataSource={data?.education} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Registrations"}>
            <List dataSource={data?.registrations} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Awards and Recognitions"}>
            <List dataSource={data?.awardsAndRecognition} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
        </Collapse>
      </TabPane>
    </Tabs>
  </Card>;
}

export default DoctorProfile;
