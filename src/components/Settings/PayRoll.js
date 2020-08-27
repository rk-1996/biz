import React from 'react';
import {
  Checkbox,
  Form,
  Select,
  Button,
  DatePicker,
  InputNumber
} from "antd";

const FormItem = Form.Item;
const { Option } = Select;

const PayRoll = (props) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values', values);
      }
    });
  };

  return (
    <div>
      <div className="gx-fs-xl gx-pb-3 gx-pt-3">
        Payroll Cycle
      </div>
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Form.Item label="Payroll is:">
          {getFieldDecorator('payroll', {
            rules: [
              {
                required: true,
                message: "Please select payroll!",
              },
            ],
          })(
            <Select
              showSearch
              style={{ width: "200px" }}
              placeholder="Select Payroll"
            >
              <Option value="Bi-Weekly">Bi-Weekly</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Payroll Cycle Start Date:">
          {getFieldDecorator('payrollStartDate', {
            rules: [
              {
                required: true,
                message: "Please select payroll start date!",
              },
            ],
          })(
            <DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />
          )}
        </Form.Item>
        <div className="gx-fs-xl gx-pb-3 gx-pt-3">
          Overtime Settings
        </div>
        <div className="flex-x align-center">
          <div>
            <Form.Item>
              {getFieldDecorator('preventClockIn', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>After</Checkbox>)}
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('hoursPerDay')(<InputNumber />)}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-2 gx-mr-3">
            hours Per Day, the base pay is
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('hourly')(<InputNumber />)}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-2">
            x Hourly
          </div>
        </div>
        <div>
          <Form.Item>
            {getFieldDecorator('isOverHour', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>California: Any day over 12 hours is 2.0x</Checkbox>)}
          </Form.Item>
        </div>
        <div className="gx-fs-xl gx-pb-3 gx-pt-3">
          Breaks
        </div>
        <div className="flex-x align-center flex-wrap">
          <div>
            <Form.Item>
              {getFieldDecorator('preventClockIn', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>Employees get a </Checkbox>)}
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('hoursPerDay')(<InputNumber />)}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-2 gx-mr-3">
            min
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('paidType')(
                <Select
                  showSearch
                  style={{ width: "100px" }}
                  placeholder="Select Type"
                >
                  <Option value="Paid">Paid</Option>
                </Select>
              )}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-3 gx-mr-3">
            break every
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('breakEvery')(<InputNumber />)}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-3 gx-mr-3">
            hours and it is
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('optional')(
                <Select
                  showSearch
                  style={{ width: "100px" }}
                  placeholder="Select Type"
                >
                  <Option value="Optional">Optional</Option>
                </Select>
              )}
            </Form.Item>
          </div>
        </div>
        <div className="flex-x center gx-pt-3">
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="gx-mb-0"
            >
              Submit
            </Button>
          </FormItem>
        </div>
      </Form>
    </div>
  );
};

const WrappedModal = Form.create()(PayRoll);
export default WrappedModal;
