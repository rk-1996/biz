import React, { useState, useEffect, useMemo } from "react";
import { Breadcrumb, Icon, Tabs, Card, message } from "antd";
import moment from 'moment';
import { connect } from "react-redux";
import {
  Basics,
  Employment,
  TaxDetail,
  Documents,
} from "components/People/AddPeople/index";
import {
  addEmployeeRequest,
  getValidPinRequest
} from "appRedux/actions/People";

var randomize = require('randomatic');

const TabPane = Tabs.TabPane;

const AddPeople = (props) => {
  const [formTab, setFormTab] = useState("1");
  const [formValues, setFormValues] = useState({});
  const [pin, setPin] = useState('')
  const [formValidate, setFormValidate] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });

  const {
    activeCompany,
    activeLocation,
    addEmployeeRequest,
    getValidPinRequest,
    loader = false,
    jobs,
    departments,
    companies,
    token
  } = props;

  useEffect(() => {
    console.log('formValues', formValues);
  }, [formValues]);

  const activeCompanyDetails = useMemo(() => {
    return companies.find(a => a.cid === activeCompany)
  }, [companies, activeCompany])

  const onChangeFormTab = (key) => {
    setFormTab(key);
  };

  const onCompleteDetail = async (data, step) => {
    setFormValidate({
      ...formValidate,
      [step]: true
    })
    setFormValues((values) => {
      return {
        ...values,
        ...data
      }
    })
  }

  const autoGeneratePin = () => {
    let generatedPin = randomize('0', 4);
    setPin(generatedPin)
    formValues.pin = generatedPin
  }

  const getValidPin = (data) => {
    console.log(data)
    console.log(activeCompany)
    console.log(activeLocation)
    let dataObj = {
      company: activeCompany,
      location: activeLocation,
      pin: data
    }
    getValidPinRequest(dataObj)
  }

  const onFinish = (data) => {
    setFormValues((values) => {
      return {
        ...values,
        ...data
      }
    })
    const createEmployeeObj = {
      company: activeCompany,
      location: formValues.location,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      middleName: formValues.middleName,

      phone: Number(formValues.phone),
      dob: new Date(moment(formValues.dob._d).format("YYYY-MM-DD")).toISOString(),
      ssn: formValues.ssn,
      address: {
        state: formValues.state,
        zip: Number(formValues.zip),
        city: formValues.city,
        street1: formValues.street1,
        street2: formValues.street2
      },
      email: formValues.email,
      role: formValues.role,
      employmentDetails: {
        manager: formValues.manager,
        pin: formValues.userPin1,
        startDate: new Date(moment(formValues.startDate._d).format("YYYY-MM-DD")).toISOString(),
        type: formValues.employmentClass
      },
      compensation: {
        jobTitle: formValues.jobTitle,
        department: formValues.department,
        defaultHours: Number(formValues.defaultHours),
        type: formValues.type,
        amount: Number(formValues.amount),
        per: formValues.per,
      },
      docs: data.docs
    };
    if (formValues.federalFilingStatus) {
      createEmployeeObj['fedral'] = {
        filingStatus: formValues.federalFilingStatus,
        multipleJobs: formValues.multipleJobs,
        otherIncome: String(formValues.otherIncome),
        deduction: String(formValues.deduction),
        dependent: Number(formValues.dependent),
        extraWithHolding: String(formValues.extraWithholding)
      }
    }
    if (formValues.stateFilingStatus) {
      createEmployeeObj['state'] = {
        filingStatus: formValues.stateFilingStatus,
        withHoldingAllowances: String(formValues.withHoldingAllowances),
        extraWithHolding: String(formValues.additionalWitholding)
      }
    }
    if (formValues.emergencyFullName) {
      createEmployeeObj['emergencyInfo'] = {
        fullName: formValues.emergencyFullName ? formValues.emergencyFullName : "",
        relation: formValues.emergencyRelationship ? formValues.emergencyRelationship : "",
        phone: formValues.emergencyPhone ? Number(formValues.emergencyPhone) : "",
        email: formValues.emergencyEmail ? formValues.emergencyEmail : "",
      }
    }
    addEmployeeRequest(createEmployeeObj);
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
              <span>Add Employee</span>
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card className="gx-card" title="Add Employee">
        <Tabs activeKey={formTab} onChange={onChangeFormTab}>
          <TabPane tab="Basics" key={1}>
            <Basics
              setFormTab={setFormTab}
              onCompleteDetail={onCompleteDetail}
              checkedValidPin={getValidPin}
              autoGeneratedPin={pin}
              autoGeneratePinFun={autoGeneratePin}
              activeCompanyDetails={activeCompanyDetails}
              activeCompany={activeCompany}
              activeLocation={activeLocation}
              token={token}
            />
          </TabPane>
          <TabPane tab="Employment & Pay" key={2} disabled={!formValidate.step1}>
            <Employment
              setFormTab={setFormTab}
              onCompleteDetail={onCompleteDetail}
              jobs={jobs}
              departments={departments}
              activeCompanyDetails={activeCompanyDetails}
            />
          </TabPane>
          <TabPane tab="Tax Details" key={3} disabled={!formValidate.step2}>
            <TaxDetail
              setFormTab={setFormTab}
              onCompleteDetail={onCompleteDetail}
            />
          </TabPane>
          <TabPane tab="Documents" key={4} disabled={!formValidate.step3}>
            <Documents
              setFormTab={setFormTab}
              onFinish={onFinish}
              loader={false}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany.location,
    loader: state.people.loader,
    jobs: state.common.jobs,
    departments: state.common.departments,
    companies: state.common.companies,
    token: state.auth.authUser.tokens.accessToken,
  }
};

export default connect(mapStateToProps, {
  addEmployeeRequest,
  getValidPinRequest,
})(AddPeople);
