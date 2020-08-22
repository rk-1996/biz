import React from "react";
import {Button, Checkbox, Form, Icon, Input} from "antd";
import {connect} from "react-redux";

import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn
} from "appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

const SignIn = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const obj = {
          email: values.email,
          password: values.password
        }
        props.userSignIn(obj);
      }
    });
  };

  const gotoPunchClock = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        props.userSignIn({...values, type:'punch'});
      }
    });
  }

  const { getFieldDecorator } = props.form;
  const { loader } = props;
  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img src={require('assets/images/appModule/neature.jpg')} alt='Neature'/>
            </div>
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signIn"/></h1>
              <p><IntlMessages id="app.userAuth.bySigning"/></p>
              <p><IntlMessages id="app.userAuth.getAccount"/></p>
            </div>
            {/* <div className="gx-app-logo">
              <img alt="example" src={require("assets/images/logo.png")}/>
            </div> */}
          </div>
          <div className="gx-app-login-content">
            <Form onSubmit={handleSubmit} className="gx-signin-form gx-form-row0">

              <FormItem>
                {getFieldDecorator('email', {
                  initialValue: "admin@bizvibes.com",
                  rules: [{
                    required: true, type: 'email', message: 'The input is not valid E-mail!',
                  }],
                })(
                  <Input placeholder="Email"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  initialValue: "B!Z$Adm!n#2020",
                  rules: [{required: true, message: 'Please input your Password!'}],
                })(
                  <Input type="password" placeholder="Password"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                )}
                <span className="gx-signup-form-forgot gx-link"><IntlMessages
                  id="appModule.termAndCondition"/></span>
              </FormItem>
              <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn"/>
                </Button>
                <Button type="primary" className="gx-mb-0" onClick={gotoPunchClock}>
                  Punch Clock
                </Button>
                {/* <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages
                id="app.userAuth.signUp"/></Link> */}
              </FormItem>
              <div className="gx-flex-row gx-justify-content-between">
                <span>or connect with</span>
                <ul className="gx-social-link">
                  <li>
                    <Icon type="google" onClick={() => {
                     props.showAuthLoader();
                     props.userGoogleSignIn();
                    }}/>
                  </li>
                  <li>
                    <Icon type="facebook" onClick={() => {
                     props.showAuthLoader();
                     props.userFacebookSignIn();
                    }}/>
                  </li>
                </ul>
              </div>
            </Form>
          </div>

          {loader ?
            <div className="gx-loader-view">
              <CircularProgress/>
            </div> : null}
        </div>
      </div>
    </div>
  );
};

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn
})(WrappedNormalLoginForm);
