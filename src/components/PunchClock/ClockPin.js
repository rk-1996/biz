import React, { useState, useEffect } from "react";
import { Input, Button, Modal, message } from "antd";
import NumberKeyboard from "components/PunchClock/NumberKeyboard";
import { getPeople, getLoginPeopleData } from './../../services/punchClock';
import CircularProgress from "components/CircularProgress/index";
import moment from "moment";

const ClockPin = (props) => {
  const { setCurrentTab, setIsTakeBreak, currentLocation, setLastACtivityStatusArr, setLastCheckInStatus, setLoginUserId, setAddedPin, setLoginUserName, token, activeLocation, activeCompany } = props
  const [pin, setpin] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (pin.length === 4) {
      setLoader(true)
      let result = getUserData()
    }
  }, [pin, setCurrentTab]);

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
                  value={pin}
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
                    <Button type="primary" onClick={() => setCurrentTab("location")}>
                      Change Location
                  </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ClockPin;
