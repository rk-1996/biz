import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Row, Col, Button, Modal, Select, Radio } from "antd";
import stateList from "util/State";
import moment from 'moment';
import { updatePersonalDetail } from 'services/people';
import { useSelector } from "react-redux";
const FormItem = Form.Item;
const { Option } = Select;

const ContractorPersonalEditModal = ({
  visible,
  handleOk,
  handleCancel,
  ...props
}) => {
  const [loader, setLoader] = useState(false);
  const [type, setType] = useState("individual");
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { contractorData,  token, params, updateSavedObj } = props;
  const { company, location } = useSelector(x => x.common.activeCompany);

  useEffect(() => {
    if (type === "business") {
      setFieldsValue({
        businessName: contractorData.businessName,
        contactName: contractorData.contactName,
        ein: contractorData.ein,
      });
    } else {
      setFieldsValue({
        firstName: contractorData.firstName,
        lastName: contractorData.lastName,
        middleName: contractorData.middleName,
        dob: moment(contractorData.startDate),
        ssn: contractorData.ssn,
      });
    }
  }, [type, contractorData, setFieldsValue])

  useEffect(() => {
    if(contractorData) {
      setType(contractorData.type)
      setFieldsValue({
        email: contractorData.email,
        phone: contractorData.phone,
        street1: contractorData.address.street1,
        street2: contractorData.address.street2,
        city: contractorData.address.city,
        state: contractorData.address.state,
        zip: contractorData.address.zip
      })
      if (contractorData.type === "business") {
        setFieldsValue({
          businessName: contractorData.businessName,
          contactName: contractorData.contactName,
          ein: contractorData.ein,
        });
      } else {
        setFieldsValue({
          firstName: contractorData.firstName,
          lastName: contractorData.lastName,
          middleName: contractorData.middleName,
          dob: moment(contractorData.startDate),
          ssn: contractorData.ssn,
        });
      }
    }
  }, [contractorData, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoader(true);
        const obj = {
          businessName: type === "business" ? values.businessName : undefined,
          contactName: type === "business" ? values.contactName : undefined,
          ein: type === "business" ? values.ein : undefined,
          firstName: type === "individual" ?  values.firstName : undefined,
          lastName: type === "individual" ? values.lastName : undefined,
          middleName: type === "individual" ? values.middleName : undefined,
          phone: Number(values.phone),
          ssn: type === "individual" ? values.ssn : undefined,
          dob: type === "individual" ? values.dob : undefined,
          type: type,
          address: {
            street1: values.street1,
            street2: values.street2,
            city: values.city,
            zip: values.zip,
            state: values.state
          }
        }
        const result = await updatePersonalDetail(token, {...obj, ...params, actionType: "contractor"}, company, location);
        setLoader(false);
        if(result.status === 200) {
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
      <FormItem label="Contractor Type" className="gx-px-3">
        <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
          <Radio value="individual">Individual</Radio>
          <Radio value="business">Business</Radio>
        </Radio.Group>
      </FormItem>
      {type === "individual" ? (
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
              {getFieldDecorator("middleName")(<Input type="text" placeholder="Phone Number" />)}
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
            <FormItem label="Phone Number" className="display-block">
              {getFieldDecorator("phone", {
                rules: [
                  { min: 10, message: "Min length 10 is required!" },
                  { max: 10, message: "Max length 10 is required!" },
                  { required: true, message: "Please input phone number!" },
                ],
              })(<Input type="text" placeholder="Phone Number" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Date of birth" className="display-block">
              {getFieldDecorator("dob", {
                rules: [{ required: true, message: "Please input birthdate!" }],
              })(<DatePicker style={{ width: "100%" }} />)}
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
            <FormItem label="Social Security Number" className="display-block">
              {getFieldDecorator("ssn", {
                rules: [
                  { min: 9, message: "Min length 9 is required!" },
                  { max: 9, message: "Max length 9 is required!" },
                  { required: true, message: "Please input SSN!" },
                ],
              })(<Input placeholder="SSN" />)}
            </FormItem>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Business Name" className="display-block">
              {getFieldDecorator("businessName", {
                rules: [
                  { required: true, message: "Please input business name!" },
                ],
              })(<Input placeholder="Business Name" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Contact Name" className="display-block">
              {getFieldDecorator("contactName")(
                <Input placeholder="Contact Name" />
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="E-mail" className="display-block">
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input email!" }],
              })(<Input type="text" placeholder="Email" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Phone Number" className="display-block">
              {getFieldDecorator("phone", {
                rules: [
                  { min: 10, message: "Min length 10 is required!" },
                  { max: 10, message: "Max length 10 is required!" },
                  { required: true, message: "Please input phone number!" },
                ],
              })(<Input type="text" placeholder="Phone Number" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="EIN" className="display-block">
              {getFieldDecorator("ein", {
                rules: [
                  { min: 9, message: "Min length 9 is required!" },
                  { max: 9, message: "Max length 9 is required!" },
                  { required: true, message: "Please input EIN!" },
                ],
              })(<Input placeholder="EIN" />)}
            </FormItem>
          </Col>
        </Row>
      )}
      <Row>
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
            <Col span={12} xs={24} md={12}>
              <FormItem label="City" className="display-block">
                {getFieldDecorator("city", {
                  rules: [
                    { required: true, message: "Please input your city!" },
                  ],
                })(<Input type="text" placeholder="City" />)}
              </FormItem>
            </Col>
            <Col span={12} xs={24} md={12}>
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
            <Col span={12} xs={24} md={12}>
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

const WrappedModal = Form.create()(ContractorPersonalEditModal);
export default WrappedModal;
