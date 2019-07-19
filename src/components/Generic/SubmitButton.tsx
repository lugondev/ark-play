import React, { useState, useEffect } from 'react';
import { event } from '../../config';
import { generateDataUrl } from '../../utils/general';
import QRCode from 'qrcode';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

interface SubmitButtonProps {
  submitPrediction: () => void;
  submission: string;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const [showManualInfo, setShowManualInfo] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const toggleManualInfo = (): void => setShowManualInfo(!showManualInfo);

  useEffect(() => {
    QRCode.toDataURL(generateDataUrl(props.submission), { scale: 7 })
      .then((imgData: string) => {
        setQrCode(imgData);
      })
      .catch(err => {
        console.error(err);
      });
  }, [props.submission]);

  return (
    <>
      <button
        onClick={props.submitPrediction}
        className="btn btn-outline-secondary font-weight-bold pl-5 pr-5 pt-3 pb-3 mb-5"
      >
        Submit
      </button>

      <small className="d-block btn-link text-secondary mb-3 pointer" onClick={toggleManualInfo}>
        {showManualInfo ? 'Hide' : 'Show'} QR code / transaction info
      </small>
      {showManualInfo && (
        <Modal
          isOpen={showManualInfo}
          contentLabel="Disclaimer"
          style={customStyles}
          overlayClassName="overlay"
          ariaHideApp={false}
          onRequestClose={toggleManualInfo}
        >
          <button type="button" className="close" aria-label="Close" onClick={toggleManualInfo}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="w-100">
            <img key={props.submission} src={qrCode} className="center" />
          </div>
          <div className="row justify-content-center">
            <div className="card manual-info m-3">
              <div className="card-body">
                <small className="d-block text-left">
                  Recipient: <span className="font-weight-bold">{event.address}</span>
                  <br />
                  Amount: <span className="font-weight-bold">{event.submissionPrice}</span>
                  <br />
                  SmartBridge: <span className="font-weight-bold">{props.submission}</span>
                </small>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SubmitButton;
