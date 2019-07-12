import React, { useState } from 'react';
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

const Disclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);

  const toggleShowDisclaimer = (): void => setShowDisclaimer(!showDisclaimer);

  return (
    <>
      <span className="pointer" onClick={toggleShowDisclaimer}>
        Disclaimer
      </span>

      <div className="w-25">
        <Modal isOpen={showDisclaimer} contentLabel="Disclaimer" style={customStyles}>
          <h1 className="text-center">Disclaimer</h1>
          <hr className="w-50" />

          <ul>
            <li className="mb-2">
              ARK Play is entirely a community initiative and has no affiliation to the business
              entities of ARK or ARK ECOSYSTEM.
            </li>
            <li className="mb-2">
              The sole purpose of this app is to generate community engagement in the ARK Ecosystem.
            </li>
            <li className="mb-2">
              The creator of this app as well as its backers are in no way or form responsible for
              the actions of the entities that will make use of ARK Play.
              <br />
              As stated in the MIT license:
              <br />
              <br />
              <span className="text-muted">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                <br />
                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A<br />
                PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                <br />
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
                <br />
                CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
                <br />
                OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </span>
              <br />
              <br />
            </li>
            <li className="mb-2">
              Rules and restrictions in regards to hosting these kinds of events may vary per
              country. Please DYOR and use this app wisely.
            </li>
          </ul>
          <hr className="w-50" />
          <div className="text-center">
            <button onClick={toggleShowDisclaimer} className="btn btn-primary">
              I understand
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Disclaimer;
