import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
const { Dragger } = Upload;

const AddSnapId = ({ setActiveTab }) => {
  const [currentMode, setcurrentMode] = useState('camera');


  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload PNG/JPEG file!");
    }
    return isJpgOrPng;
  }

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log('takePhoto', dataUri);
  }

  const onChangeFile = info => {
    if (info.file.status === "done") {
      const file = info.file.originFileObj;
      console.log(file);
    }
  };


  return (
    <div>
      <div className="gx-fs-xxxl text-center gx-pb-4">
        Snap your ID Card
      </div>
      <div className="text-center gx-pb-3">
        <Button
          type={currentMode === "camera" ? 'primary' : 'secondary'}
          className="min-width-150"
          onClick={() => setcurrentMode('camera')}
        >
          Camera
        </Button>
        <Button
          type={currentMode === "upload" ? 'primary' : 'secondary'}
          className="min-width-150"
          onClick={() => setcurrentMode('upload')}
        >
          Upload
        </Button>
      </div>
      {
        currentMode === "camera" ?
        <div>
          <Camera
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
          />
        </div> :
        <div>
          <Dragger
            beforeUpload={beforeUpload}
            onChange={onChangeFile}
            // showUploadList={false}
            supportServerRender={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            className="gx-p-5"
          >
          <p className="ant-upload-text gx-p-5">
            Click or drag file to this area to upload
          </p>
        </Dragger>
        </div>
      }
      <div className="gx-pt-3 text-center gx-pb-5">
        Please confirm that your ID is legible before submission.
      </div>
      <div className="flex-x center gx-pt-5 fill-width">
        <Button
          type="secondary"
          className="min-width-150"
          onClick={() => setActiveTab('doclist')}
        >
          Back
        </Button>
        <Button type="primary" className="min-width-150" onClick={() => setActiveTab('doclist')}>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default AddSnapId;
