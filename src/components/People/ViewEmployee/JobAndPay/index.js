import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Tabs, Switch, message, Form, Modal, DatePicker, Row, Col, Input, Select } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EmployeeMentDetail from "./EmployeeMentDetail";
import Compensation from "./Compensation";
import moment from "moment";
import {
  useHistory
} from "react-router-dom";
import { getEmployeeCompesastion, getCompansationHistory, updateCompansationDetail, editCompanyStatusForEmployee, addEmployeeLocation, getValidPin } from "services/people";
import CircularProgress from "components/CircularProgress/index";
import SelectJob from 'components/Common/SelectJob';
import SelectDepartment from 'components/Common/SelectDepartment';
import AddAdditionalLocationEmployee from './AddAdditionalLocationEmployee'
import AddAdditionalLocationComoansation from './AddAdditionalLocationCompansation'

const FormItem = Form.Item;
const { Option } = Select;
const TabPane = Tabs.TabPane;

const JobsAndPay = ({
  activeCompany,
  employeeData,
  authUser,
  companies,
  match,
  updateSavedObj,
  jobs,
  people,
  departments,
  form
}) => {
  const { params } = match;
  const [compensation, setCompesastion] = useState(null);
  const dismissEmployeeHandler = () => { };
  const [formTab, setFormTab] = useState("1");

  const [statusCompany, setStatusCompany] = useState()
  const [loaderChangeStatus, setLoaderChangeStatus] = useState(false)
  const [loaderAddLocation, setLoaderAddLocation] = useState(false)
  const [addedLocation, setAddedLocation] = useState('')
  const [addLocationStatus, setAddLocationStatus] = useState('')
  const [addedLocationCompensationId, setAddedLocationCompensationId] = useState('')
  const [displayModalAddLocation, setDisplayModalAddLocation] = useState(false)
  const [displayModalAddLocationCompensation, setDisplayModalAddLocationCompensation] = useState(false)
  const { getFieldDecorator, setFieldsValue } = form;
  const [formValues, setFormValues] = useState({});
  const [formFilledValues, setFormFilledValues] = useState(false)
  const [formValidate, setFormValidate] = useState({
    step1: false,
    step2: false,
  });

  const history = useHistory();


  const comparer = (otherArray) => {
    return function (current) {
      return otherArray.filter(function (other) {
        return other.lid == current.lid && other.name == current.name
      }).length == 0;
    }
  }

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
        let newAddedData = []
        let CompanyLocationArr = []
        let ComepnsastionLocationArr = []

        let activeCompanyArr = []
        let otherLoopArr = [...companies]
        otherLoopArr.map((val, ind) => {
          if (val.cid === activeCompany.company) {
            val.locations.map((locVal, locInd) => {
              activeCompanyArr.push({
                lid: locVal.lid,
                name: locVal.name
              })
            })
          }
        })
        // console.log("current active company", activeCompanyArr)
        // companies.map((val, ind) => {
        //   val.locations.map((valLocation, valIndex) => {
        //     CompanyLocationArr.push({
        //       lid: valLocation.lid,
        //       name: valLocation.name
        //     })
        //   })
        // })
        activeCompanyArr.map((val, index) => {
          CompanyLocationArr.push({
            lid: val.lid,
            name: val.name
          })
        })
        result.data.map((compDataVal, index) => {
          ComepnsastionLocationArr.push({
            lid: compDataVal.location,
            name: compDataVal.locationName
          })
        })
        var onlyInA = CompanyLocationArr.filter(comparer(ComepnsastionLocationArr));
        var onlyInB = ComepnsastionLocationArr.filter(comparer(CompanyLocationArr));
        let resultcgfcgfcfg = onlyInA.concat(onlyInB);


        setAddedLocation(resultcgfcgfcfg)
        setCompesastion(result.data);
        setStatusCompany(result.data[0].status)
      }
    } catch (error) { }
  };


  const handleSubmitCompensation = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        // setLoader(true);
        const obj = {
          jobTitle: values.jobTitle,
          department: values.department,
          type: values.type,
          rate: values.rate,
          per: values.per,
          effectiveDate: moment(values.effectiveDate),
          defaultHours: values.defaultHours,
          reasonofChange: values.reasonofChange,
          // status: false
        };
        // console.log('obj compensation', formValues)

      }
    });
  };

  useEffect(() => {
    // console.log('addedLocation', addedLocation)
  }, [addedLocation])

  useEffect(() => {
    // console.log('companies', companies)
    getCompesastionDetails();
  }, []);

  const onChangeFormTab = (key) => {
    setFormTab(key);
  };

  useState(() => {
    if (formFilledValues) {
      // console.log(formValues)
    }
    // console.log('formFilled', formFilledValues)
  }, [formFilledValues])

  const onFinish = async (data) => {
    console.log('data', data)
    setLoaderAddLocation(true)
    // console.log("on finisehd call ")
    // setFormValues((values) => {
    //   return {
    //     ...values,
    //     ...data
    //   }
    // })

    let obj = {

      jobTitle: data.jobTitle,
      defaultHours: data.defaultHours,
      type: data.type,
      rate: data.rate,
      per: data.per,
      reasonofChange: data.reasonofChange

    }
    let objParams = {
      id: params.id,
      company: activeCompany.company,
      actionType: "employee",
      location: addedLocationCompensationId,
      user_id: employeeData.user.uid,
    }
    // console.log(obj)
    const resultUpdateStatus = await updateCompansationDetail(authUser.tokens.accessToken, {
      ...obj,
      id: params.id,
      company: activeCompany.company,
      actionType: "employee",
      location: addedLocationCompensationId,
      // user_id: employeeData.user.uid,
    });
    if (resultUpdateStatus.status === 200 || resultUpdateStatus.status === 201) {
      setLoaderAddLocation(false)
      message.success("Compensation added successfully..")
      history.push(`/people/view-employee/${employeeData.eid}`)
      // setStatusCompany(e)
    } else {
      setLoaderAddLocation(false)

      message.error("Something went wrong..")
    }
  }

  const onCompleteDetail = async (data, step) => {

    let dataObj = {
      company: activeCompany.company,
      location: addLocationStatus.lid,
      pin: data.pin
    }
    const result = await getValidPin(authUser.tokens.accessToken, dataObj);
    if (result.status !== 200) {
      message.error('This pin is not unique you have to add unique pin!')
      return
    }

    // console.log(step)
    let obj = {
      role: data.role,
      employmentDetails: {
        manager: data.manager,
        pin: data.pin,
        startDate: new Date(moment(data.startDate._d).format("YYYY-MM-DD")).toISOString(),
        type: data.employmentClass
      },
      compensation: {
        // department: "Thai cuisine",
        effectiveDate: new Date(moment(data.startDate._d).format("YYYY-MM-DD")).toISOString()
      }
    }
    let objParams = {
      location: addLocationStatus.lid,
      company: activeCompany.company,
      user_id: employeeData.user.uid,
    }
    // console.log(obj)
    const resultUpdateStatus = await addEmployeeLocation(authUser.tokens.accessToken,
      objParams, obj);
    if (resultUpdateStatus.status === 200 || resultUpdateStatus.status === 201) {
      setLoaderAddLocation(false)
      message.success("Location added successfully..")
      // setDisplayModalAddLocation(false)
      history.push(`/people/view-employee/${employeeData.eid}`)
      // setStatusCompany(e)
    } else {
      setLoaderAddLocation(false)

      message.error("Something went wrong..")
    }

    setFormValues((values) => {
      return {
        ...values,
        ...data
      }
    })
    // if (step === 'step3') {
    //   console.log(formValues)
    //   setDisplayModalAddLocation(false)
    // }
  }

  const toggleLocationAddStatus = (location) => {
    // console.log("demo")
    setDisplayModalAddLocation(true)
    setAddLocationStatus(location)
  }

  const addCompensationHandle = (lId) => {
    // e.preventDefault()
    console.log(lId)
    setAddedLocationCompensationId(lId)
    setDisplayModalAddLocationCompensation(true)
  }

  const toggleLocationStatus = async (e, c) => {
    // console.log(e)
    // console.log(c)
    // console.log(compensation)
    let resSelectedData = compensation.filter((data) => { return data.location === c.location })
    // console.log('resSelectedData', resSelectedData)
    try {
      setLoaderChangeStatus(true)
      // console.log(resSelectedData)
      const obj = {
        // jobTitle: resSelectedData[0].jobTitle,
        // department: resSelectedData[0].department,
        // type: resSelectedData[0].type,
        // rate: resSelectedData[0].rate,
        // per: resSelectedData[0].per,
        // effectiveDate: moment(resSelectedData[0].effectiveDate),
        // defaultHours: resSelectedData[0].defaultHours,
        // reasonofChange: resSelectedData[0].reasonofChange,
        status: e
      };
      const resultUpdateStatus = await updateCompansationDetail(authUser.tokens.accessToken, {
        ...obj,
        id: params.id,
        location: resSelectedData[0].location,
        company: activeCompany.company,
        actionType: "employee",
      });
      if (resultUpdateStatus.status === 200) {
        setLoaderChangeStatus(false)
        message.success("Status changed successfully..")
        history.push(`/people/view-employee/${employeeData.eid}`)
        setStatusCompany(e)
      } else {
        setLoaderChangeStatus(false)

        message.error("Something went wrong..")
      }
    } catch (error) {
      setLoaderChangeStatus(false)

      message.error(error)
    }

    // console.log(e)
  }

  const updateCompensation = () => {
    getCompesastionDetails()
  }

  return (
    <div className="pos-relative">
      {compensation &&
        compensation.map((c, i) => {
          return (
            <div key={i} className="company-level-container">
              {
                loaderChangeStatus ? <div className="gx-loader-view">
                  <CircularProgress />
                </div> :
                  <>

                    <div className="flex-x align-center gx-pt-1 gx-pb-4">
                      <div>
                        <Switch checked={c.status} onChange={(e) => toggleLocationStatus(e, c)} />
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
                        department={c.department}
                        activeCompany={activeCompany}
                      />
                      {/* Compensation */}
                      {
                        c ?
                          <Compensation
                            params={params}
                            token={authUser.tokens.accessToken}
                            updateSavedObj={updateCompensation}
                            addCompenstationHandle={(e) => addCompensationHandle(e)}
                            jobs={jobs}
                            departments={departments}
                            activeCompany={activeCompany}
                            compensation={c}
                          /> : ''
                      }
                    </div>
                  </>
              }
            </div>
          );
        })}
      {
        addedLocation &&
        addedLocation.map((l, i) => {
          return (
            <div key={i} className="company-level-container">
              {
                loaderChangeStatus ? <div className="gx-loader-view">
                  <CircularProgress />
                </div> :
                  <>

                    <div className="flex-x align-center gx-pt-1 gx-pb-4">
                      <div>
                        <Switch checked={false} onChange={(e) => { toggleLocationAddStatus(l) }} />
                      </div>
                      <div className="gx-ml-2">{l.name}</div>
                    </div>

                    {/* <div key={i}>
                        <EmployeeMentDetail
                          params={params}
                          token={authUser.tokens.accessToken}
                          employeeData={employeeData}
                          updateSavedObj={updateCompensation}
                          employment={c.employment}
                          activeCompany={activeCompany}
                        />
                        {
                          c ?
                            <Compensation
                              params={params}
                              token={authUser.tokens.accessToken}
                              updateSavedObj={updateCompensation}
                              jobs={jobs}
                              departments={departments}
                              activeCompany={activeCompany}
                              compensation={c}
                            /> : ''
                        }
                      </div> */}
                  </>
              }
            </div>
          );
        })
      }
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
      <Modal
        title="Add Employee Detail"
        visible={displayModalAddLocation}
        onOk={() => { setDisplayModalAddLocation(false) }}
        onCancel={() => { setDisplayModalAddLocation(false) }}
        className="hide-modal-footer"
      >
        {
          loaderAddLocation ? <div className="gx-loader-view">
            <CircularProgress />
          </div> :

            <AddAdditionalLocationEmployee
              onCompleteDetail={onCompleteDetail}
              setFormTab={setFormTab}
              setDisplayModalAddLocation={setDisplayModalAddLocation}
              people={people.people}
            />
          // <Tabs className='tab-modal-timesheet' activeKey={formTab} onChange={onChangeFormTab}>
          //   <TabPane tab="Emplpoyeement details" key={1}>

          //   </TabPane>
          // {/* <TabPane tab="Compensation details" key={2} disabled={!formValidate.step1}>
          //   <AddAdditionalLocationComoansation
          //     onCompleteDetail={onCompleteDetail}
          //     setFormTab={setFormTab}
          //     setDisplayModalAddLocation={setDisplayModalAddLocation}
          //     onFinish={onFinish}
          //     jobs={jobs}
          //   ></AddAdditionalLocationComoansation>
          // </TabPane> */}
          // </Tabs>

        }
      </Modal>
      <Modal
        title="Add Compensation Detail"
        visible={displayModalAddLocationCompensation}
        onOk={() => { setDisplayModalAddLocationCompensation(false) }}
        onCancel={() => { setDisplayModalAddLocationCompensation(false) }}
        className="hide-modal-footer"
      >
        {
          loaderAddLocation ? <div className="gx-loader-view">
            <CircularProgress />
          </div> :

            <AddAdditionalLocationComoansation
              onCompleteDetail={onCompleteDetail}
              setFormTab={setFormTab}
              setDisplayModalAddLocation={setDisplayModalAddLocationCompensation}
              people={people.people}
              onFinish={onFinish}
            />
        }
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ auth, common, people }) => {
  const { authUser } = auth;
  const { activeCompany, companies, departments, jobs } = common;
  return { authUser, activeCompany, companies, departments, people, jobs };
};

export default connect(mapStateToProps)(withRouter(Form.create()(JobsAndPay)));
