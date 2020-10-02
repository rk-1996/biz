import React, { useEffect, useState } from "react";
import { Form, Modal, DatePicker, Row, Col, Input, Select, Button } from "antd";
import moment from 'moment';
import { updateEmploymentDetail } from 'services/people';
import SelectDepartment from 'components/Common/SelectDepartment';

const FormItem = Form.Item;
const { Option } = Select;

const EmployeeEditModal = ({ visible, handleOk, department, handleCancel, activeCompany, ...props }) => {
  const [loader, setLoader] = useState(false);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { employmentDetails, token, params, updateSavedObj } = props;

  useEffect(() => {
    if (employmentDetails) {
      setFieldsValue({
        pin: employmentDetails.pin,
        manager: employmentDetails.manager,
        startDate: moment(employmentDetails.startDate),
        employmentClass: employmentDetails.type,
        role: employmentDetails.role
      });
    }
  }, [employmentDetails, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoader(true);
        const obj = {
          pin: values.pin,
          manager: values.manager,
          startDate: moment(values.startDate),
          type: values.employmentClass,
          company: activeCompany.company,
          location: activeCompany.location,
          role: values.role
        }
        const result = await updateEmploymentDetail(token, { ...obj, id: params.id });
        setLoader(false);
        if (result.status === 200) {
          updateSavedObj(result.data);
          handleCancel();
        }
      }
    });
  };

  return (
    <Modal
      title="Edit Employee Detail"
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
          <Col span={8} xs={24} md={12}>
            <FormItem label="Department" className="display-block">
              {getFieldDecorator("department", {
                rules: [
                  { required: true, message: "Please select department!" },
                ],
              })(
                <SelectDepartment selected={department} />
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
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
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Start Date" className="display-block">
              {getFieldDecorator("startDate", {
                rules: [
                  { required: true, message: "Please input start date!" },
                ],
              })(<DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Employee Class" className="display-block">
              {getFieldDecorator("employmentClass", {
                rules: [
                  { required: true, message: "Please input employee class!" },
                ],
              })(
                <Select placeholder="Select Status">
                  <Option value="Full Time(30+ Hours Per Week)">
                    Full Time(30+ Hours Per Week)
                </Option>
                  <Option value="Part Time(20-29 Hours Per Week)">
                    Part Time(20-29 Hours Per Week)
                </Option>
                  <Option value="Part Time(0-19 Hours Per Week)">
                    Part Time(0-19 Hours Per Week)
                </Option>
                  <Option value="Seasonal (0-6 Months per year)">
                    Seasonal (0-6 Months per year)
                </Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Role" className="display-block">
              {getFieldDecorator("role", {
                rules: [{ required: true, message: "Please select role!" }],
              })(
                <Select placeholder="Select Role">
                  <Option value="owner">Owner</Option>
                  <Option value="manager">Manager</Option>
                  <Option value="lead">Lead</Option>
                  <Option value="basic">Basic</Option>
                </Select>
              )}
            </FormItem>
          </Col>
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
              loading={loader}
            >
              Save
            </Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(EmployeeEditModal);
export default WrappedModal;
