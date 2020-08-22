import React, { useState } from "react";
import { Button, Checkbox, Modal } from "antd";
import Viewer, { Worker } from "@phuocng/react-pdf-viewer";
import { w4Doc } from "util/constant";
import SignatureCanvas from "react-signature-canvas";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";

const AddSignature = ({ setActiveTab }) => {
  const [currentSignature, setCurrentSignature] = useState(null);
  const [signatureref, setSignatureRef] = useState(null);
  const [agreement, setAgreement] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);

  const signDocumentHandler = () => {
    setActiveTab("doclist");
  };

  const addSignHandler = () => {
    const image = signatureref.toDataURL();
    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const file = new File([blob], `${Date.now()}.png`, {
          type: "image/png",
        });
        setCurrentSignature({
          file,
          url,
        });
        setSignatureModal(false);
      });
  };

  return (
    <div>
      <div className="gx-fs-xxxl text-center gx-pb-4">
        Sign 2019 W-4 Document
      </div>
      <div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.worker.min.js">
          <div className="pdf-view-container">
            <Viewer fileUrl={w4Doc} defaultScale={1} />
          </div>
        </Worker>
      </div>
      <div className="text-center gx-pt-5">
        <Button
          className="min-width-150"
          onClick={() => setSignatureModal(true)}
          type="primary"
        >
          {currentSignature ? "Edit Signature" : "Add Signature"}
        </Button>
      </div>
      {currentSignature && (
        <>
          <div className="gx-fs-md">YOUR SIGNATURE</div>
          <div className="added-signature">
            <img src={currentSignature.url} alt="signature"></img>
          </div>
        </>
      )}
      <div className="gx-pt-1">
        <Checkbox
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
        >
          I agree to electronically sign this form. Under penalties of perjury.
          I declare that by checking this box I have examined this W-4
          certificate and to the best of my knoweldge and belief it is true
          correct and complete.
        </Checkbox>
      </div>
      <div className="flex-x center gx-pt-4 fill-width">
        <Button
          type="secondary"
          className="min-width-150"
          onClick={() => setActiveTab("doclist")}
        >
          Back
        </Button>
        <Button
          disabled={currentSignature === null}
          type="primary"
          className="min-width-150"
          onClick={signDocumentHandler}
        >
          Sign
        </Button>
      </div>
      <Modal
        className="add-signature-modal"
        title={currentSignature ? "Edit Signature" : "Add Signature"}
        visible={signatureModal}
        onCancel={() => setSignatureModal(false)}
      >
        <div className="app-signature-pad">
          <SignatureCanvas
            ref={(ref) => {
              setSignatureRef(ref);
            }}
            dotSize={1}
            canvasProps={{
              width: 470,
              height: 150,
              className: "sigCanvas",
            }}
          />
          <div className="flex-x center space-between gx-pt-4 fill-width">
            <Button
              type="secondary"
              className="min-width-150"
              onClick={() => setSignatureModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="secondary"
              className="min-width-150"
              onClick={() => signatureref.clear()}
            >
              Clear
            </Button>
            <Button
              type="primary"
              className="min-width-150"
              onClick={addSignHandler}
            >
              {currentSignature ? "Edit" : "Add"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddSignature;
