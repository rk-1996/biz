import React from "react";
import {
  Form,
  Modal,
  Row,
  Col,
  Input,
  Button,
} from "antd";
const FormItem = Form.Item;

const ContractorDetailsEditModal = ({
  visible,
  handleOk,
  handleCancel,
  ...props
}) => {
  const { getFieldDecorator } = props.form;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("values", values);
      }
    });
  };

  return (
    <Modal
      title="Edit Contractor Detail"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
        <Col span={12} xs={24} md={12}>
            <FormItem label="Pin" className="display-block">
              {getFieldDecorator("pin", {
                rules: [{ required: true, message: "Please input pin!" }],
              })(<Input placeholder="Pin" />)}
            </FormItem>
          </Col>
          {/* <Col span={12} xs={24} md={12}>
            <FormItem label="Manager" className="display-block">
              {getFieldDecorator("manager", {
                rules: [
                  { required: true, message: "Please input manager name!" },
                ],
              })(
                <Select placeholder="Select Manager">
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                </Select>
              )}
            </FormItem>
          </Col> */}
          {/* <Col span={12} xs={24} md={12}>
            <FormItem label="Start Date" className="display-block">
              {getFieldDecorator("startDate", {
                rules: [
                  { required: true, message: "Please input start date!" },
                ],
              })(<DatePicker style={{ width: "100%" }} />)}
            </FormItem>
          </Col> */}
        </Row>
        <div className="flex-x center gx-mt-4">
          <FormItem className="gx-m-0">
            <Button
              type="secondary"
              className="login-form-button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Save
            </Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(ContractorDetailsEditModal);
export default WrappedModal;
