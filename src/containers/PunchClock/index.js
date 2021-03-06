import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import ClockPin from "./../../components/PunchClock/ClockPin";
import ClockStatus from "./../../components/PunchClock/ClockStatus";
import CompanyLocation from './../../components/PunchClock/CompanyLocation';
import { commonGetCompanyRequest, setActiveCompany } from 'appRedux/actions/Common';
import { getJobRequest } from 'appRedux/actions/Common';


const PunchClock = (props) => {
  const { companies, rememberLocation, activeCompany, token, activeLocation, loader, getJobRequest, commonGetCompanyRequest, jobs, setActiveCompany } = props;
  console.log("jobs ib index punch clock", jobs)
  console.log("remember me location", rememberLocation)
  const [currentTab, setCurrentTab] = useState("location");
  const [loginUserName, setLoginUserName] = useState();
  const [loginUserId, setLoginUserId] = useState();
  const [isTakeBreak, setIsTakeBreak] = useState(false);
  const [status, setStatus] = useState("clockin");
  const [location, setLocation] = useState('')
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [selectedOptionJob, setSelectedOptionJob] = useState();
  const [addedPin, setAddedPin] = useState();
  const [jobData, setJobData] = useState();
  const [jobNote, setJobNote] = useState();
  const [lastCheckInStatus, setLastCheckInStatus] = useState()
  const [lastACtivityStatusArr, setLastACtivityStatusArr] = useState()
  useEffect(() => {
    const obj = {
      page: 1,
      active: true
    }
    commonGetCompanyRequest(obj)

    if (rememberLocation) {
      console.log("in this condition")
      setSelectedOption(rememberLocation)
      setCurrentTab("pin")
    }

  }, [])

  useEffect(() => {
    if (jobs == '') {
      console.log("not getting data")
    }
  }, [jobs])

  useEffect(() => {
    console.log(selectedOption)
    const params = {
      company: activeCompany
    }
    getJobRequest(params);
    setJobData(jobs)
  }, [addedPin, activeCompany])

  return (
    <div>
      {currentTab === "pin" ? (
        <ClockPin activeCompany={activeCompany}
          activeLocation={activeLocation} setIsTakeBreak={setIsTakeBreak} isTakeBreak={isTakeBreak} setLastACtivityStatusArr={setLastACtivityStatusArr} setLastCheckInStatus={setLastCheckInStatus} token={token} setLoginUserId={setLoginUserId} setLoginUserName={setLoginUserName} currentLocation={selectedOption} setAddedPin={setAddedPin} setCurrentTab={setCurrentTab} />
      ) : (
          currentTab === "status" && addedPin != '' ? (
            <ClockStatus
              setCurrentTab={setCurrentTab}
              status={status}
              ss
              loader={false}
              lastACtivityStatusArr={lastACtivityStatusArr}
              loginUserId={loginUserId}
              loginUserName={loginUserName}
              isTakeBreak={isTakeBreak}
              currentLocation={selectedOption}
              activeCompany={activeCompany}
              activeLocation={activeLocation}
              setStatus={setStatus}
              addedPin={addedPin}
              jobData={jobData}
              lastCheckInStatus={lastCheckInStatus}
              setLastCheckInStatus={setLastCheckInStatus}
              selectedOptionJob={selectedOptionJob}
              setSelectedOptionJob={setSelectedOptionJob}
              setCurrentTab={setCurrentTab}
              setIsTakeBreak={setIsTakeBreak}
              setJobNote={setJobNote}
              jobNote={jobNote}
              token={token}
            />
          ) : (
              currentTab === "location" && (
                <CompanyLocation
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  setCurrentTab={setCurrentTab}
                  props={props} />
              )
            )
        )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.common.companies,
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany.location,
    token: state.auth.authUser.tokens.accessToken,
    jobs: state.common.jobs,
    loader: state.people.loader,
    rememberLocation: state.auth.punchClockLocation
  }
};

export default connect(mapStateToProps, {
  commonGetCompanyRequest,
  setActiveCompany,
  getJobRequest
})(PunchClock);
