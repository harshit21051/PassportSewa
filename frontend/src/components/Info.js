import React from 'react';
import './Info.css';

function Info() {
  return (
    <section className="info">
      <div className="info-block">
        <h3>Passport at your Doorsteps</h3>
        <div className="info-content">
          <p>The passport distribution system is undergoing a change, the main objective of which is to empower Indian citizens. In 2017, we celebrate the Passports Act's 50th anniversary. Since 2014, more than 40 million passport applications have been completed without issue. Passports are now more easily, quickly, and transparently obtained by Indian people nationwide thanks to the skillful guidance of the esteemed External Affairs Minister Sushma Swaraj. "PASSPORT AT YOUR DOORSTEP," a documentary, focuses on the major improvements in passport services that are motivated by a steadfast desire to better serve the Indian public.</p>
          {/* <img src="passport-delivery.png" alt="Passport Delivery" /> */}
        </div>
      </div>
      <div className="info-block">
        <h3>Appointment Availability Status</h3>
        <p>Already booked appointment slots freed due to Cancellation or Rescheduling will be released and would be made available for booking by the applicants. These appointments will be released everyday based on their availability and at a fixed time i.e. at the time of opening of Tatkaal appointments published in the PSP portal, link given below. Applicant can book new appointments and even prepone their already booked appointments accordingly.</p>
        <button className="check-availability-btn">CHECK AVAILABILITY</button>
      </div>
      <div className="info-block">
        <h3>Track Appointment Status</h3>
        <p>A National Call Centre that operates in 17 different Indian languages allows citizens to access information related to passport services and receive updates on their passport applications 24/7, seven days a week. Now, you can easily track the progress of your passport application.</p>
        <button className="track-btn">TRACK</button>
      </div>
    </section>
  );
}

export default Info;
