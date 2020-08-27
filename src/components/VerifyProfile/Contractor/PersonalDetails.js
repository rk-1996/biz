import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  // Checkbox,
  Button,
  Steps,
  Radio,
  Select,
} from "antd";
import moment from "moment";
import stateList from "./../../../util/State";

const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;

const PersonalDetails = (props) => {
  // const [isEmergency, setIsEmergency] = useState(true);
  const [type, setType] = useState(null);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { setCurrentStep, completedStep, formValues } = props;

  useEffect(() => {
    if (formValues) {
      console.log("formValues", formValues)
      setType(formValues.type);
      setTimeout(() => {
        const newObj = {
          phone: formValues.phone,
          city: formValues.address ? formValues.address.city : "",
          state: formValues.address ? formValues.address.state : "",
          street1: formValues.address ? formValues.address.street1 : "",
          street2: formValues.address ? formValues.address.street2 : "",
          zip: formValues.address ? formValues.address.zip : "",
          emergencyFullName: formValues.emergencyInfo ? formValues.emergencyInfo.fullName : "",
          emergencyRelationship: formValues.emergencyInfo ? formValues.emergencyInfo.relation : "",
          emergencyPhone: formValues.emergencyInfo ? formValues.emergencyInfo.phone : "",
          emergencyEmail: formValues.emergencyInfo ? formValues.emergencyInfo.email : "",
        };
        if (formValues.type === "individual") {
          setFieldsValue({
            ...newObj,
            dob: moment(formValues.dob),
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            middleName: formValues.middleName,
            ssn: formValues.ssn,
          });
        } else {
          setFieldsValue({
            ...newObj,
            businessName: formValues.businessName,
            ein: formValues.ein,
            startDate: formValues.compensation && formValues.compensation.startDate ? moment(formValues.compensation.startDate) : null,
          });
        }
      }, 500)
    }
  }, [setFieldsValue, formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const emergencyInfo = {
          fullName: values.emergencyFullName ? values.emergencyFullName : undefined,
          relation: values.emergencyRelationship ? values.emergencyRelationship : undefined,
          phone: values.emergencyPhone ? +values.emergencyPhone : undefined,
          email: values.emergencyEmail ? values.emergencyEmail : undefined
        }
        Object.keys(emergencyInfo).forEach(key => emergencyInfo[key] === undefined && delete emergencyInfo[key]);

        let newObj = {
          dob: values.dob ? moment(values.dob._d, "YYYY-MM-DD") : null,
          firstName: values.firstName,
          lastName: values.lastName,
          middleName: values.middleName ? values.middleName : undefined,
          phone: +values.phone,
          ssn: values.ssn,
          businessName: values.businessName,
          ein: values.ein,
          address: {
            city: values.city,
            state: values.state,
            street1: values.street1,
            street2: values.street2 ? values.street2 : undefined,
            zip: values.zip ? +values.zip : undefined
          },
          compensation: {
            startDate: values.startDate ? moment(values.startDate._d, "YYYY-MM-DD") : null,
          }
        }
        if (Object.keys(emergencyInfo).length > 0) {
          newObj = {
            ...newObj,
            emergencyInfo
          }
        }
        completedStep({
          ...newObj,
          type
        }, true);
      }
    });
  };

  return (
    <div className="verify-form-container">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-p-4" style={{ width: "100%" }}>
            <div className="gx-pb-5">
              <Steps size="small" current={0}>
                <Step title="Basic Info" />
                {/* <Step title="Contractor Details" /> */}
                {/* <Step title="Sign Documents" /> */}
              </Steps>
            </div>
            <div className="gx-fs-xxxl text-center gx-pb-4">Contract Info</div>
            <Form onSubmit={handleSubmit} className="gx-form-row0">
              <FormItem label="Contractor Type" className="gx-px-3">
                <Radio.Group
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <Radio value="individual">Individual</Radio>
                  <Radio value="business">Business</Radio>
                </Radio.Group>
                ,
              </FormItem>
              {type === "individual" ? (
                <Row>
                  <Col span={8} xs={24} md={8}>
                    <FormItem label="First Name" className="display-block">
                      {getFieldDecorator("firstName", {
                        rules: [
                          {
                            required: true,
                            message: "Please input first name!",
                          },
                        ],
                      })(<Input placeholder="First Name" />)}
                    </FormItem>
                  </Col>
                  <Col span={8} xs={24} md={8}>
                    <FormItem label="Middle Name" className="display-block">
                      {getFieldDecorator("middleName")(<Input type="text" placeholder="Phone Number" />)}
                    </FormItem>
                  </Col>
                  <Col span={8} xs={24} md={8}>
                    <FormItem label="Last Name" className="display-block">
                      {getFieldDecorator("lastName", {
                        rules: [
                          {
                            required: true,
                            message: "Please input last name!",
                          },
                        ],
                      })(<Input type="text" placeholder="Last Name" />)}
                    </FormItem>
                  </Col>
                  <Col span={8} xs={24} md={8}>
                    <FormItem label="Phone Number" className="display-block">
                      {getFieldDecorator("phone", {
                        rules: [
                          { min: 10, message: "Min length 10 is required!" },
                          { max: 10, message: "Max length 10 is required!" },
                          {
                            required: true,
                            message: "Please input phone number!",
                          },
                        ],
                      })(<Input type="text" placeholder="Phone Number" />)}
                    </FormItem>
                  </Col>
                  <Col span={8} xs={24} md={8}>
                    <FormItem label="Date of birth" className="display-block">
                      {getFieldDecorator("dob", {
                        rules: [
                          {
                            required: true,
                            message: "Please input birthdate!",
                          },
                        ],
                      })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                    </FormItem>
                  </Col>
                  <Col span={8} xs={24} md={8}>
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
                    <Col span={8} xs={24} md={8}>
                      <FormItem label="Business Name" className="display-block">
                        {getFieldDecorator("businessName", {
                          rules: [
                            {
                              required: true,
                              message: "Please input business name!",
                            },
                          ],
                        })(<Input placeholder="Business Name" />)}
                      </FormItem>
                    </Col>
                    <Col span={8} xs={24} md={8}>
                      <FormItem label="Phone Number" className="display-block">
                        {getFieldDecorator("phone", {
                          rules: [
                            { min: 10, message: "Min length 10 is required!" },
                            { max: 10, message: "Max length 10 is required!" },
                            {
                              required: true,
                              message: "Please input phone number!",
                            },
                          ],
                        })(<Input type="text" placeholder="Phone Number" />)}
                      </FormItem>
                    </Col>
                    <Col span={8} xs={24} md={8}>
                      <FormItem label="Start Date" className="display-block">
                        {getFieldDecorator("startDate", {
                          rules: [
                            {
                              required: true,
                              message: "Please input start date!",
                            },
                          ],
                        })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                      </FormItem>
                    </Col>
                    <Col span={8} xs={24} md={8}>
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
                            { min: 5, message: "Min length 5 is required!" },
                            { max: 5, message: "Max length 5 is required!" },
                            { required: true, message: "Please input your zip!" },
                          ],
                        })(<Input type="text" placeholder="Zip" />)}
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div>
                {/* <div>
                  <Form.Item>
                    <Checkbox
                      checked={isEmergency}
                      onChange={(e) => setIsEmergency(e.target.checked)}
                    >
                      Have Employee enter Emergency Contact Information
                    </Checkbox>
                    ,
                  </Form.Item>
                </div> */}
                {/* {!isEmergency && ( */}
                <Row>
                  <Col span={24} xs={24} md={24} className="gx-pt-3 gx-pb-1">
                    Emergency Contact:
                    </Col>
                  <Col span={8} xs={24} md={8}>
                    <FormItem label="Full Name" className="display-block">
                      {getFieldDecorator("emergencyFullName")(<Input placeholder="Full Name" />)}
                    </FormItem>
                  </Col>
                  <Col span={8} xs={24} md={8}>
                    <FormItem label="Relationship" className="display-block">
                      {getFieldDecorator("emergencyRelationship")(<Input placeholder="Relationship" />)}
                    </FormItem>
                  </Col>
                  <Col span={8} xs={24} md={8}>
                    <FormItem label="Phone Number" className="display-block">
                      {getFieldDecorator("emergencyPhone", {
                        rules: [
                          { min: 10, message: "Min length 10 is required!" },
                          { max: 10, message: "Max length 10 is required!" },
                        ],
                      })(<Input placeholder="Phone Number" />)}
                    </FormItem>
                  </Col>
                  <Col span={8} xs={24} md={8}>
                    <FormItem label="Email" className="display-block">
                      {getFieldDecorator("emergencyEmail")(<Input placeholder="Email" />)}
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div className="flex-x center gx-pt-5">
                <FormItem>
                  <Button
                    type="secondary"
                    className="min-width-150"
                    onClick={() => setCurrentStep("welcome")}
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="min-width-150"
                  >
                    Save
                  </Button>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrappedSignUpForm = Form.create()(PersonalDetails);

export default WrappedSignUpForm;
