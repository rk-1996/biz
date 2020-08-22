import React, { useState } from "react";
import { Icon, Button } from "antd";
import FederalTaxesModal from "./../JobAndPay/EditModals/FederalTaxesModal";
import FedralHistoryModal from "./../JobAndPay/History/FedralHistory";

const FederalTaxes = ({
  employeeData: { fedral },
  updateSavedObj,
  token,
  params,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  return (
    <div className="gx-pt-4">
      <div className="gx-fs-lg gx-pb-2">Federal Taxes</div>
        <div className="employee-detail-block">
          <div className="edit-icon" onClick={() => setIsEdit(true)}>
            <Icon type="edit" /> Edit
          </div>
          {
            fedral ?
            <>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Filing Status
                </div>
                <div className="flex-1 gx-text-grey" title={fedral.filingStatus}>
                  {fedral.filingStatus
                    ? fedral.filingStatus.length > 20
                      ? fedral.filingStatus.substring(0, 20) + "..."
                      : fedral.filingStatus
                    : ""}
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Multiple Jobs
                </div>
                <div className="flex-1 gx-text-grey">
                  {fedral.multipleJobs ? "Yes" : "No"}
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Dependents
                </div>
                <div className="flex-1 gx-text-grey">
                  {fedral.dependent && '$'+fedral.dependent}
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Other Income
                </div>
                <div className="flex-1 gx-text-grey">
                  {fedral.otherIncome && '$'+fedral.otherIncome}
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Deductions
                </div>
                <div className="flex-1 gx-text-grey">
                  {fedral.deduction && '$'+fedral.deduction}
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Extra witholding
                </div>
                <div className="flex-1 gx-text-grey">
                  {fedral.extraWithHolding && '$'+fedral.extraWithHolding}
                </div>
              </div>
            </> :
            <div>No Federal Taxes Details Provided</div>
          }
        </div>
      <div className="flex-x compensation-action gx-pt-3">
        <div className="flex-1 gx-mr-2">
          <Button
            type="primary"
            className="fill-width"
            onClick={() => setIsHistory(true)}
          >
            View Fed Tax History
          </Button>
        </div>
        <div className="flex-1 gx-ml-2"></div>
      </div>
      {isEdit && (
        <FederalTaxesModal
          fedral={fedral}
          visible={isEdit}
          handleOk={() => setIsEdit(false)}
          handleCancel={() => setIsEdit(false)}
          updateSavedObj={updateSavedObj}
          token={token}
          params={params}
        />
      )}
      {isHistory && (
        <FedralHistoryModal
          visible={isHistory}
          handleOk={() => setIsHistory(false)}
          handleCancel={() => setIsHistory(false)}
        />
      )}
    </div>
  );
};

export default FederalTaxes;
