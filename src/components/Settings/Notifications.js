import React from 'react';
import {
  Checkbox,
  Form,
  Button,
  InputNumber
} from "antd";

const FormItem = Form.Item;

const Notifications = (props) => {
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
        Manager Notifications
      </div>
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <div className="flex-x align-center gx-pt-3">
          <div className="ant-form-item gx-mr-3">
            Alert Type
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('managerAlertTypeSms', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>SMS</Checkbox>)}
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('managerAlerttypeEmail', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>E-mail</Checkbox>)}
            </Form.Item>
          </div>
        </div>
        <div className="flex-x align-center">
          <div>
            <Form.Item>
              {getFieldDecorator('isNotifyManagerOnPersonNotClock', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>Notify managers when a person does not clock in after</Checkbox>)}
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('personNotClockMinutes')(<InputNumber/>)}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-2 gx-mr-3">
            minutes
          </div>
        </div>
        <div className="flex-x align-center">
          <div>
            <Form.Item>
              {getFieldDecorator('isNotifyOnEmployeeHitOvertime', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>Notify managers when a person hits overtime</Checkbox>)}
            </Form.Item>
          </div>
        </div>
        <div className="flex-x align-center">
          <div>
            <Form.Item>
              {getFieldDecorator('isNotifyEmployeeOnOvertime', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>Notify managers when person is </Checkbox>)}
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('EmployeeOvertimeMinutes')(<InputNumber/>)}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-2 gx-mr-3">
            minutes from  overtime
          </div>
        </div>
        <div className="flex-x align-center">
          <div>
            <Form.Item>
              {getFieldDecorator('isNotifyEmployeeOnApproachHour', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>Notify manager when employee approaches </Checkbox>)}
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('employeeHoursAWeek')(<InputNumber/>)}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-2 gx-mr-3">
            hours a week
          </div>
        </div>
        {/* Person Notification */}
        <div className="gx-fs-xl gx-pb-3 gx-pt-3">
          Person Notifications
        </div>
        <div className="flex-x align-center gx-pt-3">
          <div className="ant-form-item gx-mr-3">
            Alert Type
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('personAlertTypeSms', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>SMS</Checkbox>)}
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('personAlerttypeEmail', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>E-mail</Checkbox>)}
            </Form.Item>
          </div>
        </div>
        <div className="flex-x align-center">
          <div>
            <Form.Item>
              {getFieldDecorator('isNotifyOnPersonHitOvertime', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>Notify person when they hit overtime</Checkbox>)}
            </Form.Item>
          </div>
        </div>
        <div className="flex-x align-center">
          <div>
            <Form.Item>
              {getFieldDecorator('isNotifyPersonOnOvertime', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>Notify person when they are</Checkbox>)}
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('personOvertimeMinutes')(<InputNumber/>)}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-2 gx-mr-3">
            minutes from  overtime
          </div>
        </div>
        <div className="flex-x align-center">
          <div>
            <Form.Item>
              {getFieldDecorator('isNotifyPersonOnApproachHour', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>Notify person when they approach</Checkbox>)}
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              {getFieldDecorator('personHoursAWeek')(<InputNumber/>)}
            </Form.Item>
          </div>
          <div className="ant-form-item gx-ml-2 gx-mr-3">
            hours a week
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

const WrappedModal = Form.create()(Notifications);
export default WrappedModal;
