import React, { useState } from "react";
import { Icon, Button } from "antd";
import StateTaxesModal from "./EditModals/StateTaxesModal";
import StateHistoryModal from "./History/StateHistory";

const StateTaxes = (
  { employeeData: { state },
  updateSavedObj,
  token,
  params
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isHistory, setIsHistory] = useState(false);

  return (
    <div className="gx-pt-4">
      <div className="gx-fs-lg gx-pb-2">State Taxes</div>

        <div className="employee-detail-block">
          <div className="edit-icon" onClick={() => setIsEdit(true)}>
            <Icon type="edit" /> Edit
          </div>
          {
            state ?
            <>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Filing Status
                </div>
                <div title={state.filingStatus} className="flex-1 gx-text-grey">
                  {state.filingStatus
                    ? state.filingStatus.length > 20
                      ? state.filingStatus.substring(0, 20) + "..."
                      : state.filingStatus
                    : ""}
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Withholding Allowance
                </div>
                <div className="flex-1 gx-text-grey">
                  {state.withHoldingAllowances && state.withHoldingAllowances}
                </div>
              </div>
              <div className="flex-x">
                <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  Additional Witholding
                </div>
                <div className="flex-1 gx-text-grey">
                  {state.extraWithHolding && '$'+state.extraWithHolding}
                </div>
              </div>
            </> :
            <div>No State Taxes Details Provided</div>
          }
        </div>
      <div className="flex-x compensation-action gx-pt-3">
        <div className="flex-1 gx-mr-2">
          <Button
            type="primary"
            className="fill-width"
            onClick={() => setIsHistory(true)}
          >
            View State Tax History
          </Button>
        </div>
        <div className="flex-1 gx-ml-2"></div>
      </div>
      {isEdit && (
        <StateTaxesModal
          visible={isEdit}
          state={state}
          handleOk={() => setIsEdit(false)}
          handleCancel={() => setIsEdit(false)}
          updateSavedObj={updateSavedObj}
          token={token}
          params={params}
        />
      )}
      {isHistory && (
        <StateHistoryModal
          visible={isHistory}
          handleOk={() => setIsHistory(false)}
          handleCancel={() => setIsHistory(false)}
        />
      )}
    </div>
  );
};

export default StateTaxes;
