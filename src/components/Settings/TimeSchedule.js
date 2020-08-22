import React from 'react';
import { Checkbox, Form, Select, Row, Col, Button, TimePicker, Icon, Input } from "antd";
import moment from 'moment';
import { weekdays } from 'util/constant';

const FormItem = Form.Item;
const { Option } = Select;

const TimeSchedule = (props) => {
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
        Punch Clock Settings
      </div>
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Form.Item>
          {getFieldDecorator('preventClockIn', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox>Prevent Early Clock in</Checkbox>)}
        </Form.Item>
        <div>
          <Form.Item label="Early Clock in Limit:">
            {getFieldDecorator('earlyClockLimit', {
              rules: [
                {
                  required: true,
                  message: "Please input clock limit!",
                },
              ],
            })(<Input suffix="Minutes"/>)}
          </Form.Item>
        </div>
        <Form.Item>
          {getFieldDecorator('autoClockOutOvertime', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox>Auto-Clock Out at Overtime</Checkbox>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('autoClockOutShiftEnd', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox>Auto-Clock out at Shift End</Checkbox>)}
        </Form.Item>
        <div className="gx-fs-xl gx-pb-4 gx-pt-2">
          Schedule Settings
        </div>
        <div style={{marginBottom: '12px'}} className="ant-form-item-required">
          Operation Hours
        </div>
        <div className="flex-x align-center">
          <div className="gx-mr-4">
            <FormItem className="display-block">
              {getFieldDecorator("operationStartHour", {
                rules: [
                  { required: true, message: "Select start hour!" },
                ],
              })(
                <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              )}
            </FormItem>
          </div>
          <div style={{ marginBottom: '12px', marginRight: '22px' }}>
            <Icon type="line" />
          </div>
          <div>
            <FormItem className="display-block">
              {getFieldDecorator("operationEndHour", {
                rules: [
                  { required: true, message: "Select end hour!" },
                ],
              })(
                <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              )}
            </FormItem>
          </div>
        </div>
        <Row>
          <Col span={12} xs={24} md={12} className="gx-p-0">
            <FormItem label="Schedule Start Day" className="display-block">
              {getFieldDecorator("startDay", {
                rules: [
                  { required: true, message: "Please select start day!" },
                ],
              })(
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select Start Date"
                >
                  {weekdays.map((d, i) => {
                    return (
                      <Option key={i} value={d}>
                        {d}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
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

const WrappedModal = Form.create()(TimeSchedule);
export default WrappedModal;
