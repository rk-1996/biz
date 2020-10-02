import React, { useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Switch, message } from "antd";
import ContractorDetail from "./ContractorDetail";
import Compensation from "./Compensation";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { getContractorCompesastion, updateCompansationDetail, getValidPin, addContractorLocation } from 'services/people';
import CircularProgress from "components/CircularProgress/index";
import moment from "moment";
import AddAdditionalLocationEmployee from './AddAdditionalLocationEmployee'
import {
  useHistory
} from "react-router-dom";
const JobsAndPay = ({ people, contractorData, companies, updateSavedObj, activeCompany, authUser, match, jobs, departments }) => {
  console.log("contractor data", contractorData)
  const { params } = match;
  const [addedLocation, setAddedLocation] = useState('')
  const [displayModalAddLocation, setDisplayModalAddLocation] = useState(false)
  const [compensation, setCompesastion] = useState(null)
  const [statusContractor, setStatusContractor] = useState()
  const [loaderChangeStatus, setLoaderChangeStatus] = useState(false)
  // const [addedLocation, setAddedLocation] = useState('')
  const [addLocationStatus, setAddLocationStatus] = useState('')
  const [loaderAddLocation, setLoaderAddLocation] = useState(false)
  const history = useHistory();
  const [formValues, setFormValues] = useState({});
  const [formTab, setFormTab] = useState("1");

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
        empid: params.id
      }
      const result = await getContractorCompesastion(authUser.tokens.accessToken, data);
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
      user_id: contractorData.user.uid,
    }
    // console.log(obj)
    const resultUpdateStatus = await addContractorLocation(authUser.tokens.accessToken,
      objParams, obj);
    if (resultUpdateStatus.status === 200 || resultUpdateStatus.status === 201) {
      setLoaderAddLocation(false)
      message.success("Location added successfully..")
      // setDisplayModalAddLocation(false)
      history.push(`/people/view-contractor/${contractorData.cnid}`)
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
                  </>
              }
            </div>
          );
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
    </div>

  );
};

const mapStateToProps = ({ auth, common, people }) => {
  const { authUser } = auth;
  const { activeCompany, companies } = common;
  return { authUser, activeCompany, companies, people }
};
export default connect(mapStateToProps)(withRouter(JobsAndPay));
