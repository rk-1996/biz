import React, { useState } from "react";
import { Icon } from "antd";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import ContractorPersonalEditModal from "./../ViewContractor/EditModals/ContractorPersonalEditModal";
import ContractorEmergencyEditModal from "./../ViewContractor/EditModals/ContractorEmergencyEditModal";
import { dateFormat, mobileFormat } from "util/constant";

const Personal = ({ contractorData, match, authUser, updateSavedObj }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditEmergency, setIsEditEmergency] = useState(false);

  const { params } = match;
  const { address } = contractorData;
  return (
    <div>
      {contractorData.type === "business" ? (
        <>
          <div className="gx-fs-lg gx-pb-2">Business</div>
          <div className="employee-detail-block">
            <div className="edit-icon" onClick={() => setIsEdit(true)}>
              <Icon type="edit" /> Edit
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Business Name
              </div>
              <div className="flex-1 gx-text-grey">
                {contractorData.businessName}
              </div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Contact Name
              </div>
              <div className="flex-1 gx-text-grey">
                {contractorData.contactName && contractorData.contactName}
              </div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                EIN
              </div>
              <div className="flex-1 gx-text-grey">{contractorData.ein}</div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                E-Mail
              </div>
              <div className="flex-1 gx-text-grey">{contractorData.email}</div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Phone
              </div>
              <div className="flex-1 gx-text-grey">
                {mobileFormat(contractorData.phone)}
              </div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Address
              </div>
              <div className="flex-1 gx-text-grey">
                {`${address.street1} ${
                  address.street2 ? address.street2 : ""
                }, ${address.city}, ${address.state}, ${address.zip}`}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
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
                {`${contractorData.firstName} ${contractorData.lastName}`}
              </div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Contractor Type
              </div>
              <div className="flex-1 gx-text-grey">
                Individual
              </div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Social Security Number
              </div>
              <div className="flex-1 gx-text-grey">{contractorData.ssn}</div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Date of Birth
              </div>
              <div className="flex-1 gx-text-grey">
                {dateFormat(contractorData.dob)}
              </div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                E-Mail
              </div>
              <div className="flex-1 gx-text-grey">{contractorData.email}</div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Phone
              </div>
              <div className="flex-1 gx-text-grey">
                {mobileFormat(contractorData.phone)}
              </div>
            </div>
            <div className="flex-x">
              <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                Address
              </div>
              <div className="flex-1 gx-text-grey">
                {`${address.street1} ${
                  address.street2 ? address.street2 : ""
                }, ${address.city}, ${address.state}, ${address.zip}`}
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
                contractorData && contractorData.emergencyInfo ?
                <>
                  <div className="flex-x">
                    <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                      Full Name
                    </div>
                    <div className="flex-1 gx-text-grey">
                      {contractorData.emergencyInfo.fullName}
                    </div>
                  </div>
                  <div className="flex-x">
                    <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                      Relationship
                    </div>
                    <div className="flex-1 gx-text-grey">
                      {contractorData.emergencyInfo.relation}
                    </div>
                  </div>
                  <div className="flex-x">
                    <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                      Phone Number
                    </div>
                    <div className="flex-1 gx-text-grey">
                      {mobileFormat(String(contractorData.emergencyInfo.phone))}
                    </div>
                  </div>
                  <div className="flex-x">
                    <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                      E-mail
                    </div>
                    <div className="flex-1 gx-text-grey">
                      {contractorData.emergencyInfo.email}
                    </div>
                  </div>
                </> : <div>No Emergency Details Added</div>
              }
            </div>
          </div>
        </>
      )}
      {isEditEmergency && contractorData && (
        <ContractorEmergencyEditModal
          visible={isEditEmergency}
          contractorData={contractorData}
          handleOk={() => setIsEditEmergency(false)}
          handleCancel={() => setIsEditEmergency(false)}
          params={params}
          token={authUser.tokens.accessToken}
          updateSavedObj={updateSavedObj}
        />
      )}
      {isEdit && contractorData && (
        <ContractorPersonalEditModal
          visible={isEdit}
          contractorData={contractorData}
          handleOk={() => setIsEdit(false)}
          handleCancel={() => setIsEdit(false)}
          params={params}
          token={authUser.tokens.accessToken}
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
