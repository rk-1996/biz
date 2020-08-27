import React, { useState } from "react";
import { Icon } from "antd";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import EditPersonalDetailModal from "./../Personal/EditPersonalDetailModal";
import EmployeeEmergencyEditModal from "./../Personal/EmployeeEmergencyEditModal";
import { dateFormat, mobileFormat } from "util/constant";

const Personal = ({ employeeData, updateSavedObj, authUser, match }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditEmergency, setIsEditEmergency] = useState(false);
  const { params } = match;
  const { address } = employeeData;
  console.log(employeeData)
  return (
    <div>
      <div className="gx-fs-lg gx-pb-2">Personal</div>
      <div className="employee-detail-block">
        <div className="edit-icon" onClick={() => setIsEdit(true)}>
          <Icon type="edit" /> Edit
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Full Name
          </div>
          <div className="flex-1 gx-text-grey">
            {`${employeeData.firstName} ${employeeData.lastName}`}
          </div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Phone
          </div>
          <div className="flex-1 gx-text-grey">
            {mobileFormat(employeeData.phone)}
          </div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            E-Mail
          </div>
          <div className="flex-1 gx-text-grey">{employeeData.email}</div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Address
          </div>
          <div className="flex-1 gx-text-grey">
            {`${address.street1} ${address.street2 ? address.street2 : ""}, ${
              address.city
              }, ${address.state}, ${address.zip}`}
          </div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Date of Birth
          </div>
          <div className="flex-1 gx-text-grey">
            {dateFormat(employeeData.dob)}
          </div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Social Security Number
          </div>
          <div className="flex-1 gx-text-grey">
            {employeeData.ssn}
          </div>
        </div>
      </div>
      <div className="gx-pt-4">
        <div className="gx-fs-lg gx-pb-2">Emergency Contact Info</div>
        <div className="employee-detail-block">
          <div className="edit-icon" onClick={() => setIsEditEmergency(true)}>
            <Icon type="edit" /> Edit
          </div>
          {
            employeeData && employeeData.emergencyInfo ?
              <>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Full Name
                </div>
                  <div className="flex-1 gx-text-grey">
                    {employeeData.emergencyInfo.fullName}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Relationship
                </div>
                  <div className="flex-1 gx-text-grey">
                    {employeeData.emergencyInfo.relation}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Phone Number
                </div>
                  <div className="flex-1 gx-text-grey">
                    {mobileFormat(String(employeeData.emergencyInfo.phone))}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    E-mail
                </div>
                  <div className="flex-1 gx-text-grey">
                    {employeeData.emergencyInfo.email}
                  </div>
                </div>
              </> : <div>No Emergency Details Added</div>
          }
        </div>
      </div>
      {isEditEmergency && employeeData && (
        <EmployeeEmergencyEditModal
          visible={isEditEmergency}
          employeeData={employeeData}
          handleOk={() => setIsEditEmergency(false)}
          handleCancel={() => setIsEditEmergency(false)}
          params={params}
          token={authUser.tokens.accessToken}
          updateSavedObj={updateSavedObj}
        />
      )}
      {isEdit && employeeData && (
        <EditPersonalDetailModal
          visible={isEdit}
          params={params}
          token={authUser.tokens.accessToken}
          employeeData={employeeData}
          handleOk={() => setIsEdit(false)}
          handleCancel={() => setIsEdit(false)}
          updateSavedObj={updateSavedObj}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser }
};
export default connect(mapStateToProps)(withRouter(Personal));
