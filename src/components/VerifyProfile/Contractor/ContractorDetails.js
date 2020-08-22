import React, { useEffect } from "react";
import { Form, Input, Row, Col, Button, Select, Steps } from "antd";
import stateList from "../../../util/State";

const FormItem = Form.Item;
const { Option } = Select;
const { Step } = Steps;

const TaxDetails = (props) => {
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { setCurrentStep, completedStep, formValues } = props;

  useEffect(() => {
    setFieldsValue({
      city: formValues.city,
      ssn_ein: formValues.ssn_ein,
      state: formValues.state,
      street1: formValues.street1,
      street2: formValues.street2,
      zip: formValues.zip,
    });
  }, [setFieldsValue, formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("values", values);
        completedStep(values);
        setCurrentStep(3);
      }
    });
  };

  return (
    <div className="verify-form-container">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-p-4" style={{ width: "100%" }}>
            <div className="gx-pb-5">
              <Steps size="small" current={1}>
                <Step title="Basic Info" />
                <Step title="Contractor Details" />
                <Step title="Sign Documents" />
              </Steps>
            </div>
            <Form onSubmit={handleSubmit} className="gx-form-row0">
              <Row>
                {/* <Col span={8} xs={24} md={8}>
                  <FormItem label="SSN/EIN" className="display-block">
                    {getFieldDecorator("ssn_ein")(
                      <Input placeholder="SSN/EIN" />
                    )}
                  </FormItem>
                </Col> */}
                {/* <Col span={24} xs={24} md={24} className="gx-pt-3 gx-pb-1">
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
                            {
                              required: true,
                              message: "Please input your city!",
                            },
                          ],
                        })(<Input type="text" placeholder="City" />)}
                      </FormItem>
                    </Col>
                    <Col span={8} xs={24} md={8}>
                      <FormItem label="State" className="display-block">
                        {getFieldDecorator("state", {
                          rules: [
                            {
                              required: true,
                              message: "Please select your state!",
                            },
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
                            {
                              required: true,
                              message: "Please input your zip!",
                            },
                          ],
                        })(<Input type="text" placeholder="Zip" />)}
                      </FormItem>
                    </Col>
                  </Row>
                </Col> */}
              </Row>
              <div className="flex-x center gx-pt-5">
                <FormItem>
                  <Button
                    type="secondary"
                    className="min-width-150"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="min-width-150"
                  >
                    Continue
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

const WrappedSignUpForm = Form.create()(TaxDetails);

export default WrappedSignUpForm;
