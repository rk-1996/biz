import React, { useRef, useState, useEffect } from "react";
import { Input, Button, Modal, message, Form, Row, Col } from "antd";
import NumberKeyboard from "components/PunchClock/NumberKeyboard";
import { getPeople, getLoginPeopleData } from './../../services/punchClock';
import CircularProgress from "components/CircularProgress/index";
import moment from "moment";
import { connect } from "react-redux";
import { userLogin, checkToken } from './../../services/auth';

import {
  userSignIn, rememberLocationPunchClock
} from "appRedux/actions/Auth";
const FormItem = Form.Item;

const ClockPin = (props) => {
  const { setCurrentTab, rememberLocationPunchClock, setIsTakeBreak, currentLocation, setLastACtivityStatusArr, setLastCheckInStatus, setLoginUserId, setAddedPin, setLoginUserName, token, activeLocation, activeCompany } = props
  const [pin, setpin] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loader, setLoader] = useState(false)
  const [openCradentialModal, setOpenCradentialModal] = useState(false)
  const { getFieldDecorator, setFieldsValue } = props.form;
  const pinTxt = useRef(null);
  useEffect(() => {
    if (pin.length === 4) {
      setLoader(true)
      let result = getUserData()
    }
  }, [pin, setCurrentTab]);

  useEffect(() => {
    pinTxt.current.focus();
  }, [])

  let getUserData = async () => {
    console.log(pin)
    let dataObj = {
      company: activeCompany,
      location: activeLocation,
      pin: pin
    }
    let result = await getPeople(token, dataObj);
    console.log(result)
    if (result.status !== 200) {
      message.error('No details found')
      setpin('')
      setLoader(false)
      return false
    } else {
      let dataObj = {
        userId: result.data.user.uid,
        locationId: activeLocation,
        date: moment().format("YYYY/MM/DD")
      }
      console.log(dataObj)
      console.log(moment(new Date, 'YYYY-MMM-DD'))
      let result1 = await getLoginPeopleData(token, dataObj);
      if (result1.status == 200) {
        console.log(result1)
        if (result1.data.length !== 0) {

          let v1 = result1.data.filter(data => data.punchCard.filter(data1 => data1.status === 'ACTIVE'))
          console.log(v1)
          let cardLastIndex = (v1.length - 1)
          let LastActionArr
          let lastActivityStatus
          v1.map((val, index) => {
            val.punchCard.map((valueCards, indexCards) => {
              if (valueCards.status === "ACTIVE") {

                if (valueCards.punchType === 'WORK' && valueCards.endTime === null) {
                  console.log("in clock in status bjhbhjb+++++++++++++++++++")
                  LastActionArr = val
                  lastActivityStatus = valueCards.punchType
                  setAddedPin(pin)
                  setLoginUserId(result.data.user.uid)
                  setLoginUserName(result.data.user.email)
                  setCurrentTab("status");
                } else if (valueCards.punchType === 'BREAKPAID' && valueCards.endTime === null) {
                  console.log("in break in status bjhbhjb+++++++++++++++++++")
                  LastActionArr = val
                  lastActivityStatus = valueCards.punchType
                  setAddedPin(pin)
                  setLoginUserId(result.data.user.uid)
                  setLoginUserName(result.data.user.email)
                  setCurrentTab("status");
                }
                else if (valueCards.punchType === 'WORK' && valueCards.endTime != null && valueCards.endTime !== '') {
                  console.log("in clock out status bjhbhjb+++++++++++++++++++")
                  setLoader(false)
                  setLoginUserId(result.data.user.uid)
                  setLoginUserName(result.data.user.email)
                  setCurrentTab("status");
                  setAddedPin(pin)
                } else if (valueCards.punchType === 'BREAKPAID' && valueCards.endTime != null && valueCards.endTime !== '') {
                  console.log("in break out status bjhbhjb+++++++++++++++++++")
                  // console.log(val)
                  // setLastCheckInStatus(valueCards.punchType)

                  setLoader(false)
                  setLoginUserId(result.data.user.uid)
                  setLoginUserName(result.data.user.email)
                  // setCurrentTab("status");
                  // setAddedPin(pin)
                }
              }
            })
          })
          if (LastActionArr) {
            setLastACtivityStatusArr(LastActionArr)

            if (lastActivityStatus != '' && lastActivityStatus != undefined && lastActivityStatus === 'BREAKPAID') {

              LastActionArr.punchCard.map((valuePunchCard, indexPunchCard) => {
                if (valuePunchCard.punchType === 'BREAKPAID') {
                  if (valuePunchCard.endTime != null && valuePunchCard.endTime != '') {
                    setIsTakeBreak(false)
                  } else {
                    setIsTakeBreak(true)
                  }
                }
              })

              // setIsTakeBreak(true)
            }

          }
          if (lastActivityStatus != '' && lastActivityStatus != undefined) {
            setLastCheckInStatus(lastActivityStatus)
          }



          setLoader(false)

          // console.log(v1[cardLastIndex])
          // setLastACtivityStatusArr(v1[cardLastIndex])
          // setLastCheckInStatus(v1[cardLastIndex].punchCard[0].punchType)
          // setLoader(false)
          // setCurrentTab("status");
          // setLoginUserId(result.data.user.uid)
          // setLoginUserName(result.data.user.email)
          // setAddedPin(pin)
        } else {
          console.log("inhbhjhhg hg vhggh")
          setLoader(false)
          setLoginUserId(result.data.user.uid)
          setLoginUserName(result.data.user.email)
          setCurrentTab("status");
          setAddedPin(pin)
        }
      } else {
        setLoader(false)
        setLoginUserId(result.data.user.uid)
        setLoginUserName(result.data.user.email)
        setCurrentTab("status");
        setAddedPin(pin)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoader(true);
        console.log("values", values);
        const obj = {
          email: values.email,
          password: values.password,
          type: "punch"
        }
        // let result = props.userSignIn({ ...values, type: 'punch' });
        // console.log(result)
        try {
          let result = await userLogin(obj);
          setLoader(false);
          console.log(result)
          if (result.status === 201) {
            console.log("activeCompany", activeCompany)
            // if (result.data.user.company)
            handleCancel();
            rememberLocationPunchClock(null)
            setCurrentTab('location')
          }

        } catch (error) {
          message.error(error)
        }

      }
    });
  };

  const handleCancel = () => {
    setConfirm(false)
    setOpenCradentialModal(false)
  }

  const changePin = (e) => {
    console.log(e.target.value)
    console.log()
    setpin(String(e.target.value))
  }

  const onKeyPress = (key) => {
    if (key === "clear") {
      setpin("");
    } else if (key === "delete") {
      setpin(pin.substring(0, pin.length - 1));
    } else {
      if (pin.length < 4) {
        setpin(pin + String(key));
      }
    }
  };

  return (
    <div className="verify-form-container">
      {loader ?
        <div className="gx-loader-view">
          <CircularProgress />
        </div> :
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div
              className="gx-p-4 m-auto gx-app-login-content"
              style={{ width: "100%" }}
            >
              <div className="gx-fs-xxxl text-center gx-pb-4">
                <q>{currentLocation.name}</q>
              </div>
              <div className="pin-input">
                <Input.Password
                  className="text-center"
                  ref={pinTxt}
                  value={pin}
                  onChange={(e) => changePin(e)}
                  type="password"
                />
              </div>
              <div>
                <NumberKeyboard onKeyPress={onKeyPress} />
              </div>
              <div className="text-center gx-pt-5">
                <Button type="primary" onClick={() => setConfirm(true)}>
                  Change Location
              </Button>
              </div>
              <Modal
                width={460}
                className="hide-modal-footer"
                title="Are you sure you want to change Locations?"
                visible={confirm}
                onCancel={() => setConfirm(false)}
              >
                <div className="gx-pt-2">
                  <div>
                    This will require a Manager Credentials
                </div>
                  <div className="flex-x space-between gx-pt-5">
                    <Button type="danger" onClick={() => setConfirm(false)}>
                      Cancel
                  </Button>
                    <Button type="primary" onClick={() => setOpenCradentialModal(true)}>
                      Change Location
                  </Button>
                  </div>
                </div>
              </Modal>

              {/* add credential for change location */}
              <Modal
                title="Change location."
                visible={openCradentialModal}
                onCancel={handleCancel}
                className="hide-modal-footer"
              >
                {loader ?
                  <div className="gx-loader-view">
                    <CircularProgress />
                  </div> :
                  <Form onSubmit={handleSubmit} className="gx-form-row0">
                    <Row>
                      <Col span={12} xs={24} md={12}>
                        <FormItem label="Email" className="display-block">
                          {getFieldDecorator("email", {
                            rules: [{ required: true, message: "Please input email!" }],
                          })(<Input type="text" placeholder="Email" />)}
                        </FormItem>
                      </Col>
                      <Col span={12} xs={24} md={12}>
                        <FormItem label="Password" className="display-block">
                          {getFieldDecorator("password", {
                            rules: [{ required: true, message: "Please input password!" }],
                          })(<Input type="password" placeholder="Password" />)}
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
                          Change location
                      </Button>
                      </FormItem>
                    </div>
                  </Form>
                }
              </Modal>

            </div>
          </div>
        </div>
      }
    </div>
  );
};

const ClockPinModal = Form.create()(ClockPin);

const mapStateToProps = ({ auth }) => {
  const { alertMessage } = auth;
  return { alertMessage }
};

export default connect(mapStateToProps, {
  userSignIn,
  rememberLocationPunchClock
})(ClockPinModal)

// export default ;
