import React from "react";
import { Form, Input, Row, Col, Button } from "antd";
const FormItem = Form.Item;

const TaxDetail = (props) => {
  const { setFormTab, onCompleteDetail, formValues } = props;
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("values", values);
        onCompleteDetail(values, 'step3');
        setFormTab("4");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="gx-form-row0">
      <Row>
        {formValues && formValues.contractor_type === "business" ? (
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
        ) : (
          <Col span={8} xs={24} md={8}>
            <FormItem label="SOCIAL SECURITY NUMBER" className="display-block">
              {getFieldDecorator("ssn", {
                rules: [
                  { min: 9, message: "Min length 9 is required!" },
                  { max: 9, message: "Max length 9 is required!" },
                  { required: true, message: "Please input SSN!" },
                ],
              })(<Input placeholder="SSN" />)}
            </FormItem>
          </Col>
        )}
      </Row>
      <div className="flex-x center gx-pt-2">
        <FormItem>
          <Button
            type="secondary"
            className="login-form-button"
            onClick={() => setFormTab("2")}
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

const WrappedModal = Form.create()(TaxDetail);
export default WrappedModal;
