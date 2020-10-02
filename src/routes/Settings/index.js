import React, { useState } from "react";
import { Breadcrumb, Icon, Tabs, Card } from "antd";
import {
  CompanyInfo,
  TimeSchedule,
  PayRoll,
  Notifications,
  JobTitleDepartMent,
  RoleAccess,
  Reports,
  ExternalAPI,
} from "components/Settings";

const TabPane = Tabs.TabPane;

const Settings = () => {
  const [formTab, setFormTab] = useState("1");

  const onChangeFormTab = (key) => {
    setFormTab(key);
  };

  return (
    <div>
      <div className="gx-mb-30">
        <Breadcrumb>
          <Breadcrumb.Item>
            <span className="gx-link">
              <Icon type="home" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              <span>Settings</span>
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card className="gx-card" title="Settings">
        <Tabs className='tab-modal-timesheet' activeKey={formTab} onChange={onChangeFormTab}>
          <TabPane tab="Company Info" key={1}>
            <CompanyInfo />
          </TabPane>
          <TabPane tab="Time & Schedule" key={2}>
            <TimeSchedule />
          </TabPane>
          <TabPane tab="Payroll" key={3}>
            <PayRoll />
          </TabPane>
          <TabPane tab="Notifications" key={4}>
            <Notifications />
          </TabPane>
          <TabPane tab="Job Titles &  Departments" key={5}>
            <JobTitleDepartMent />
          </TabPane>
          <TabPane tab="Role Access" key={6}>
            <RoleAccess />
          </TabPane>
          <TabPane tab="Reports" key={7}>
            <Reports />
          </TabPane>
          <TabPane tab="EXTERNAL API" key={8}>
            <ExternalAPI />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;
