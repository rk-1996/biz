import React, { useState } from "react";
import { Modal } from "antd";
import { List, Icon, Button } from "antd";

const AssignDepartment = ({
  visible,
  handleOk,
  handleCancel,
  departments,
  assignedMember,
}) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <Modal
      title={
        assignedMember
          ? `${assignedMember.firstName} ${assignedMember.lastName}`
          : ""
      }
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
      width={300}
    >
      <List
        dataSource={departments}
        renderItem={(item) => (
          <List.Item
            className="flex-x cursor-pointer"
            onClick={() => setSelectedJob(item)}
          >
            <div className="flex-1">{item.name}</div>
            {selectedJob && item.name === selectedJob.name && (
              <div>
                <Icon type="check-circle" />
              </div>
            )}
          </List.Item>
        )}
      />
      <div className="flex-x center gx-pt-2">
        <Button type="primary" className="gx-mb-0">
          Assign
        </Button>
      </div>
    </Modal>
  );
};

export default AssignDepartment;
