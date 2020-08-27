import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Icon, message } from "antd";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { uploadOns3, punchInUser, punchOutUser, addBraekOutPunchCard, addBraekPunchCard, addPunchCardImage } from './../../services/punchClock';
import AppLoader from 'components/Common/AppLoader';
import CircularProgress from "components/CircularProgress/index";

var moment = require('moment');
const { TextArea } = Input;

const ClockStatus = ({
  status = "clockin",
  setStatus,
  isTakeBreak,
  setIsTakeBreak,
  setCurrentTab,
  addedPin,
  currentLocation,
  jobData,
  selectedOptionJob,
  lastACtivityStatusArr,
  setSelectedOptionJob,
  setJobNote,
  jobNote,
  loginUserName,
  lastCheckInStatus,
  setLastCheckInStatus,
  loginUserId,
  token
}) => {
  console.log(jobData)
  console.log('addedPin', addedPin, 'currentLocation', currentLocation)
  const [notesModal, setNotesModal] = useState(false);
  const [chooseBreakModal, setChooseBreakModal] = useState(false);
  const [captureImage, setCaptureImage] = useState()
  const [currentTime, setCurrentTime] = useState()
  const [uploadedS3Data, setUploadedS3Data] = useState()
  const [loader, setLoader] = useState(false)
  const [isOutFromAllState, setIsOutFromAllState] = useState(false)
  const [loaderSelectJob, setLoaderSelectJob] = useState(false)

  const [innerTakeBreak, setInnerTakeBreak] = useState(false)

  let myRef = React.createRef();

  useEffect(() => {
    setCurrentTime(moment().format("h:mm a"))
    console.log(lastCheckInStatus)
    console.log(lastACtivityStatusArr)
    console.log(isTakeBreak)
    console.log(innerTakeBreak)
    if (lastCheckInStatus != '' && lastCheckInStatus == 'WORK') {
      console.log("in this clockojhbjhbjbjhbhjbhjbj")
      setStatus('clockout')
    } else if (lastCheckInStatus != '' && lastCheckInStatus == "BREAKPAID") {
      if (lastACtivityStatusArr != '') {

        // .map((val, index) => {
        // lastACtivityStatusArr.punchCard.map((valuePunchCard, indexPunchCard) => {
        //   if (valuePunchCard.punchType === 'BREAKPAID') {
        //     if (valuePunchCard.endTime != null && valuePunchCard.endTime != '') {
        //       setIsTakeBreak(false)
        //     } else {
        //       setIsTakeBreak(true)
        //     }
        //   }
        // })
        // })
      }
      // setChooseBreakModal(false)
      setStatus('clockout')
      // setIsTakeBreak(true)
    }

  }, [lastCheckInStatus])

  const clockInHandler = async () => {
    setLoaderSelectJob(true)
    // console.log(uploadedS3Data)
    // return
    var image = new Image();
    // image.src =
    let dataObj = {
      userId: loginUserId,
      locationId: currentLocation.lid,
      punchCard: [{
        "punchType": "WORK",
        "jobInfoId": selectedOptionJob.jdid,
        "jobTitleValue": selectedOptionJob.jobTitle,
        "notes": jobNote,
        "startTime": new Date(),
        "endTime": null,
        "changeReason": '',
        "punchCardImages": [
          {
            "image": uploadedS3Data.file[0].Location,
            "imageThumb": uploadedS3Data.file[0].Location,
            "imageType": 'START'
          }
        ]
      }]
    }
    const result = await punchInUser(token, dataObj);
    if (result.status == 201) {
      setLoaderSelectJob(false)
      message.success(`You are login now ${loginUserName}!`)
      setCurrentTab("pin")
      // setStatus("clockout");
      // setNotesModal(false);
    } else {
      setLoaderSelectJob(false)
      message.error('something went wrong!')

    }
  };

  const selectOptionJob = (e, l) => {
    // console.log(l)
    e.preventDefault()
    setSelectedOptionJob(l)
    // console.log(l)
  }

  useEffect(() => {
    if (innerTakeBreak == true && isTakeBreak) {
      console.log("called from first case")
      document.getElementById('inner-circle').click()
    }
    else if (lastCheckInStatus != null && lastCheckInStatus != '' && lastCheckInStatus != undefined && lastCheckInStatus != 'WORK' && innerTakeBreak == false && isTakeBreak == false) {
      console.log('innerTakeBreak', innerTakeBreak)
      console.log('isTakeBreak', isTakeBreak)
      document.getElementById('inner-circle').click()
    }
  }, [innerTakeBreak, isTakeBreak])

  const takeBreakHandler = async (breakType) => {
    setInnerTakeBreak(true)
    setIsTakeBreak(true);
    setChooseBreakModal(false);
    console.log("breakType", breakType);
  };

  const endBreakHandler = () => {
    setIsTakeBreak(false);
    setInnerTakeBreak(false)
    // document.getElementById('inner-circle').click()
  };

  useEffect(() => {
    if (isOutFromAllState == true) {
      document.getElementById('inner-circle').click()
    }
  }, [isOutFromAllState])

  const clockOutHandler = async () => {
    console.log('call from clockout handler')
    setIsOutFromAllState(true)
  };

  const handleTakePhotoClockOut = async (dataUri) => {
    console.log("in handle clock out innerTakeBreak", innerTakeBreak)
    console.log("in handle clock out isTakeBreak", isTakeBreak)
    // Do stuff with the photo...
    setLoader(true)
    // console.log('takePhoto', dataUri);

    // convert base64 to raw binary data held in a string
    let byteString = atob(dataUri.split(',')[1]);

    // separate out the mime component
    let mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0]
    // console.log('mimeString', mimeString)
    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    let bb = new Blob([ab], { type: mimeString });
    var image = new Image();
    image.src = dataUri
    image.name = new Date().getTime()

    setCaptureImage(bb)
    let dataObj = {
      file: bb
    }
    let resultUpload = await uploadOns3(token, dataObj);
    console.log(innerTakeBreak)
    if (innerTakeBreak) {
      if (resultUpload.status === 201) {
        message.success('your image is successfully capture!')
        setLoader(false)
        // setUploadedS3Data()
        let punchCardId
        let jobInfoId
        let jobTitleValue
        let startTime
        lastACtivityStatusArr.punchCard.map((val, index) => {
          // console.log(val)
          if (val.punchType === "WORK") {
            punchCardId = val.pcId
            jobInfoId = val.jobInfoId
            jobTitleValue = val.jobTitleValue
            startTime = val.startTime
          }
        })
        if (!innerTakeBreak) {
          console.log("in break out section")
          // console.log(lastACtivityStatusArr)
          // return
          // const clockOutHandler = asyncs() => {
          let dataObj = {
            "timeCardTcId": lastACtivityStatusArr.tcId,
            "punchType": "BREAKPAID",
            "jobInfoId": jobInfoId,
            "jobTitleValue": jobTitleValue,
            "notes": "Break out",
            "startTime": startTime,
            "endTime": new Date(),
            "changeReason": "",
            "punchCardImages": [
              {
                "tcId": lastACtivityStatusArr.tcId,
                "punchCardPcId": punchCardId,
                "image": resultUpload.data.file[0].Location,
                "imageThumb": resultUpload.data.file[0].Location,
                "imageType": "END"
              }
            ]
          }
          let result = await addBraekOutPunchCard(token, dataObj, punchCardId);
          // console.log(result)
          setLoaderSelectJob(false)
          if (result.status == 200) {
            message.success(`You are out of break ${loginUserName}!`)
            setCurrentTab("pin")
            setLastCheckInStatus('WORK')
            setStatus("clockin");
          } else {
            setLoaderSelectJob(false)
            message.error('something went wrong!')
          }
        } else {
          console.log("in break take section")

          // console.log(lastACtivityStatusArr)
          // const clockOutHandler = asyncs() => {
          let dataObj = {

            "timeCardTcId": lastACtivityStatusArr.tcId,
            "punchType": "BREAKPAID",
            "jobInfoId": jobInfoId,
            "jobTitleValue": jobTitleValue,
            "notes": "it' break paid",
            "startTime": new Date(),
            "endTime": null,
            "changeReason": "",
            "punchCardImages": [
              {
                "image": resultUpload.data.file[0].Location,
                "imageThumb": resultUpload.data.file[0].Location,
                "imageType": "START"
              }
            ]
          }
          let result = await addBraekPunchCard(token, dataObj, punchCardId);
          // console.log(result)
          setLoaderSelectJob(false)
          if (result.status == 201) {
            message.success(`You get break from work ${loginUserName}!`)
            setCurrentTab("pin")
            setLastCheckInStatus(null)
            setStatus("clockin");
          } else {
            setLoaderSelectJob(false)
            message.error('something went wrong!')
          }
        }
      } else {
        message.error('something went wrong!')
      }
    } else if (lastCheckInStatus != '' && lastCheckInStatus == 'WORK') {
      // console.log("in clock in status")
      // console.log(result)
      if (resultUpload.status === 201) {
        message.success('your image is successfully capture!')
        setLoader(false)
        // setUploadedS3Data()
        let punchCardId
        lastACtivityStatusArr.punchCard.map((val, index) => {
          if (val.punchType === "WORK") {
            punchCardId = val.pcId
          }
        })

        // const clockOutHandler = asyncs() => {
        let dataObj = {
          "userId": lastACtivityStatusArr.userId,
          "locationId": lastACtivityStatusArr.locationId,
          "tcId": lastACtivityStatusArr.tcId,
          "punchCardPcId": punchCardId,
          "image": resultUpload.data.file[0].Location,
          "imageThumb": resultUpload.data.file[0].Location,
          "imageType": "END"
        }
        // let result = await addPunchCardImage(token, dataObj);
        // console.log(result)
        setLoaderSelectJob(false)
        // if (result.status == 201) {
        let endTime = new Date()
        let newArr = lastACtivityStatusArr.punchCard.map((val, index) => {
          if (val.pcId == punchCardId) {
            val.punchCardImages.push(dataObj)
            val.endTime = endTime
          }
        })
        // console.log('newArr', lastACtivityStatusArr)
        // console.log('punchCardId', punchCardId)
        let resultPunchOutUser = await punchOutUser(token, punchCardId, lastACtivityStatusArr)
        if (resultPunchOutUser.status == 200) {
          message.success(`You are logout now ${loginUserName}!`)
          setCurrentTab("pin")
          setLastCheckInStatus(null)
          setStatus("clockin");
        } else {
          message.error('something went wrong!')
        }
        // } else {
        //   setLoaderSelectJob(false)
        //   message.error('something went wrong!')

        // }

        // setTimeout(function () {  }, 2000);
      } else {
        setLoader(false)

        message.error('something went wrong!')
      }
    } else if (isOutFromAllState == false && innerTakeBreak == false && lastCheckInStatus === 'BREAKPAID') {

      message.success('your image is successfully capture!')
      setLoader(false)
      // setUploadedS3Data()
      let punchCardId
      let jobInfoId
      let jobTitleValue
      let startTime
      lastACtivityStatusArr.punchCard.map((val, index) => {
        // console.log(val)
        if (val.punchType === "BREAKPAID") {
          punchCardId = val.pcId
          jobInfoId = val.jobInfoId
          jobTitleValue = val.jobTitleValue
          startTime = val.startTime
        }
      })

      let dataObj = {
        "userId": lastACtivityStatusArr.userId,
        "locationId": lastACtivityStatusArr.locationId,
        "tcId": lastACtivityStatusArr.tcId,
        "punchCardPcId": punchCardId,
        "image": resultUpload.data.file[0].Location,
        "imageThumb": resultUpload.data.file[0].Location,
        "imageType": "END"
      }
      // let result = await addPunchCardImage(token, dataObj);
      // console.log(result)
      setLoaderSelectJob(false)
      // if (result.status == 201) {
      let endTime = new Date()
      let newArr = lastACtivityStatusArr.punchCard.map((val, index) => {
        if (val.pcId == punchCardId) {
          val.punchCardImages.push(dataObj)
          val.endTime = endTime
        }
      })

      let sendDataObj
      let neArr1 = lastACtivityStatusArr.punchCard.map((val, index) => {
        if (val.punchType === 'BREAKPAID') {
          sendDataObj = val
        }
      })

      let result = await addBraekOutPunchCard(token, sendDataObj, punchCardId);
      setLoaderSelectJob(false)
      if (result.status == 200) {
        message.success(`You are out of break ${loginUserName}!`)
        setCurrentTab("pin")
        setLastCheckInStatus('WORK')
        setStatus("clockin");
      } else {
        setLoaderSelectJob(false)
        message.error('something went wrong!')
      }
    } else if (isOutFromAllState == true && innerTakeBreak == false && lastCheckInStatus === 'BREAKPAID') {
      setLoader(false)
      let punchCardIdBreakPaid
      let jobInfoIdBreakPaid
      let jobTitleValueBreakPaid
      let startTime
      lastACtivityStatusArr.punchCard.map((val, index) => {
        if (val.punchType === "BREAKPAID") {
          punchCardIdBreakPaid = val.pcId
          jobInfoIdBreakPaid = val.jobInfoId
          jobTitleValueBreakPaid = val.jobTitleValue
          startTime = val.startTime
        }
      })

      let dataObj = {
        "userId": lastACtivityStatusArr.userId,
        "locationId": lastACtivityStatusArr.locationId,
        "tcId": lastACtivityStatusArr.tcId,
        "punchCardPcId": punchCardIdBreakPaid,
        "image": resultUpload.data.file[0].Location,
        "imageThumb": resultUpload.data.file[0].Location,
        "imageType": "END"
      }
      let endTime = new Date()
      let newArr = lastACtivityStatusArr.punchCard.map((val, index) => {
        if (val.pcId == punchCardIdBreakPaid) {
          val.punchCardImages.push(dataObj)
          val.endTime = endTime
        }
      })

      let sendDataObj
      let neArr1 = lastACtivityStatusArr.punchCard.map((val, index) => {
        if (val.punchType === 'BREAKPAID') {
          sendDataObj = val
        }
      })

      let result = await addBraekOutPunchCard(token, sendDataObj, punchCardIdBreakPaid);
      if (result.status == 200) {
        let punchCardId
        lastACtivityStatusArr.punchCard.map((val, index) => {
          if (val.punchType === "WORK") {
            punchCardId = val.pcId
          }
        })

        let dataObj = {
          "userId": lastACtivityStatusArr.userId,
          "locationId": lastACtivityStatusArr.locationId,
          "tcId": lastACtivityStatusArr.tcId,
          "punchCardPcId": punchCardId,
          "image": resultUpload.data.file[0].Location,
          "imageThumb": resultUpload.data.file[0].Location,
          "imageType": "END"
        }
        setLoaderSelectJob(false)
        let endTime = new Date()
        let newArr = lastACtivityStatusArr.punchCard.map((val, index) => {
          if (val.pcId == punchCardId) {
            val.punchCardImages.push(dataObj)
            val.endTime = endTime
          }
        })
        let resultPunchOutUser = await punchOutUser(token, punchCardId, lastACtivityStatusArr)
        if (resultPunchOutUser.status == 200) {
          message.success(`You are logout now ${loginUserName}!`)
          setCurrentTab("pin")
          setLastCheckInStatus(null)
          setStatus("clockin");
        } else {
          message.error('something went wrong!')
        }

      } else {
        setLoaderSelectJob(false)
        message.error('something went wrong!')
      }
    }
  }

  const handleTakePhoto = async (dataUri) => {
    // Do stuff with the photo...
    setLoader(true)
    // console.log('takePhoto', dataUri);

    // convert base64 to raw binary data held in a string
    let byteString = atob(dataUri.split(',')[1]);

    // separate out the mime component
    let mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0]
    // console.log('mimeString', mimeString)
    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    let bb = new Blob([ab], { type: mimeString });
    var image = new Image();
    image.src = dataUri
    image.name = new Date().getTime()

    setCaptureImage(bb)
    let dataObj = {
      file: bb
    }
    const result = await uploadOns3(token, dataObj);
    // console.log(result)
    if (result.status === 201) {
      message.success('your image is successfully capture!')
      setLoader(false)
      setUploadedS3Data(result.data)
      setNotesModal(true)
      // setTimeout(function () {  }, 2000);
    } else {
      setLoader(false)

      message.error('something went wrong!')
    }
  }

  // useEffect(()=>{
  //   if(captureImage != ''){

  //   }
  // },[captureImage])

  const clockInFunc = async () => {
    document.getElementById('inner-circle').click()
  }

  const addJobNote = (e) => {
    // console.log(e.target.value)
    setJobNote(e.target.value)
  }

  return (
    <div className="verify-form-container">
      {loader || loaderSelectJob ?
        <div className="gx-loader-view">
          <CircularProgress />
        </div> :
        <div className="gx-app-login-container gx-clock-container">
          <div className="gx-app-login-main-content">
            <div
              className="gx-p-4 m-auto gx-app-login-content"
              style={{ width: "100%" }}
            >
              <div className="gx-fs-xxxl gx-pb-4">Welcome {loginUserName}</div>
              <div>
                {status === "clockin" ? (
                  <span>You are currently Clocked Out, it is now {currentTime}</span>
                ) : (
                    status === "clockout" && (
                      <span>You are currently Clocked In, it is now {currentTime}</span>
                    )
                  )}
              </div>
              {status === "clockin" ? (
                <div>
                  <Camera
                    onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                  />
                </div>) : (status === "clockout" && (<div>
                  <Camera
                    onTakePhoto={(dataUri) => { handleTakePhotoClockOut(dataUri); }}
                  />
                </div>))
              }


              <div className="flex-x space-between gx-pt-5">
                {status === "clockin" ? (
                  <>
                    <Button
                      className="gx-btn-cyan"
                      onClick={() => clockInFunc()}
                    >
                      Clock In
                  </Button>
                    <Button type="primary" onClick={() => setCurrentTab("pin")}>
                      Done
                  </Button>
                  </>
                ) : (
                    status === "clockout" && (
                      <>
                        <Button className="gx-btn-red" onClick={clockOutHandler}>
                          Clock Out
                    </Button>
                        {isTakeBreak ? (
                          <Button
                            className="gx-btn-orange"
                            onClick={endBreakHandler}
                          >
                            End my Break
                          </Button>
                        ) : (
                            <Button
                              className="gx-btn-orange"
                              onClick={() => setChooseBreakModal(true)}
                            >
                              Take My Break
                            </Button>
                          )}
                        <Button type="primary" onClick={() => setCurrentTab("pin")}>
                          Done
                    </Button>
                      </>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      }
      {loaderSelectJob ?
        <div className="gx-loader-view">
          <CircularProgress />
        </div> :
        <Modal
          className="hide-modal-footer"
          title="Add a Note"
          width={360}
          visible={notesModal}
          onCancel={() => setNotesModal(false)}
        >
          <div>

            <div className="gx-font-weight-semi-bold">
              Which Job would you like to Clock Into?
        </div>
            <div className="location-list gx-pt-3 gx-pb-3">
              {/* <div className="location flex-x space-between">
            Server <Icon type="check" />
          </div>
          <div className="location">
            Prep Cook
          </div> */}
              {
                jobData.length && jobData.map((c, i) => {
                  return (
                    <div>
                      <div onClick={(e) => { selectOptionJob(e, c) }} className="location flex-x space-between">
                        {c.jobTitle} {
                          selectedOptionJob && selectedOptionJob.jdid == c.jdid &&
                          <Icon type="check" />
                        }
                      </div>
                    </div>
                  )

                })
              }
            </div>
            <div className="gx-font-weight-semi-bold">Add a Note</div>
            <TextArea rows={4} onChange={(e) => { addJobNote(e) }} placeholder="Optional" />
            <div className="text-center gx-pt-3">
              <Button
                type="primary"
                className="min-width-150"
                onClick={clockInHandler}
              >
                Clock In
          </Button>
            </div>
          </div>

        </Modal>
      }

      <Modal
        width={360}
        className="hide-modal-footer"
        title="Choose your Break Type"
        visible={chooseBreakModal}
        onCancel={() => setChooseBreakModal(false)}
      >
        <div className="text-center gx-pt-3">
          <Button
            type="primary"
            className="gx-btn-block"
            onClick={() => takeBreakHandler("Take 30 Minute Unpaid")}
          >
            Take 30 Minute Unaid
          </Button>
          <Button
            type="primary"
            className="gx-btn-block"
            onClick={() => takeBreakHandler("Take 10 Minute Paid")}
          >
            Take 10 Minute Paid
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ClockStatus;
