import React, { useState, useEffect } from "react";
import {
  Form,
  Modal,
  Row,
  Col,
  Input,
  Button,
  Radio,
  DatePicker,
} from "antd";
import moment from "moment";
import { updateCompansationDetail } from "services/people";
import SelectJob from 'components/Common/SelectJob';
import SelectDepartment from 'components/Common/SelectDepartment';

const FormItem = Form.Item;

const CompensationEditModal = ({
  visible,
  handleOk,
  handleCancel,
  jobs,
  departments,
  activeCompany,
  ...props
}) => {
  const [loader, setLoader] = useState(false);
  const [wageType, setWageType] = useState("fixed");
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { compensation, token, params, updateSavedObj } = props;

  useEffect(() => {
    if (compensation) {
      setWageType(compensation.type);
      setFieldsValue({
        effectiveDate: moment(compensation.effectiveDate),
        jobTitle: compensation.jobTitle,
        department: compensation.department,
        per: compensation.per,
        reasonofChange: "",
      });
      setTimeout(() => {
        if (compensation.type === "fixed") {
          setFieldsValue({
            rate: compensation.rate,
          });
        } else {
          setFieldsValue({
            hourlyAmount: compensation.hasOwnProperty('rate') ? compensation.rate : "",
            defaultHours: compensation.hasOwnProperty('defaultHours') ? compensation.defaultHours : "",
          });
        }
      }, 300);
    }
  }, [compensation, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      console.log('values', values)
      if (!err) {
        const obj = {
          department: values.department,
          jobTitle: values.jobTitle,
          rate: values.rate ? Number(values.rate) : null,
          type: wageType,
          effectiveDate: moment(values.effectiveDate),
          reasonofChange: values.reasonofChange,
        };
        if (obj.type === "fixed") {
          obj['rate'] = Number(values.rate);
        } else {
          obj['rate'] = Number(values.hourlyAmount);
          obj['defaultHours'] = Number(values.defaultHours);
        }
        console.log("obj", obj);
        setLoader(true);
        setLoader(true);
        const result = await updateCompansationDetail(token, {
          ...obj,
          id: params.id,
          location: activeCompany.location,
          company: activeCompany.company,
          actionType: "contractor",
        });
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
      title="Edit Compensation Detail"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Start Date" className="display-block">
              {getFieldDecorator("effectiveDate", {
                rules: [
                  { required: true, message: "Please input start date!" },
                ],
              })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Job Title" className="display-block">
              {getFieldDecorator("jobTitle", {
                rules: [{ required: true, message: "Please input job title!" }],
              })(
                <SelectJob selected={compensation.jobTitle} />
              )}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={12}>
            <FormItem label="Department" className="display-block">
              {getFieldDecorator("department", {
                rules: [
                  { required: true, message: "Please select department!" },
                ],
              })(
                <SelectDepartment selected={compensation.department} />
              )}
            </FormItem>
          </Col>
          {/* <Col span={12} xs={24} md={12}>
            <FormItem label="Wage Type" className="display-block">
              {getFieldDecorator("wage_type", {
                rules: [
                  { required: true, message: "Please input wage type!" },
                ],
              })(
                <Select placeholder="Select Type">
                  <Option value="Hourly">Hourly</Option>
                  <Option value="Salary/No Overtime">Salary/No Overtime</Option>
                  <Option value=" Salary/Eligible for overtime">
                    {" "}
                    Salary/Eligible for overtime
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col> */}
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
                <Col span={12} xs={24} md={12}>
                  <FormItem
                    label="Default Fixed Dollar Amount"
                    className="display-block"
                  >
                    {getFieldDecorator("rate", {
                      rules: [
                        { required: true, message: "Please input amount!" },
                      ],
                    })(<Input style={{ width: "100%" }} prefix="$" />)}
                  </FormItem>
                </Col>
              </Row>
            ) : (
                <Row>
                  <Col span={12} xs={24} md={12}>
                    <FormItem label="Hourly Rate" className="display-block">
                      {getFieldDecorator("hourlyAmount", {
                        rules: [
                          { required: true, message: "Please input amount!" },
                        ],
                      })(<Input style={{ width: "100%" }} prefix="$" />)}
                    </FormItem>
                  </Col>
                  <Col span={12} xs={24} md={12}>
                    <FormItem label="Default Hours" className="display-block">
                      {getFieldDecorator("defaultHours")(
                        <Input type="text" placeholder="Default Hours" />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              )}
          </Col>
          <Col span={24} xs={24} md={24}>
            <FormItem label="Reason for Change" className="display-block">
              {getFieldDecorator("reasonofChange", {
                rules: [{ required: true, message: "Please input reason!" }],
              })(<Input type="text" placeholder="Reason" />)}
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

const WrappedModal = Form.create()(CompensationEditModal);
export default WrappedModal;
