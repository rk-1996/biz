import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Switch, message } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EmployeeMentDetail from "./EmployeeMentDetail";
import Compensation from "./Compensation";
import moment from "moment";
import { getEmployeeCompesastion, getCompansationHistory, updateCompansationDetail, editCompanyStatusForEmployee } from "services/people";
import CircularProgress from "components/CircularProgress/index";

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
  const dismissEmployeeHandler = () => { };
  const [statusCompany, setStatusCompany] = useState()
  const [loaderChangeStatus, setLoaderChangeStatus] = useState(false)
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
        setStatusCompany(result.data[0].status)
      }
    } catch (error) { }
  };

  useEffect(() => {
    getCompesastionDetails();
  }, []);

  const toggleLocationStatus = async (e) => {
    try {
      setLoaderChangeStatus(true)
      console.log(compensation)
      const obj = {
        jobTitle: compensation[0].jobTitle,
        department: compensation[0].department,
        type: compensation[0].type,
        rate: compensation[0].rate,
        per: compensation[0].per,
        effectiveDate: moment(compensation[0].effectiveDate),
        defaultHours: compensation[0].defaultHours,
        reasonofChange: compensation[0].reasonofChange,
        status: e
      };
      const resultUpdateStatus = await updateCompansationDetail(authUser.tokens.accessToken, {
        ...obj,
        id: params.id,
        location: activeCompany.location,
        company: activeCompany.company,
        actionType: "employee",
      });
      if (resultUpdateStatus.status === 200) {
        setLoaderChangeStatus(false)
        message.success("Status changed successfully..")
        setStatusCompany(e)
      } else {
        setLoaderChangeStatus(false)

        message.error("Something went wrong..")
      }
    } catch (error) {
      setLoaderChangeStatus(false)

      message.error(error)
    }

    console.log(e)
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
              {
                loaderChangeStatus ? <div className="gx-loader-view">
                  <CircularProgress />
                </div> :
                  <>

                    <div className="flex-x align-center gx-pt-1 gx-pb-4">
                      <div>
                        <Switch checked={statusCompany} onChange={toggleLocationStatus} />
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
                  </>
              }
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
