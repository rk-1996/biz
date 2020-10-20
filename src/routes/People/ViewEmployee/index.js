import React, { useState, useEffect } from 'react';
import { Breadcrumb, Icon, Tabs, Card } from "antd";
import { connect } from "react-redux";
import {
  JobsAndPay,
  Personal,
  Document,
  Notes,
  TaxDetails
} from 'components/People/ViewEmployee'
import { getPeopleDetails } from 'services/people';
import AppLoader from './../../../components/Common/AppLoader';

const TabPane = Tabs.TabPane;

const ViewEmployee = (props) => {
  const [formTab, setFormTab] = useState("1");
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { match: { params }, authUser, jobs, departments, activeCompany } = props;
  console.log(employeeData)
  useEffect(() => {
    const getDetails = async () => {
      const obj = {
        id: params.id,
        type: 'employee'
      }
      setLoading(true);
      const result = await getPeopleDetails(authUser.tokens.accessToken, obj, activeCompany.company, activeCompany.location);
      if (result.status === 200) {
        setEmployeeData(result.data)
        setLoading(false);
      }
    }
    getDetails();
  }, [params, authUser]);

  const onChangeFormTab = (key) => {
    setFormTab(key);
  };

  const updateSavedObj = (data) => {
    console.log('data', data)
    setEmployeeData(data);
  }

  return (
    <div>
      <div className="gx-mb-30">
        <Breadcrumb>
          <Breadcrumb.Item>
            <span className="gx-link">
              <Icon type="home" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => props.history.push("/people")}>
            <span className="gx-link">
              <span>People</span>
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              <span>Employee Details</span>
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {loading && <AppLoader />}
      {
        employeeData &&
        <Card className="gx-card">
          <div className='align-center flex-x'>
            <div className='employee-details-profile-div'>
              <img className='border-radius-50' src={require("assets/images/avatar/domnic-harris.png")} />
            </div>
            <div>
              <div>
                <span>{employeeData.firstName + ' ' + employeeData.lastName}</span>
              </div>
              <div>

              </div>
            </div>
          </div>
          <Tabs className='tab-modal-timesheet' activeKey={formTab} onChange={onChangeFormTab}>
            <TabPane tab="Jobs & Pay" key={1}>
              <JobsAndPay
                employeeData={employeeData}
                updateSavedObj={updateSavedObj}
                jobs={jobs}
                departments={departments}
              />
            </TabPane>
            <TabPane tab="Personal" key={2}>
              <Personal
                employeeData={employeeData}
                updateSavedObj={updateSavedObj}
              />
            </TabPane>
            <TabPane tab="Tax Details" key={3}>
              <TaxDetails
                employeeData={employeeData}
                updateSavedObj={updateSavedObj}
              />
            </TabPane>
            <TabPane tab="Documents" key={4}>
              <Document />
            </TabPane>
            <TabPane tab="Notes" key={5}>
              <Notes actionType='employee' token={authUser.tokens} Data={employeeData} activeCompany={activeCompany} />
            </TabPane>
          </Tabs>
        </Card>
      }
    </div>
  );
};

const mapStateToProps = ({ auth, ...state }) => {
  const { authUser } = auth;
  return {
    authUser,
    jobs: state.common.jobs,
    departments: state.common.departments,
    activeCompany: state.common.activeCompany
  }
};
export default connect(mapStateToProps)(ViewEmployee);
