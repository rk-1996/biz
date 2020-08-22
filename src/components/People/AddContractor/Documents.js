import React, { useState } from 'react';
import { List, Checkbox, Button } from 'antd';

const Documents = ({ setFormTab, onFinish, loader }) => {
  const [docs, setDocs] = useState([]);

  const handleSubmit = () => {
    onFinish({
      docs
    })
  }

  const changeDoc = (title) => {
    if(docs.includes(title)) {
      setDocs((docs) => docs.filter(a => a !== title));
    } else {
      setDocs((docs) => [...docs, title]);
    }
  }

  return (
    <div>
      <div className="gx-mt-2">
        These Documents will be sent for the Employee to Acknowledge & Sign
      </div>
      <div className="gx-mt-4">
      <List
          header={<div>Optional Documents</div>}
          bordered
        >
          <List.Item>
            <Checkbox
              checked={docs.includes('intro')}
              onChange={() => changeDoc('intro')}
            >
              Intro Handbook
            </Checkbox>
          </List.Item>
          <List.Item>
            <Checkbox
              checked={docs.includes('offerletter')}
              onChange={() => changeDoc('offerletter')}
            >
              Offer Letter
            </Checkbox>
          </List.Item>
          <List.Item>
            <Checkbox
              checked={docs.includes('handbook')}
              onChange={() => changeDoc('handbook')}
            >
              Employee Handbook
            </Checkbox>
          </List.Item>
        </List>
      </div>
      <div className="gx-mt-4">
        <List
          header={<div>Mandatory Company Documents</div>}
          bordered
        >
          <List.Item>
            <Checkbox
              checked={true}
            >
              2019 W4
            </Checkbox>
          </List.Item>
        </List>
      </div>
      <div className="flex-x center gx-pt-5">
        <Button type="secondary" className="login-form-button" onClick={() => setFormTab('2')}>
          Back
        </Button>
        <Button loading={loader} type="primary" onClick={handleSubmit} className="login-form-button">
          Finish
        </Button>
      </div>
    </div>
  );
};

export default Documents;
