import React from "react";
import { Button } from "antd";

const WelcomePage = ({ setCurrentStep, isEmployee }) => {
  return (
    <div className="gx-app-login-container">
      <div className="gx-app-login-main-content">
        <div
          className="m-auto"
          style={{ padding: "35px 35px 20px", width: "70%" }}
        >
          <div className="gx-pb-5">
            <div className="gx-fs-xxl text-center">Welcome to</div>
            <div className="gx-fs-xlxl text-center gx-pb-5">Cafe Basil</div>
            <div className="gx-pt-5 gx-fs-lg gx-pb-4">
              Hello, James Ferdinand!
            </div>
            <div>Let’s set your account so you can get paid. We’ll need:</div>
            <div className="gx-pt-5 gx-pb-5">
              <ol className="gx-pt-3">
                <li className="gx-pb-3">Your Personal Information</li>
                {
                  isEmployee === true &&
                  <li>Tax Witholding Information</li>
                }
              </ol>
            </div>
            <div className="text-center gx-pt-5">
              <Button
                type="primary"
                className="gx-mb-0"
                onClick={() => setCurrentStep(1)}
              >
                Let’s Get Started
              </Button>
            </div>
            <div className="text-center gx-pt-3">
              This process usually takes about 5 minutes
            </div>
          </div>
        </div>
        {/* <div className="gx-app-logo-content" style={{width: "100%"}}>
          <div className="gx-app-logo-content-bg">
            <img src={require('assets/images/appModule/neature.jpg')} alt='Neature'/>
          </div>
          <div className="gx-app-logo-wid">
            <h1>Welcome to Cafe Basil</h1>
            <div>Hello, James Ferdinand!</div>
            <div>Let’s set your account so you can get paid. We’ll need:</div>
            <ul className="gx-pt-3">
              <li>
                Your Personal Information
              </li>
              <li>
                Tax Witholding Information
              </li>
            </ul>
            <div className="text-center gx-pt-4">
              <Button className="gx-mb-0" onClick={() => setCurrentStep(1)}>
                Let’s Get Started
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default WelcomePage;
