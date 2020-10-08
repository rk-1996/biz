import React, { useState, useEffect } from 'react';
import { Breadcrumb, Icon, Tabs, Card } from "antd";
import { connect } from "react-redux";
import {
  JobsAndPay,
  Personal,
} from './../../../components/People/ViewContractor';
import {
  Document,
  Notes
} from './../../../components/People/ViewEmployee';
import { getPeopleDetails } from 'services/people';
import AppLoader from 'components/Common/AppLoader';
const TabPane = Tabs.TabPane;

const ViewContrator = (props) => {
  const [formTab, setFormTab] = useState("1");
  const [contractorData, setContractorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { match: { params }, authUser, jobs, departments, activeCompany } = props;

  useEffect(() => {
    const getDetails = async () => {
      const obj = {
        id: params.id,
        type: 'contractor'
      }
      setLoading(true);
      const result = await getPeopleDetails(authUser.tokens.accessToken, obj, activeCompany.company, activeCompany.location);
      if (result.status === 200) {
        setContractorData(result.data)
        setLoading(false);
      }
    }
    getDetails();
  }, [params, authUser]);

  const onChangeFormTab = (key) => {
    setFormTab(key);
  };

  const updateSavedObj = (data) => {
    setContractorData(data);
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
              <span>Contractor Details</span>
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {loading && <AppLoader />}
      {
        contractorData &&
        <Card className="gx-card">
          <div className='align-center flex-x'>
            <div className='employee-details-profile-div'>
              <img className='border-radius-50' src={require("assets/images/avatar/domnic-harris.png")} />
            </div>
            <div>
              <div>
                <span>{contractorData.firstName + ' ' + contractorData.lastName}</span>
              </div>
              <div>

              </div>
            </div>
          </div>
          <Tabs activeKey={formTab} onChange={onChangeFormTab}>
            <TabPane tab="Jobs & Pay" key={1}>
              <JobsAndPay
                contractorData={contractorData}
                updateSavedObj={updateSavedObj}
                jobs={jobs}
                departments={departments}
              />
            </TabPane>
            <TabPane tab="Contractor" key={2} >
              <Personal
                contractorData={contractorData}
                updateSavedObj={updateSavedObj}
              />
            </TabPane>
            <TabPane tab="Documents" key={3}>
              <Document />
            </TabPane>
            <TabPane tab="Notes" key={4}>
              {/* <Notes/> */}
              <Notes actionType='contractor' token={authUser.tokens} Data={contractorData} activeCompany={activeCompany} />
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
export default connect(mapStateToProps)(ViewContrator);
