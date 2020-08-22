import React, { useState } from "react";
import { Button, Table, Steps } from "antd";
import AddSignature from './AddSignature';
import AddSnapId from './AddSnapId';

const { Step } = Steps;

const data = [
  {
    key: "1",
    document: "2019 W4",
    description: "Form W-4 Records your tax Allownace",
    type: "sign",
  },
  {
    key: "2",
    document: "2019 I9",
    description: "Form I-9 let’s us check your employment eligbility",
    type: "sign",
  },
  {
    key: "3",
    document: "State ID Card or Driver License",
    description: "Copy of your ID is needed for employment",
    type: "upload",
  },
];

const SignDocuments = (props) => {
  const [activeTab, setActiveTab] = useState('doclist');
  const { setCurrentStep } = props;

  const columns = [
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "type",
      render: (text, record) => (
        <span>
          {record.type === "upload" ? (
            <Button type="primary" className="gx-mb-0" onClick={() => setActiveTab('snapid')}>
              Snap/Upload
            </Button>
          ) : (
            <Button type="primary" className="gx-mb-0" onClick={() => setActiveTab('signature')}>
              Sign Document
            </Button>
          )}
        </span>
      ),
    },
  ];
  return (
    <div className="verify-form-container">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-p-4" style={{ width: "100%" }}>
            <div className="gx-pb-5">
              <Steps size="small" current={3}>
                {/* <Step title="Basic Info" /> */}
                {/* <Step title="Contractor Details" /> */}
                <Step title="Sign Documents" />
              </Steps>
            </div>
            {
              activeTab === "doclist" ?
              <>
                <div className="gx-fs-xxxl text-center gx-pb-4">
                  Digitally Sign Documents
                </div>
                <div className="gx-pb-4">
                  <Table
                    pagination={false}
                    className="gx-table-responsive"
                    columns={columns}
                    dataSource={data}
                  />
                </div>
                <div className="flex-x center gx-pt-5 fill-width">
                  <Button
                    type="secondary"
                    className="min-width-150"
                    onClick={() => setCurrentStep(1)}
                    disabled
                  >
                    Back
                  </Button>
                  <Button type="primary" htmlType="submit" className="min-width-150">
                    Finish Setup!
                  </Button>
                </div>
              </> :
              activeTab === "signature" ?
              <AddSignature setActiveTab={setActiveTab}/> :
              activeTab === "snapid" &&
              <AddSnapId setActiveTab={setActiveTab}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignDocuments;
