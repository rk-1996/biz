import React, { useState, useCallback, useEffect } from "react";
import { Icon, Card, Button, Modal } from "antd";
import CompensationEditModal from "./../EditModals/CompensationEditModal";
import { dateFormat, dateTimeFormat } from "util/constant";
import { getCompansationHistory, deleteCompensationApi } from 'services/people';

const Compensation = ({ compensation, activeCompany, updateSavedObj, token, params, jobs, departments, CompensationsList }) => {
  const [history, setHistory] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingDeleteCompensation, setLoadingDeleteCompensation] = useState(false)
  const getHistory = useCallback(async () => {
    const obj = {
      empid: params.id,
      company: activeCompany.company,
      location: activeCompany.location
    }
    const result = await getCompansationHistory(token, { ...obj, actionType: 'contractor' });
    if (result.status === 200) {
      console.log('compensation', compensation)
      console.log('result.data', result.data)
      setHistory(result.data)
    }
  }, [params, token]);

  const deleteCompensation = async (compId) => {
    setLoadingDeleteCompensation(true)
    try {
      const obj = {
        id: compId
      }
      console.log("in api call delete compensation")

      const result = await deleteCompensationApi(token, { ...obj });
      if (result) {

        setLoadingDeleteCompensation(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const compensationEditHandler = (values) => {
    updateSavedObj(values);
    getHistory();
  }

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  return (
    <div className="gx-pt-4">
      <div className="gx-fs-lg gx-pb-2">Compensation</div>
      <div className="employee-detail-block">
        <div className="edit-icon" onClick={() => setIsEdit(true)}>
          <Icon type="edit" /> Edit
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Start Date
          </div>
          <div className="flex-1 gx-text-grey">
            {dateFormat(compensation.effectiveDate)}
          </div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Job Title
          </div>
          <div className="flex-1 gx-text-grey">{compensation.jobTitle}</div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Department
          </div>
          <div className="flex-1 gx-text-grey">{compensation.department}</div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Wage Type
          </div>
          <div className="flex-1 gx-text-grey">{compensation.type}</div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Wage
          </div>
          {
            compensation.type === "hour" ?
              <div className="flex-1 gx-text-grey">${compensation.hasOwnProperty('rate') ? compensation.rate : ""} per Hour</div> :
              <div className="flex-1 gx-text-grey">${compensation.rate}</div>
          }
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Default Hours
          </div>
          <div className="flex-1 gx-text-grey">
            {compensation.rate ? compensation.rate : "None"}
          </div>
        </div>
      </div>
      {/* {
        CompensationsList && CompensationsList.map((c, i) => {
          return (
            <div className="employee-detail-block" key={i} style={i !== 0 ? { marginTop: '15px' } : {}}>
              <div className="edit-icon" onClick={() => setIsEdit(true)}>
                <Icon type="edit" /> Edit
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Job Title
                </div>
                <div className="flex-1 gx-text-grey">
                  {c.jobTitle}
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Wage Type
                </div>
                <div className="flex-1 gx-text-grey">
                  {c.employee_type}
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Wage
                </div>
                <div className="flex-1 gx-text-grey">
                  ${c.wage} per Hour
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Default Hours
                </div>
                <div className="flex-1 gx-text-grey">
                  {c.defaultHours ? c.defaultHours : 'None'}
                </div>
              </div>
            </div>
          )
        })
      } */}
      <div className="flex-x compensation-action gx-pt-3">
        <div className="flex-1 gx-mr-2">
          <Button type="primary" className="fill-width">
            Add Earning Type
          </Button>
        </div>
        <div className="flex-1 gx-ml-2">
          <Button
            type="primary"
            className="fill-width"
            onClick={() => setShowHistory(true)}
          >
            View Compensation History
          </Button>
        </div>
      </div>
      <Modal
        title="Compensation History"
        visible={showHistory}
        onOk={() => setShowHistory(false)}
        onCancel={() => setShowHistory(false)}
      >
        <ul class="compensation-history">

          {
            (history && history.length) ?
              history.map((h, i) => {
                return (
                  // <div className="gx-pb-4" key={i}>
                  //   <div className="flex-x space-between gx-mb-1 gx-font-weight-medium">
                  //     <div>{h.actionType}</div>
                  //     <div>{dateTimeFormat(h.changedDate)}</div>
                  //   </div>
                  //   <div className="employee-detail-block">
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Job Title
                  //     </div>
                  //       <div className="flex-1 gx-text-grey">{h.jobTitle}</div>
                  //     </div>
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Department
                  //     </div>
                  //       <div className="flex-1 gx-text-grey">{h.department}</div>
                  //     </div>
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Effective Date
                  //     </div>
                  //       <div className="flex-1 gx-text-grey">
                  //         {dateFormat(h.effectiveDate)}
                  //       </div>
                  //     </div>
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Employment Type
                  //     </div>
                  //       <div className="flex-1 gx-text-grey">
                  //         {h.type}
                  //       </div>
                  //     </div>
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Wage
                  //     </div>
                  //       <div className="flex-1 gx-text-grey">
                  //         {
                  //           h.type === "hour" ?
                  //             <div className="flex-1 gx-text-grey">${h.hasOwnProperty('rate') ? h.rate : ""} per Hour</div> :
                  //             <div className="flex-1 gx-text-grey">${h.rate}</div>
                  //         }
                  //       </div>
                  //     </div>
                  //     {
                  //       h.type === "hour" &&
                  //       <div className="flex-x">
                  //         <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //           Default Hours
                  //       </div>
                  //         <div className="flex-1 gx-text-grey">{h.defaultHours}</div>
                  //       </div>
                  //     }
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Reason for Change
                  //     </div>
                  //       <div className="flex-1 gx-text-grey">{h.reasonofChange}</div>
                  //     </div>
                  //   </div>
                  // </div>
                  <li>
                    <time datetime="10:03"></time>
                    <div className='add-line'>

                      <div className="flex-x center justify-content-space-between">
                        {/* <FormItem className="gx-m-0"> */}
                        <div className="flex-x title-history">
                          {h.actionType}
                        </div>
                        <div className="flex-x date-history">
                          {dateTimeFormat(h.changedDate)}
                        </div>
                        {/* </FormItem> */}
                      </div>
                      <Card style={{ width: `100%`, marginTop: `6px`, marginBottom: '0px', padding: `0 0 0 0` }}>
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x date-history ml-35px font-weight-normal">
                            Job Title
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {h.jobTitle}
                          </div>

                        </div>
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x date-history ml-35px font-weight-normal">
                            Department
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {h.department}
                          </div>

                        </div>
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x date-history ml-35px font-weight-normal">
                            Effective Date
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {dateFormat(h.effectiveDate)}
                          </div>

                        </div>
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x ml-35px date-history font-weight-normal">
                            Employment Type
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {h.type}
                          </div>

                        </div>
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x ml-35px date-history font-weight-normal">
                            Wage
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {
                              h.type === "hour" ?
                                <div className="flex-1 gx-text-grey">${h.hasOwnProperty('rate') ? h.rate : ""} per Hour</div> :
                                <div className="flex-1 gx-text-grey">${h.rate}</div>
                            }
                          </div>

                        </div>
                        {
                          h.type === "hour" &&
                          <div className="flex-x center justify-content-right mb-10px">
                            {/* <FormItem className="gx-m-0"> */}
                            <div className="flex-x ml-35px date-history font-weight-normal">
                              Default Hours
                                                </div>
                            <div className="flex-x ml-20px title-history font-weight-normal">
                              {h.defaultHours}
                            </div>

                          </div>
                        }
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x ml-35px date-history font-weight-normal">
                            Reason for Change
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {h.reasonofChange}
                          </div>

                        </div>
                      </Card>
                    </div>
                  </li>


                )
              }) : "No history available"
          }
        </ul>
      </Modal>
      {
        isEdit && compensation &&
        <CompensationEditModal
          compensation={compensation}
          deleteCompensation={deleteCompensation}
          loadingDeleteCompensation={loadingDeleteCompensation}
          updateSavedObj={compensationEditHandler}
          token={token}
          params={params}
          visible={isEdit}
          handleOk={() => setIsEdit(false)}
          handleCancel={() => setIsEdit(false)}
          jobs={jobs}
          departments={departments}
          activeCompany={activeCompany}
        />
      }
    </div>
  );
};

export default Compensation;
