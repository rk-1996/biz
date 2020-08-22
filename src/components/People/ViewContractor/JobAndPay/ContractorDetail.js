import React, { useState } from "react";
import { Icon } from "antd";
import ContractorDetailsEditModal from "./../EditModals/ContractorDetailsEditModal";

const ContractorDetail = ({ compensation }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      <div className="gx-fs-lg gx-pb-2">Contractor Details</div>
      <div className="employee-detail-block">
        <div className="edit-icon" onClick={() => setIsEdit(true)}>
          <Icon type="edit" /> Edit
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            PIN
          </div>
          <div className="flex-1 gx-text-grey">9518</div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Permission Level
          </div>
          <div className="flex-1 gx-text-grey">Basic</div>
        </div>
      </div>
      <ContractorDetailsEditModal
        visible={isEdit}
        handleOk={() => setIsEdit(false)}
        handleCancel={() => setIsEdit(false)}
      />
    </div>
  );
};

export default ContractorDetail;
