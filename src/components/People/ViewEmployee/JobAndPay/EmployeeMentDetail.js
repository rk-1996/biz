import React, { useState } from "react";
import { Icon } from "antd";
import { dateFormat } from 'util/constant';
import EmployeeEditModal from "./EditModals/EmployeeEditModal";

const EmployeeMentDetail = ({ employment, department, token, params, updateSavedObj, jobs, activeCompany }) => {
  const [isEdit, setIsEdit] = useState(false);
  console.log('employement details')
  console.log('employment', employment)
  return (
    <div>
      <>
        <div className="gx-fs-lg gx-pb-2">Information</div>
        <div className="employee-detail-block">
          <div className="edit-icon" onClick={() => setIsEdit(true)}>
            <Icon type="edit" /> Edit
            </div>
          <div className="flex-x">
            <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
              PIN
              </div>
            <div className="flex-1 gx-text-grey">{employment.pin}</div>
          </div>
          <div className="flex-x">
            <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
              Department
              </div>
            <div className="flex-1 gx-text-grey">{department}</div>
          </div>
          <div className="flex-x">
            <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
              Manager
              </div>
            <div className="flex-1 gx-text-grey">{employment.manager}</div>
          </div>
          <div className="flex-x">
            <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
              Start Date
              </div>
            <div className="flex-1 gx-text-grey">{dateFormat(employment.startDate)}</div>
          </div>
          <div className="flex-x">
            <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
              Employment Class
              </div>
            <div className="flex-1 gx-text-grey">
              {employment.type}
            </div>
          </div>
          <div className="flex-x">
            <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
              Permission Level
              </div>
            <div className="flex-1 gx-text-grey">
              {employment.role}
            </div>
          </div>
        </div>
      </>
      {
        isEdit && employment &&
        <EmployeeEditModal
          visible={isEdit}
          handleOk={() => setIsEdit(false)}
          handleCancel={() => setIsEdit(false)}
          employmentDetails={employment}
          token={token}
          params={params}
          department={department}
          updateSavedObj={updateSavedObj}
          jobs={jobs}
          activeCompany={activeCompany}
        />
      }
    </div>
  );
};

export default EmployeeMentDetail;
