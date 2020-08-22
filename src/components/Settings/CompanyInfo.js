import React from "react";
import { Button, Form, Input, Col, Row, Radio, Select } from "antd";
import stateList from "util/State";

const FormItem = Form.Item;
const { Option } = Select;

const CompanyInfo = (props) => {
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
    <div>
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Company Name" className="display-block">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ],
              })(<Input placeholder="Company Name" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Phone Number" className="display-block">
              {getFieldDecorator("phone", {
                rules: [
                  { min: 10, message: "Min length 10 is required!" },
                  { max: 10, message: "Max length 10 is required!" },
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ],
              })(<Input type="text" placeholder="Phone Number" />)}
            </FormItem>
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
              <Col span={8} xs={24} md={8}>
                <Form.Item label="Status">
                  {getFieldDecorator("status")(
                    <Radio.Group>
                      <Radio value={true}>Active</Radio>
                      <Radio value={false}>InActive</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="flex-x center gx-pt-3">
          <FormItem>
            <Button type="primary" htmlType="submit" className="gx-mb-0">
              Submit
            </Button>
          </FormItem>
        </div>
      </Form>
    </div>
  );
};

const WrappedModal = Form.create()(CompanyInfo);
export default WrappedModal;
