import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import { connect } from "react-redux";
import AppLoader from "components/Common/AppLoader";
import { getFedralHistory } from "services/people";
import { dateTimeFormat } from "util/constant";

const FedralHistoryModal = ({
  visible,
  handleOk,
  handleCancel,
  authUser,
  ...props
}) => {
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  const {
    match: { params }, activeCompany,
  } = props;

  useEffect(() => {
    const getHistory = async () => {
      setLoader(true);
      const obj = {
        id: params.id,
        company: activeCompany.company
      }
      const result = await getFedralHistory(
        authUser.tokens.accessToken,
        obj
      );
      if (result.status === 200) {
        setLoader(false);
        setHistory(result.data);
      }
    };
    getHistory();
  }, [authUser, params]);
  return (
    <Modal
      title="Fedral History"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      {loader && (
        <div style={{ minHeight: "150px" }}>
          <AppLoader />
        </div>
      )}
      {history &&
        !loader &&
        history.map((h, i) => {
          return (
            <div className="gx-pb-4" key={i}>
              <div className="flex-x space-between gx-mb-1 gx-font-weight-medium">
                <div><div>{dateTimeFormat(h.fedral.effectiveDate)}</div></div>
              </div>
              <div className="employee-detail-block">
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Filing Status
                  </div>
                  <div className="flex-1 gx-text-grey">{h.filingStatus}</div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Multiple Jobs
                  </div>
                  <div className="flex-1 gx-text-grey">{h.multipleJobs ? 'Yes' : 'No'}</div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Dependent
                  </div>
                  <div className="flex-1 gx-text-grey">
                    ${h.dependent}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Other Income
                  </div>
                  <div className="flex-1 gx-text-grey">
                    ${h.otherIncome}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Deduction
                  </div>
                  <div className="flex-1 gx-text-grey">
                    ${h.deduction}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Extra Withholding
                  </div>
                  <div className="flex-1 gx-text-grey">
                    ${h.extraWithHolding}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </Modal>
  );
};

const mapStateToProps = ({ auth, common }) => {
  const { authUser } = auth;
  const { activeCompany } = common;
  return { authUser, activeCompany }
};
export default connect(mapStateToProps)(withRouter(FedralHistoryModal));
