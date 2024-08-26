import React from 'react';
import './HelpDesk.css';

function HelpDesk() {
  return (
    <section className="help-desk">
      <h2>Help Desk</h2>
      <div className="help-item">
        {/* <img src="help1.png" alt="Help 1" /> */}
        <p><b>QUICK GUIDES</b></p>
      </div>
      <div className="help-item">
        {/* <img src="help2.png" alt="Help 2" /> */}
        <p><b>FEE CALCULATOR</b></p>
      </div>
      <div className="help-item">
        {/* <img src="help3.png" alt="Help 3" /> */}
        <p><b>LOCATE PSKs</b></p>
      </div>
      <div className="help-item">
        {/* <img src="help3.png" alt="Help 3" /> */}
        <p><b>E-FORM</b></p>
      </div>
    </section>
  );
}

export default HelpDesk;
