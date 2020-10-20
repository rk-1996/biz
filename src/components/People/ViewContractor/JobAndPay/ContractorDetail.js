import React, { useState } from "react";
import { Icon, message } from "antd";
import ContractorDetailsEditModal from "./../EditModals/ContractorDetailsEditModal";
import { updateContractorDetail, getValidPin } from 'services/people';

const ContractorDetail = ({ compensation, contractorData, activeCompany, updateSavedObj, token }) => {
  console.log('contractorData', contractorData)
  console.log('token', token)
  const updateSavedObjFunion = async (data) => {
    console.log(data)
    let dataObj = {
      company: compensation.company,
      location: compensation.location,
      pin: data.pin
    }
    const resultGetValidPin = await getValidPin(token, dataObj);
    if (resultGetValidPin.status !== 200) {
      message.error('This pin is not unique you have to add unique pin!')
      return
    } else {
      console.log(contractorData.user.uid)
      console.log(activeCompany)

      let paramsObj = {
        user: contractorData.user.uid,
        company: compensation.company
      }
      const result = await updateContractorDetail(token, paramsObj, data);
      try {
        if (result.status) {
          message.success("Location added successfully..")
          // setIsEdit(false)
        } else {
          message.error("Some thing went wrong")
        }

      } catch (error) {
        message.error("Some thing went wrong")
      }
    }
  }

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
          <div className="flex-1 gx-text-grey">{compensation.pin}</div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Permission Level
          </div>
          <div className="flex-1 gx-text-grey">{compensation.role}</div>
        </div>
      </div>
      <ContractorDetailsEditModal
        visible={isEdit}
        updateSavedObjFun={updateSavedObjFunion}
        compensation={compensation}
        handleOk={() => setIsEdit(false)}
        handleCancel={() => setIsEdit(false)}
      />
    </div>
  );
};

export default ContractorDetail;
