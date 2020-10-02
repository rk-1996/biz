import React, { useState, useEffect } from "react";
import WelcomePage from "../../components/VerifyProfile/WelcomePage";
import PersonalDetails from "../../components/VerifyProfile/Employee/PersonalDetails";
import TaxDetails from "../../components/VerifyProfile/Employee/TaxDetails";
import SignDocuments from "./../../components/VerifyProfile/SignDocument/index";
import { useSelector } from "react-redux";
import { getEmployeeDetailToVerify, updateEmployeeDetail } from "../../services/people";
import AppLoader from "../../components/Common/AppLoader";
import { message } from "antd";

// const initialState = {
//   dob: '',
//   firstName: '',
//   lastName: '',
//   middleName: '',
//   phone: '',
//   ssn: '',
//   address: {
//     city: "",
//     state: "",
//     street1: "",
//     street2: "",
//     zip: ""
//   },
//   additionalWitholding: '',
//   deductions: '',
//   dependents: '',
//   extraWithholding: '',
//   federalFilingStatus: null,
//   multiple_jobs: '',
//   otherIncome: '',
//   stateFilingStatus: null,
//   withHoldingAllowances: '',
// };

const VerifyProfileSteps = (props) => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [addedLocation, setAddedLocation] = useState('')
  const { match: { params } } = props;
  let { location } = props
  const { authUser } = useSelector(state => state.auth);

  useEffect(() => {
    const getDetails = async () => {
      console.log("location", authUser.user.companies[0].company)
      const obj = {
        user: authUser.user.uid,
        company: authUser.user.companies[0].company,
        location: location
      }
      setLoading(true);
      const result = await getEmployeeDetailToVerify(authUser.tokens.accessToken, obj);
      if (result.status === 200) {
        setFormValues(result.data)
        setLoading(false);
      }
    }
    getDetails();
  }, [params, authUser]);

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

  const updateEmployee = async () => {
    console.log(authUser)
    const obj = {
      user: params.token,
      company: authUser.user.companies[0].company,
      location: addedLocation
    }
    const response = await updateEmployeeDetail(authUser.tokens.accessToken, obj, formValues);
    if (response.status === 200 || response.status === 201) {
      message.success("Employee data successfully updated.");
      props.history.push("/overview");
    } else {
      message.error("Please try again !");
    }
  }

  useEffect(() => {
    if (isSubmit) {
      updateEmployee();
    }
    setIsSubmit(false);
  }, [isSubmit, formValues]);

  return (
    <div className="gx-app-login-wrap">
      {loading && <AppLoader />}
      {
        currentStep === "welcome" ? (
          <WelcomePage
            setCurrentStep={setCurrentStep}
            completedStep={completedStep}
            isEmployee={true}
            employeeData={formValues}
            setAddedLocation={setAddedLocation}
          />
        ) : currentStep === 1 ? (
          <PersonalDetails
            setCurrentStep={setCurrentStep}
            completedStep={completedStep}
            formValues={formValues}
          />
        ) : currentStep === 2 && (
          <TaxDetails
            formValues={formValues}
            setCurrentStep={setCurrentStep}
            completedStep={completedStep}
            uid={params.token}
            addedLocation={addedLocation}
          />
        )
        //  : (
        //   currentStep === 3 && (
        //     <SignDocuments
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
