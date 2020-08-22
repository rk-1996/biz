import React from "react";
import { Modal, Button } from "antd";
import { withRouter } from 'react-router-dom';

const ChooseEmployeeModal = ({
  visible,
  handleOk,
  handleCancel,
  ...props
}) => {
  return (
    <Modal
      title="Choose Employee Type"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      <div className="text-center flex-x center">
        <Button type="primary" onClick={() => props.history.push('/people/check-email/employee')}>Add an Employee</Button>
        <Button type="primary" onClick={() => props.history.push('/people/check-email/contractor')}>Add a Contractor</Button>
      </div>
    </Modal>
  );
};

export default withRouter(ChooseEmployeeModal);
