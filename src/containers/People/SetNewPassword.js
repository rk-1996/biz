import React, { useState, useEffect } from "react";
import {
  useHistory
} from "react-router-dom";
import { browserHistory } from "react-router";
import { Button, Form, Input, message } from "antd";
import CircularProgress from "components/CircularProgress/index";
import { createPeoplePassword, getUserDataByToken } from './../../services/people';
import AppLoader from 'components/Common/AppLoader';

const FormItem = Form.Item;

const SetNewPassword = (props) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { showMessage, loader, alertMessage, match: { params } } = props;
  const [userData, setUserData] = useState('')
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('')
  const history = useHistory();
  console.log('params', params)
  useEffect(async () => {
    setLoading(true)
    console.log("called")
    setFieldsValue({
      email: "james@gmail.com",
    });
    try {
      let dataObj = {
        token: params.token
      }
      let resultGetData = await getUserDataByToken(dataObj)
      console.log(resultGetData.locations)
      if (resultGetData.status == 200) {
        if (resultGetData.data.message === 'Invalid Token') {
          message.success('Invailid token.')
          // props.history.push("/signin");
          window.location.pathname = '/signin'

        } else {

          setLoading(false)
          setUserData(resultGetData.data)
          resultGetData.data.locations.map((val, ind) => {
            setCurrentLocation(val.location.name)
          })
        }
      }
    } catch (error) {
      setLoading(false)
      message.error(error.message)
    }
    //caled api and get data by token


  }, [setFieldsValue]);

  useEffect(() => {
    console.log(userData.locations)
    // if (userData.locations) {
    //   userData.locations.map((val, ind => {
    //     console.log(val)
    //   }))
    // }
  }, [userData])

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const obj = {
          token: params.token,
          password: values.password
        }
        const result = await createPeoplePassword(obj);
        if (result.status === 201) {
          message.success('Your Password is created! You can login.')
          // props.history.push("/signin");
          window.location.pathname = '/signin'
        }

      }
    });
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  return (
    <div className="gx-app-login-wrap">
      {/* {
        loading ? <CircularProgress /> : */}

      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          {/* <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src={require('assets/images/appModule/neature.jpg')} alt='Neature'/>
              </div>
              <div className="gx-app-logo-wid">
                <h1>Welcome to</h1>
                <p>Cafe Basil</p>
                <p>Hello, James Ferdinand!
                  Get started by choosing a secure password at least 8 characters long. Don’t include any personal information such as your name or date of birth</p>
              </div>
            </div> */}
          <div
            className="m-auto"
            style={{ padding: "35px 35px 20px", width: "60%" }}
          >
            <div className="gx-pb-5">
              <div className="gx-fs-xxl text-center">Welcome to</div>
              <div className="gx-fs-xlxl text-center">{currentLocation}</div>
              <div className="gx-pt-4 gx-fs-lg gx-pb-4">

                Hello, {userData.email}!
              </div>
              <div>
                Get started by choosing a secure password at least 8 characters
                long. Don’t include any personal information such as your name
                or date of birth
              </div>
            </div>
            <Form onSubmit={handleSubmit} className="ant-form-vertical">
              {/* <FormItem label="Email">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ],
                })(<Input disabled placeholder="Email" />)}
              </FormItem> */}
              <FormItem label="Password">
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" },
                    { pattern: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`, message: "Password must contain upper, lower, number and sepecial character!" },
                  ],
                })(<Input.Password type="password" placeholder="Password" />)}
              </FormItem>
              <Form.Item hasFeedback label="Confirm Password">
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                })(
                  <Input.Password
                    onBlur={handleConfirmBlur}
                    placeholder="Confirm Password"
                  />
                )}
              </Form.Item>
              <div className="text-center gx-pt-4">
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    Set My Password
                  </Button>
                </FormItem>
              </div>
            </Form>
          </div>
          {loading && (
            <div className="gx-loader-view">
              <CircularProgress />
            </div>
          )}
          {showMessage && message.error(alertMessage)}
        </div>
      </div>
      {/* } */}
    </div>
  );
};

const WrappedSignUpForm = Form.create()(SetNewPassword);

export default WrappedSignUpForm;
