import React, { useState, useEffect } from "react";
import WelcomePage from "../../components/VerifyProfile/WelcomePage";
import PersonalDetails from "../../components/VerifyProfile/Employee/PersonalDetails";
import TaxDetails from "../../components/VerifyProfile/Employee/TaxDetails";
import SignDocuments from "../../components/VerifyProfile/SignDocument/index";
import { useSelector } from "react-redux";
import { getEmployeeDetailToVerify, updateEmployeeDetail } from "../../services/people";
import AppLoader from "../../components/Common/AppLoader";
import { message } from "antd";

const VerifyDocumentSteps = (props) => {
  const [currentStep, setCurrentStep] = useState(3);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const { match: { params } } = props;
  const { authUser } = useSelector(state => state.auth);
  const [isSubmit, setIsSubmit] = useState(false);

  const completedStep = (value, isSubmitFlag = false) => {
    setFormValues({
      ...formValues,
      ...value,
    });

    if (isSubmitFlag) {
      setIsSubmit(true);
    }
  };

  return (
    <div className="gx-app-login-wrap">
      {loading && <AppLoader />}
      {
        // currentStep === "welcome" ? (
        //   <WelcomePage
        //     setCurrentStep={setCurrentStep}
        //     completedStep={completedStep}
        //   />
        // ) : currentStep === 1 ? (
        //   <PersonalDetails
        //     setCurrentStep={setCurrentStep}
        //     completedStep={completedStep}
        //     formValues={formValues}
        //   />
        // ) : currentStep === 2 && (
        //   <TaxDetails
        //     formValues={formValues}
        //     setCurrentStep={setCurrentStep}
        //     completedStep={completedStep}
        //     uid={params.token}
        //   />
        // )
        //  : (
        currentStep === 3 && (
          <SignDocuments
            setCurrentStep={setCurrentStep}
            completedStep={completedStep}
          />
        )
        // )
      }
    </div>
  );
};

export default VerifyDocumentSteps;
