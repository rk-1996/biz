import React from "react";
import {
  Form,
  DatePicker,
  Row,
  Col,
  Button,
  Select,
  Input,
  Divider,
  Icon
} from "antd";
import SelectJob from 'components/Common/SelectJob';
import SelectDepartment from 'components/Common/SelectDepartment';
import SelectLocation from 'components/Common/SelectLocation';
import SelectPeopleManager from 'components/Common/SelectPeopleManager'

const FormItem = Form.Item;
const { Option } = Select;

const Employment = (props) => {
  const { setFormTab, onCompleteDetail, jobs, departments, people, activeCompanyDetails } = props;
  const { getFieldDecorator, setFieldsValue } = props.form;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.manager === undefined) {
          values.manager = 'NA'
        }
        console.log("values", values);
        onCompleteDetail(values, 'step2');
        setFormTab("3");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="gx-form-row0">
      <Row>
        <Col span={24}>
          <div className="gx-fs-xl gx-pt-3 gx-pb-3">Employment details</div>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Location" className="display-block">
            {getFieldDecorator("location", {
              rules: [
                { required: true, message: "Please select location!" },
              ],
            })(
              <Select
                placeholder="Select Location"
                dropdownRender={menu => (
                  <div>
                    {menu}
                  </div>
                )}
              >
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
          <FormItem label="Manager" className="display-block">
            {getFieldDecorator("manager", {
              rules: [
                // { required: true, message: "Please input manager name!" },
              ],
            })(
              <SelectPeopleManager people={people} onChange={(e) => {
                setFieldsValue({
                  manager: e
                })
              }} />
              // <Select placeholder="Select Manager">
              //   <Option value="A">A</Option>
              //   <Option value="B">B</Option>
              // </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Role" className="display-block">
            {getFieldDecorator("role", {
              rules: [{ required: true, message: "Please select role!" }],
            })(
              <Select placeholder="Select Role">
                <Option value="owner">Owner</Option>
                <Option value="manager">Manager</Option>
                <Option value="lead">Lead</Option>
                <Option value="basic">Basic</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Employee Class" className="display-block">
            {getFieldDecorator("employmentClass", {
              rules: [
                { required: true, message: "Please input employee class!" },
              ],
            })(
              <Select placeholder="Select Status">
                <Option value="Full Time(30+ Hours Per Week)">
                  Full Time(30+ Hours Per Week)
                </Option>
                <Option value="Part Time(20-29 Hours Per Week)">
                  Part Time(20-29 Hours Per Week)
                </Option>
                <Option value="Part Time(0-19 Hours Per Week)">
                  Part Time(0-19 Hours Per Week)
                </Option>
                <Option value="Seasonal (0-6 Months per year)">
                  Seasonal (0-6 Months per year)
                </Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={24}>
          <div className="gx-fs-xl gx-pt-3 gx-pb-3">Compensation</div>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Job Title" className="display-block">
            {getFieldDecorator("jobTitle", {
              rules: [{ required: true, message: "Please input job title!" }],
            })(
              <SelectJob onChange={(e) => {
                setFieldsValue({
                  jobTitle: e
                })
              }} />
            )}
          </FormItem>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Department" className="display-block">
            {getFieldDecorator("department", {
              rules: [{ required: true, message: "Please input department!" }],
            })(
              <SelectDepartment onChange={(e) => {
                setFieldsValue({
                  department: e
                })
              }} />
            )}
          </FormItem>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Employment Type" className="display-block">
            {getFieldDecorator("type", {
              rules: [
                { required: true, message: "Please input employment type!" },
              ],
            })(
              <Select placeholder="Select Type">
                <Option value="Salary/No Overtime">Salary/No Overtime</Option>
                <Option value="Salary/Eligible for overtime">
                  {" "}
                  Salary/Eligible for Overtime
                </Option>
                <Option value="Hourly">Hourly</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Amount" className="display-block">
            {getFieldDecorator("amount", {
              rules: [{ required: true, message: "Please input amount!" }],
            })(
              <Input
                style={{ width: "100%" }}
                prefix="$"
              />
            )}
          </FormItem>
        </Col>
        <Col span={8} xs={24} md={8}>
          <FormItem label="Per" className="display-block">
            {getFieldDecorator("per", {
              rules: [{ required: true, message: "Please input per!" }],
            })(
              <Select placeholder="Select per">
                <Option value="Hour">Hour</Option>
                <Option value="Week">Week</Option>
                <Option value="Month">Month</Option>
                <Option value="Year">Year</Option>
              </Select>
            )}
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
