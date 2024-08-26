import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <button
          className={`accordion ${activeIndex === 0 ? 'active' : ''}`}
          onClick={() => toggleAccordion(0)}
        >
          How do I apply for a passport online?
        </button>
        {activeIndex === 0 && (
          <div className="panel">
            <p>Visit the Passport Seva website, register, fill out the application form, and pay the fee online. Once completed, you’ll need to book an appointment for document verification.</p>
          </div>
        )}
      </div>
      <div className="faq-item">
        <button
          className={`accordion ${activeIndex === 1 ? 'active' : ''}`}
          onClick={() => toggleAccordion(1)}
        >
          What documents are required for a passport application?
        </button>
        {activeIndex === 1 && (
          <div className="panel">
            <p>Required documents typically include proof of identity (like an Aadhaar card), address proof (such as utility bills), a birth certificate, and recent passport-sized photographs. Specific requirements can vary based on your application type.</p>
          </div>
        )}
      </div>
      <div className="faq-item">
        <button
          className={`accordion ${activeIndex === 2 ? 'active' : ''}`}
          onClick={() => toggleAccordion(2)}
        >
          How long does it take to process a passport application?
        </button>
        {activeIndex === 2 && (
          <div className="panel">
            <p>Processing usually takes around 30-45 days, but it can vary based on individual cases, verification processes, and any additional requirements. Some expedited services might be available.</p>
          </div>
        )}
      </div>
      <div className="faq-item">
        <button
          className={`accordion ${activeIndex === 3 ? 'active' : ''}`}
          onClick={() => toggleAccordion(3)}
        >
          How can I renew my passport?
        </button>
        {activeIndex === 3 && (
          <div className="panel">
            <p>To renew your passport, apply online through the Passport Seva website, complete the form, upload the required documents, and pay the renewal fee. An appointment will be scheduled for document verification.</p>
          </div>
        )}
      </div>
      <div className="faq-item">
        <button
          className={`accordion ${activeIndex === 4 ? 'active' : ''}`}
          onClick={() => toggleAccordion(4)}
        >
          What is the police verification process, and when does it take place?
        </button>
        {activeIndex === 4 && (
          <div className="panel">
            <p>Police verification is a process to confirm the applicant's identity and address. It usually takes place after you submit your application and documents. A police officer may visit your address to verify the details you provided.</p>
          </div>
        )}
      </div>
      <div className="faq-item">
        <button
          className={`accordion ${activeIndex === 5 ? 'active' : ''}`}
          onClick={() => toggleAccordion(5)}
        >
          How can I schedule an appointment at the Passport Seva Kendra?
        </button>
        {activeIndex === 5 && (
          <div className="panel">
            <p>Appointments at the Passport Seva Kendra can be scheduled online through the Passport Seva website. You can select a convenient time slot from the available dates for your document verification.</p>
          </div>
        )}
      </div>
      <div className="faq-item">
        <button
          className={`accordion ${activeIndex === 6 ? 'active' : ''}`}
          onClick={() => toggleAccordion(6)}
        >
          Can I track the status of my passport application online?
        </button>
        {activeIndex === 6 && (
          <div className="panel">
            <p>Yes, you can track the status of your passport application online through the Passport Seva website. Use your application number and other required details to check the current status of your application.</p>
          </div>
        )}
      </div>
      {/* Add more FAQ items as needed */}
    </section>
  );
}

export default FAQ;
