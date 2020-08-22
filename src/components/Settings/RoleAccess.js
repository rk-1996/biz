import React from 'react';
import { Collapse, Checkbox, Divider } from "antd";

const { Panel } = Collapse;
const RoleAccess = () => {

  const genExtra = () => (
    <div className="flex-x align-center">
      <div className="gx-mr-4 gx-pr-1">
        View
      </div>
      <div>
        Manage
      </div>
   </div>
  );

  return (
    <div>
      <Collapse accordion bordered={false} className="app-collaps">
        <Panel
          header="Basic"
          extra={genExtra()}
        >
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">People</div>
            <div className="gx-mr-5">
              {/* <Checkbox/> */}
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
          <Divider className="gx-mt-1 gx-mb-1" />
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">Payroll</div>
            <div className="gx-mr-5">
              <Checkbox/>
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
          <Divider className="gx-mt-1 gx-mb-1" />
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">Schedule</div>
            <div className="gx-mr-5">
              <Checkbox/>
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
          <Divider className="gx-mt-1 gx-mb-1" />
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">Timesheet</div>
            <div className="gx-mr-5">
              {/* <Checkbox/> */}
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
        </Panel>

        {/* Manager */}
        <Panel
          header="Manager"
          extra={genExtra()}
        >
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">People</div>
            <div className="gx-mr-5">
              {/* <Checkbox/> */}
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
          <Divider className="gx-mt-1 gx-mb-1" />
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">Payroll</div>
            <div className="gx-mr-5">
              <Checkbox/>
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
          <Divider className="gx-mt-1 gx-mb-1" />
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">Schedule</div>
            <div className="gx-mr-5">
              <Checkbox/>
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
          <Divider className="gx-mt-1 gx-mb-1" />
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">Timesheet</div>
            <div className="gx-mr-5">
              {/* <Checkbox/> */}
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
        </Panel>

        {/* Owner */}

        <Panel
          header="Owner"
          extra={genExtra()}
        >
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">People</div>
            <div className="gx-mr-5">
              {/* <Checkbox/> */}
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
          <Divider className="gx-mt-1 gx-mb-1" />
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">Payroll</div>
            <div className="gx-mr-5">
              <Checkbox/>
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
          <Divider className="gx-mt-1 gx-mb-1" />
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">Schedule</div>
            <div className="gx-mr-5">
              <Checkbox/>
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
          <Divider className="gx-mt-1 gx-mb-1" />
          <div className="flex-x align-center gx-pt-2 gx-pb-2">
            <div className="flex-1">Timesheet</div>
            <div className="gx-mr-5">
              {/* <Checkbox/> */}
            </div>
            <div className="gx-mr-4">
              <Checkbox/>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default RoleAccess;
