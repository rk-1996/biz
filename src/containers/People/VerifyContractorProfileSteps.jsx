import React, { useState, useEffect } from "react";
import WelcomePage from "./../../components/VerifyProfile/WelcomePage";
import PersonalDetails from "./../../components/VerifyProfile/Contractor/PersonalDetails";
import SignDocuments from "./../../components/VerifyProfile/SignDocument/index";
import { getContractorDetailToVerify, updateContractorDetail } from "../../services/people";
import AppLoader from "../../components/Common/AppLoader";
import { useSelector } from "react-redux";
import { message } from "antd";

const VerifyProfileSteps = (props) => {
  console.log("props", props)
  const [currentStep, setCurrentStep] = useState('welcome');
  const [formValues, setFormValues] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { match: { params } } = props;
  const { authUser } = useSelector(state => state.auth);
  const [addedLocation, setAddedLocation] = useState('')

  useEffect(() => {
    const getDetails = async () => {
      const obj = {
        user: params.token,
        company: authUser.user.companies[0].company,
      }
      setLoading(true);
      const result = await getContractorDetailToVerify(authUser.tokens.accessToken, obj);
      if (result.status === 200) {
        setFormValues(result.data)
        setLoading(false);
      }
    }
    getDetails();
  }, [params, authUser]);

  const completedStep = (value, isSubmitFlag = false) => {
    setFormValues({
      ...formValues,
      ...value,
    });

    if (isSubmitFlag) {
      setIsSubmit(true);
    }
  };

  const updateContractor = async () => {
    const obj = {
      user: formValues.user.companies[0].company,
      company: formValues.user.locations[0].location.lid,
    }
    console.log('user', formValues.user.companies[0].company)
    console.log('company', formValues.user.locations[0].location.lid)
    const response = await updateContractorDetail(authUser.tokens.accessToken, obj, formValues);
    if (response.status === 200 || response.status === 201) {
      message.success("Contractor data successfully updated.");
      props.history.push("/overview");
    } else {
      message.error("Please try again !");
    }
  }

  useEffect(() => {
    if (isSubmit) {
      updateContractor();
    }
    setIsSubmit(false);
  }, [isSubmit, formValues]);

  return (
    <div className="gx-app-login-wrap">
      {loading && <AppLoader />}
      {currentStep === "welcome" ? (
        <WelcomePage
          employeeData={formValues}
          setCurrentStep={setCurrentStep}
          completedStep={completedStep}
          setAddedLocation={setAddedLocation}
        />
      ) : currentStep === 1 && (
        <PersonalDetails
          formValues={formValues}
          setCurrentStep={setCurrentStep}
          completedStep={completedStep}
        />
      )
        // ) : currentStep === 2 ? (
        //   <ContractorDetails
        //     formValues={formValues}
        //     setCurrentStep={setCurrentStep}
        //     completedStep={completedStep}
        //   />
        // ) : (
        //   (
        //   currentStep === 2 && (
        //     <SignDocuments
        //       formValues={formValues}
        //       setCurrentStep={setCurrentStep}
        //       completedStep={completedStep}
        //     />
        //   )
        // )
      }
    </div>
  );
};

export default VerifyProfileSteps;
