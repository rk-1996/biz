import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, Input, DatePicker, Row, Col, Button, Modal, Select } from "antd";
import stateList from "util/State";
import { updatePersonalDetail } from 'services/people';
import { useSelector } from "react-redux";
const FormItem = Form.Item;
const { Option } = Select;

const EditPersonalDetailModal = ({
  visible,
  handleOk,
  handleCancel,
  ...props
}) => {
  const [loader, setLoader] = useState(false);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { employeeData, token, params, updateSavedObj } = props;

  const { company, location } = useSelector(x => x.common.activeCompany);

  useEffect(() => {
    if (employeeData) {
      console.log('employeeData', employeeData)
      setFieldsValue({
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        middleName: employeeData.middleName,
        dob: moment(employeeData.dob),
        email: employeeData.email,
        ssn: employeeData.ssn,
        phone: employeeData.phone,
        street1: employeeData.address.street1,
        street2: employeeData.address.street2,
        city: employeeData.address.city,
        zip: employeeData.address.zip,
        state: employeeData.address.state,
      });
    }
  }, [employeeData, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoader(true);
        console.log("values", values);
        const obj = {
          firstName: values.firstName,
          lastName: values.lastName,
          middleName: values.middleName,
          dob: values.dob,
          phone: Number(values.phone),
          ssn: values.ssn,
          address: {
            street1: values.street1,
            street2: values.street2,
            city: values.city,
            zip: parseInt(values.zip),
            state: values.state
          }
        }
        const result = await updatePersonalDetail(token, { ...obj, ...params, actionType: "employee" }, company, location);
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
      title="Edit Personal Detail"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          <Col span={12} xs={24} md={12}>
            <FormItem label="First Name" className="display-block">
              {getFieldDecorator("firstName", {
                rules: [
                  { required: true, message: "Please input first name!" },
                ],
              })(<Input placeholder="First Name" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Middle Name" className="display-block">
              {getFieldDecorator("middleName")(
                <Input type="text" placeholder="Phone Number" />
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Last Name" className="display-block">
              {getFieldDecorator("lastName", {
                rules: [{ required: true, message: "Please input last name!" }],
              })(<Input type="text" placeholder="Last Name" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Date ofs birth" className="display-block">
              {getFieldDecorator("dob", {
                rules: [{ required: true, message: "Please input birthdate!" }],
              })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Email" className="display-block">
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input email!" }],
              })(<Input disabled type="text" placeholder="Email" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Phone Number" className="display-block">
              {getFieldDecorator("phone", {
                rules: [
                  { required: true, message: "Please input phone number!" },
                  { min: 10, message: "Min length 10 is required!" },
                  { max: 10, message: "Max length 10 is required!" },
                ],
              })(<Input type="text" placeholder="Phone Number" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem
              label="Social Security Number"
              className="display-block"
            >
              {getFieldDecorator("ssn", {
                rules: [
                  { min: 9, message: "Min length 9 is required!" },
                  { max: 9, message: "Max length 9 is required!" },
                  { required: true, message: "Please input SSN!" },
                ],
              })(<Input placeholder="Social Security Number" />)}
            </FormItem>
          </Col>
          <Col span={24} xs={24} md={24} className="gx-pt-3 gx-pb-1">
            Address:
          </Col>
          <Col span={24} className="gx-p-0">
            <Row>
              <Col span={12} xs={24} md={12}>
                <FormItem label="Street 1" className="display-block">
                  {getFieldDecorator("street1", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your address street1!",
                      },
                    ],
                  })(<Input type="text" placeholder="Street 1" />)}
                </FormItem>
              </Col>
              <Col span={12} xs={24} md={12}>
                <FormItem label="Street 2" className="display-block">
                  {getFieldDecorator("street2")(
                    <Input type="text" placeholder="Street 2" />
                  )}
                </FormItem>
              </Col>
              <Col span={8} xs={24} md={8}>
                <FormItem label="City" className="display-block">
                  {getFieldDecorator("city", {
                    rules: [
                      { required: true, message: "Please input your city!" },
                    ],
                  })(<Input type="text" placeholder="City" />)}
                </FormItem>
              </Col>
              <Col span={8} xs={24} md={8}>
                <FormItem label="State" className="display-block">
                  {getFieldDecorator("state", {
                    rules: [
                      { required: true, message: "Please select your state!" },
                    ],
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="State"
                    >
                      {stateList.map((s, i) => {
                        return (
                          <Option key={i} value={s.abbreviation}>
                            {s.abbreviation}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8} xs={24} md={8}>
                <FormItem label="Zip" className="display-block">
                  {getFieldDecorator("zip", {
                    rules: [
                      // { min: 5, message: "Min length 5 is required!" },
                      // { max: 5, message: "Max length 5 is required!" },
                      { required: true, message: "Please input your zip!" },
                    ],
                  })(<Input type="text" placeholder="Zip" />)}
                </FormItem>
              </Col>
            </Row>
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
              loading={loader}
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

const WrappedModal = Form.create()(EditPersonalDetailModal);
export default WrappedModal;
