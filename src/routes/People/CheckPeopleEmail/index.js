import React, { useState } from 'react';
import {
  Breadcrumb,
  Icon,
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  message
} from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { employeeExist } from './../../../services/people';
import {
  newAdedEmployeeEmailFun
} from "appRedux/actions/People";
const FormItem = Form.Item;

const CheckPeopleEmail = (props) => {
  const [loading, setloading] = useState(false);
  const { match: { params }, token, activeCompany, activeLocation } = props;

  const { getFieldDecorator } = props.form;
  const { newAdedEmployeeEmailFun } = props
  const handleSubmit = (e) => {
    console.log("newAdedEmployeeEmail", newAdedEmployeeEmailFun)
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const param = {
          ...values,
          company: activeCompany,
          location: activeLocation
        }
        setloading(true)
        const result = await employeeExist(token, param, params.id);
        setloading(false)
        if (result && (result.status === 200 || result.status === 201)) {
          if (result.data === false) {
            console.log(values.email)
            message.success('No any people found with this email you can proceed');
            newAdedEmployeeEmailFun(values.email)
            if (params.id === "contractor") {
              props.history.push('/people/add-contractor')
            } else {
              props.history.push('/people/add-employee')
            }
          } else {
            message.error('People with this e-mail has already been found within the company!');
          }
        }
      }
    });
  };

  return (
    <div>
      <div className="gx-mb-30">
        <Breadcrumb>
          <Breadcrumb.Item>
            <span className="gx-link">
              <Icon type="home" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => props.history.push("/people")}>
            <span className="gx-link">
              <span>People</span>
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              {
                params.id === "contractor" ?
                  <span>Add Contractor</span> :
                  <span>Add Employee</span>
              }
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card className="gx-card" title="Add New Team Member">
        <div className="gx-fs-lg gx-pb-4">Please enter in the Team Member’s E-mail</div>
        <Form onSubmit={handleSubmit} className="gx-form-row0">
          <Row>
            <Col span={12} xs={24} md={12} className="gx-p-0">
              <FormItem label="Email" className="display-block">
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "Please input email!" }],
                })(<Input type="text" placeholder="Email" />)}
              </FormItem>
            </Col>
          </Row>
          <div className="flex-x center gx-pt-5">
            <FormItem>
              <Button
                type="secondary"
                className="login-form-button"
                onClick={() => props.history.push("/people")}
              >
                Back
              </Button>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Continue
              </Button>
            </FormItem>
          </div>
        </Form>
      </Card>
    </div>
  );
};

const WrappedModal = Form.create()(CheckPeopleEmail);

const mapStateToProps = (state) => {
  return {
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany.location,
    token: state.auth.authUser.tokens.accessToken,
    newAdedEmployeeEmail: state.people.newAdedEmployeeEmail
  };
};

export default connect(mapStateToProps, { newAdedEmployeeEmailFun })(withRouter(WrappedModal));
