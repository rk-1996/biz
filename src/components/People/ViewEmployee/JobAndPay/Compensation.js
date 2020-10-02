import React, { useState, useEffect, useCallback } from "react";
import { Icon, Button, Modal } from "antd";
import { getCompansationHistory } from 'services/people';
import CompensationEditModal from "./EditModals/CompensationEditModal";
import { dateTimeFormat, dateFormat } from "util/constant";

const Compensation = ({ compensation, addCompenstationHandle, activeCompany, updateSavedObj, token, params, jobs, departments }) => {
  console.log("compensasion called", compensation)
  const [isEdit, setIsEdit] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const getHistory = useCallback(async () => {
    const obj = {
      empid: params.id,
      company: activeCompany.company,
      location: activeCompany.location
    }
    const result = await getCompansationHistory(token, { ...obj, actionType: 'employee' });
    if (result.status === 200) {
      setHistory(result.data)
    }
  }, [params, token]);

  const addCompensationModel = (coid) => {
    addCompenstationHandle(coid)
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
      <div
        className="employee-detail-block"
      >
        <div className="edit-icon" onClick={() => setIsEdit(true)}>
          <Icon type="edit" /> Edit
          </div>
        {
          compensation &&
          <>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Job Title
            </div>
              <div className="flex-1 gx-text-grey">{compensation.jobTitle}</div>
            </div>
            {/* department is moved to employee details */}
            {/* <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Department
            </div>
              <div className="flex-1 gx-text-grey">{compensation.department}</div>
            </div> */}
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Employment Type
            </div>
              <div className="flex-1 gx-text-grey">{compensation.type}</div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Wage
            </div>
              <div className="flex-1 gx-text-grey">${compensation.rate} per {compensation.per}</div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Default Hours
            </div>
              <div className="flex-1 gx-text-grey">
                {compensation.defaultHours ? compensation.defaultHours : "None"}
              </div>
            </div>
          </>
        }
      </div>
      <div className="flex-x compensation-action gx-pt-3">
        <div className="flex-1 gx-mr-2">
          <Button type="primary" className="fill-width" onClick={() => addCompensationModel(compensation.location)}>
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
        {
          (history && history.length) ?
            history.map((h, i) => {
              return (
                <div className="gx-pb-4" key={i}>
                  <div className="flex-x space-between gx-mb-1 gx-font-weight-medium">
                    <div>{h.actionType}</div>
                    <div>{dateTimeFormat(h.changedDate)}</div>
                  </div>
                  <div className="employee-detail-block">
                    <div className="flex-x">
                      <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                        Job Title
                      </div>
                      <div className="flex-1 gx-text-grey">{h.jobTitle}</div>
                    </div>
                    <div className="flex-x">
                      <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                        Effective Date
                      </div>
                      <div className="flex-1 gx-text-grey">
                        {dateFormat(h.effectiveDate)}
                      </div>
                    </div>
                    <div className="flex-x">
                      <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                        Employment Type
                      </div>
                      <div className="flex-1 gx-text-grey">
                        {h.type}
                      </div>
                    </div>
                    <div className="flex-x">
                      <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                        Wage
                      </div>
                      <div className="flex-1 gx-text-grey">${h.rate} per ${h.per}</div>
                    </div>
                    <div className="flex-x">
                      <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                        Default Hours
                      </div>
                      <div className="flex-1 gx-text-grey">{h.defaultHours && h.defaultHours}</div>
                    </div>
                    <div className="flex-x">
                      <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                        Reason for Change
                      </div>
                      <div className="flex-1 gx-text-grey">{h.reasonofChange}</div>
                    </div>
                  </div>
                </div>
              )
            }) : "No history available"
        }
      </Modal>
      {
        isEdit && compensation &&
        <CompensationEditModal
          compensation={compensation}
          visible={isEdit}
          handleOk={() => setIsEdit(false)}
          handleCancel={() => setIsEdit(false)}
          token={token}
          params={params}
          updateSavedObj={compensationEditHandler}
          jobs={jobs}
          departments={departments}
          activeCompany={activeCompany}
        />
      }
    </div>
  );
};

export default Compensation;
