import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Switch } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EmployeeMentDetail from "./EmployeeMentDetail";
import Compensation from "./Compensation";
import { getEmployeeCompesastion } from "services/people";

const JobsAndPay = ({
  activeCompany,
  employeeData,
  authUser,
  match,
  updateSavedObj,
  jobs,
  departments,
}) => {
  const { params } = match;
  const [compensation, setCompesastion] = useState(null);
  const dismissEmployeeHandler = () => {};

  const getCompesastionDetails = async () => {
    try {
      const data = {
        company: activeCompany.company,
        location: activeCompany.location,
        empid: params.id,
      };
      const result = await getEmployeeCompesastion(
        authUser.tokens.accessToken,
        data
      );
      if (result && result.status === 200) {
        setCompesastion(result.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCompesastionDetails();
  }, []);

  const toggleLocationStatus = (e) => {

  }

  const updateCompensation = () => {
    getCompesastionDetails()
  }

  return (
    <div className="pos-relative">
      {compensation &&
        compensation.map((c, i) => {
          return (
            <div className="company-level-container">
              <div className="flex-x align-center gx-pt-1 gx-pb-4">
                <div>
                  <Switch checked={c.status} onChange={toggleLocationStatus}/>
                </div>
                <div className="gx-ml-2">{c.locationName}</div>
              </div>

              <div key={i}>
                {/* Employee Details */}
                <EmployeeMentDetail
                  params={params}
                  token={authUser.tokens.accessToken}
                  employeeData={employeeData}
                  updateSavedObj={updateCompensation}
                  employment={c.employment}
                  activeCompany={activeCompany}
                />
                {/* Compensation */}
                <Compensation
                  params={params}
                  token={authUser.tokens.accessToken}
                  updateSavedObj={updateCompensation}
                  jobs={jobs}
                  departments={departments}
                  activeCompany={activeCompany}
                  compensation={c}
                />
              </div>
            </div>
          );
        })}
      <div className="action-block">
        <div className="gx-fs-lg gx-pb-2">Actions</div>
        <div className="gx-mt-2">
          <div>
            <Button type="primary">Run Off-Cycle Payroll</Button>
          </div>
          <div>
            <Popconfirm
              placement="topLeft"
              title="Are you sure to dismiss?"
              onConfirm={dismissEmployeeHandler}
              okText="Yes"
              cancelText="No"
            >
              <Button>Dismiss Employee</Button>
            </Popconfirm>
          </div>
          <div>
            <Button className="gx-mb-0">Set Company Permissions</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, common }) => {
  const { authUser } = auth;
  const { activeCompany } = common;
  return { authUser, activeCompany };
};
export default connect(mapStateToProps)(withRouter(JobsAndPay));
