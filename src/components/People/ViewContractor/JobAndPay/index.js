import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Switch, message } from "antd";
import ContractorDetail from "./ContractorDetail";
import Compensation from "./Compensation";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { getContractorCompesastion, updateCompansationDetail } from 'services/people';
import CircularProgress from "components/CircularProgress/index";
import moment from "moment";

const JobsAndPay = ({ contractorData, updateSavedObj, activeCompany, authUser, match, jobs, departments }) => {
  const { params } = match;

  const [compensation, setCompesastion] = useState(null)
  const [statusContractor, setStatusContractor] = useState()
  const [loaderChangeStatus, setLoaderChangeStatus] = useState(false)

  const getCompesastionDetails = async () => {
    try {
      const data = {
        company: activeCompany.company,
        location: activeCompany.location,
        empid: params.id
      }
      const result = await getContractorCompesastion(authUser.tokens.accessToken, data);
      if (result && result.status === 200) {
        setCompesastion(result.data);
        setStatusContractor(result.data[0].status)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getCompesastionDetails();
  }, [])


  const dismissEmployeeHandler = () => {

  }

  const toggleLocationStatus = async (e) => {
    try {
      setLoaderChangeStatus(true)
      const obj = {
        department: compensation[0].department,
        jobTitle: compensation[0].jobTitle,
        rate: compensation[0].rate ? Number(compensation[0].rate) : null,
        type: compensation[0].type,
        effectiveDate: moment(compensation[0].effectiveDate),
        reasonofChange: compensation[0].reasonofChange,
        status: e
      };
      if (obj.type === "fixed") {
        obj['rate'] = Number(compensation[0].rate);
      } else {
        obj['rate'] = Number(compensation[0].hourlyAmount);
        obj['defaultHours'] = Number(compensation[0].defaultHours);
      }
      console.log("obj", obj);
      const result = await updateCompansationDetail(authUser.tokens.accessToken, {
        ...obj,
        id: params.id,
        location: activeCompany.location,
        company: activeCompany.company,
        actionType: "contractor",
      });
      if (result.status === 200) {
        setLoaderChangeStatus(false)
        message.success('Status changed successfully..')
        setStatusContractor(e)
      } else {
        setLoaderChangeStatus(false)
        message.error('Something went wrong..')
      }
    } catch (error) {
      setLoaderChangeStatus(false)
      message.error(error)
    }
  }

  const updateCompensation = () => {
    getCompesastionDetails()
  }


  return (
    <div className="pos-relative">
      {
        compensation && compensation.map((c, i) => {
          return (
            <div className="company-level-container">
              {
                loaderChangeStatus ? <div className="gx-loader-view">
                  <CircularProgress />
                </div> : <>

                    <div className="flex-x align-center gx-pt-1 gx-pb-4">
                      <div>
                        <Switch checked={statusContractor} onChange={toggleLocationStatus} />
                      </div>
                      <div className="gx-ml-2">{c.locationName}</div>
                    </div>
                    <ContractorDetail compensation={c} />
                    {
                      compensation &&
                      <Compensation
                        compensation={c}
                        updateSavedObj={updateCompensation}
                        params={params}
                        token={authUser.tokens.accessToken}
                        jobs={jobs}
                        departments={departments}
                        activeCompany={activeCompany}
                        CompensationsList={contractorData.compensation}
                      />
                    }
                  </>
              }
            </div>
          )
        })
      }
      <div className="action-block">
        <div className="gx-fs-lg gx-pb-2">
          Actions
        </div>
        <div className="gx-mt-2">
          <div>
            <Button type="primary">Run Off-Cycle Payroll</Button>
          </div>
          <div>
            <Popconfirm placement="topLeft" title="Are you sure to dismiss?" onConfirm={dismissEmployeeHandler} okText="Yes" cancelText="No">
              <Button>Dismiss Contractor</Button>
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
  return { authUser, activeCompany }
};
export default connect(mapStateToProps)(withRouter(JobsAndPay));
