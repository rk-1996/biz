import React, { useState } from "react";
import { Form, Input, DatePicker, Row, Col, Button, Radio, Select } from "antd";
import SelectJob from 'components/Common/SelectJob';
import SelectDepartment from 'components/Common/SelectDepartment';
const FormItem = Form.Item;
const { Option } = Select;

const Employment = (props) => {
  const [wageType, setWageType] = useState("fixed");
  const { setFormTab, onCompleteDetail, jobs, departments, activeCompanyDetails } = props;
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        onCompleteDetail({ ...values, wageType }, "step2");
        setFormTab("3");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="gx-form-row0">
      <Row>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Location" className="display-block">
            {getFieldDecorator("location", {
              rules: [
                { required: true, message: "Please select location!" },
              ],
            })(
              <Select placeholder="Select Location">
                {
                  activeCompanyDetails && activeCompanyDetails.locations && activeCompanyDetails.locations.length ?
                    activeCompanyDetails.locations.map((c, i) => {
                      return (
                        <Option value={c.lid}>{c.name}</Option>
                      )
                    }) : ""
                }
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Start Date" className="display-block">
            {getFieldDecorator("startDate", {
              rules: [{ required: true, message: "Please input start date!" }],
            })(<DatePicker format={'MM-DD-YYYY'} style={{ width: "100%" }} />)}
          </FormItem>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Job Title" className="display-block">
            {getFieldDecorator("jobTitle", {
              rules: [{ required: true, message: "Please select job title!" }],
            })(
              <SelectJob />
            )}
          </FormItem>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Department" className="display-block">
            {getFieldDecorator("department", {
              rules: [{ required: true, message: "Please select department!" }],
            })(
              <SelectDepartment />
            )}
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="Wage Type">
            <Radio.Group
              value={wageType}
              onChange={(e) => setWageType(e.target.value)}
            >
              <Radio value="fixed">Fixed dollar amount</Radio>
              <Radio value="hour">Hourly Rate</Radio>
            </Radio.Group>
            ,
          </FormItem>
        </Col>
        <Col span={24} className="gx-p-0">
          {wageType === "fixed" ? (
            <Row>
              <Col span={8} xs={24} md={8}>
                <FormItem
                  label="Default Fixed Dollar Amount"
                  className="display-block"
                >
                  {getFieldDecorator("defaultAmount", {
                    rules: [
                      { required: true, message: "Please input amount!" },
                    ],
                  })(<Input style={{ width: "100%" }} prefix="$" />)}
                </FormItem>
              </Col>
            </Row>
          ) : (
              <Row>
                <Col span={8} xs={24} md={8}>
                  <FormItem label="Hourly Rate" className="display-block">
                    {getFieldDecorator("hourlyAmount", {
                      rules: [
                        { required: true, message: "Please input amount!" },
                      ],
                    })(<Input style={{ width: "100%" }} prefix="$" />)}
                  </FormItem>
                </Col>
                <Col span={8} xs={24} md={8}>
                  <FormItem label="Default Hours" className="display-block">
                    {getFieldDecorator("defaultHours")(
                      <Input type="text" placeholder="Default Hours" />
                    )}
                  </FormItem>
                </Col>
              </Row>
            )}
        </Col>
        {/* <Col span={24}>
          <div className="gx-fs-xl gx-pt-3 gx-pb-3">Time Off</div>
        </Col>
        <Col  span={8} xs={24} md={8}>
          <FormItem label="Time off Policy" className="display-block">
            {getFieldDecorator("time_off_policy", {
              rules: [
                { required: true, message: "Please input per!" },
              ],
            })(
              <Select placeholder="Time off Policy">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>)}
          </FormItem>
        </Col>
        <Col  span={8} xs={24} md={8}>
          <FormItem label="sick time policy" className="display-block">
            {getFieldDecorator("sick_time_policy", {
              rules: [
                { required: true, message: "Please input per!" },
              ],
            })(
              <Select placeholder="sick time policy">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>)}
          </FormItem>
        </Col> */}
      </Row>
      <div className="flex-x center gx-pt-2">
        <FormItem>
          <Button
            type="secondary"
            className="login-form-button"
            onClick={() => setFormTab("1")}
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Continue
          </Button>
        </FormItem>
      </div>
    </Form>
  );
};

const WrappedModal = Form.create()(Employment);

export default WrappedModal;
