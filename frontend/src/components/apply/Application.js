import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Application.css';

function Application() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  // Step1
  const [passportType, setPassportType] = useState('');
  const [bookletType, setBookletType] = useState('');

  // Step2
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [nameChanged, setNameChanged] = useState('');
  const [placeOfBirthIndia, setPlaceOfBirthIndia] = useState('');
  const [distinguishingMark, setDistinguishingMark] = useState('');
  const [citizenshipBy, setCitizenshipBy] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [education, setEducation] = useState('');
  const [govtServant, setGovtServant] = useState('');
  const [noECRCateg, setNoECRCateg] = useState('');

  // Step3
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [sameAsPermanent, setSameAsPermanent] = useState('Yes');
  const [permanentAddress, setPermanentAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  // Step4
  const [holdIC, setHoldIC] = useState('');
  const [prevPassportDetails, setPrevPassportDetails] = useState('');
  const [appliedBefore, setAppliedBefore] = useState('');

  const steps = [
    'Passport Type',
    'Personal Details',
    'Address',
    'Identity Certificate',
    'Verification',
  ];

  const validateForm = () => {
    if (!passportType) {
      setMessage("Please select a passport type.");
      return false;
    }

    if (!bookletType) {
      setMessage("Please select a booklet type.");
      return false;
    }

    if (!firstName) {
      setMessage("First name is required.");
      return false;
    }

    if (!lastName) {
      setMessage("Last name is required.");
      return false;
    }

    if (!dob) {
      setMessage("Date of birth is required.");
      return false;
    }

    if (!gender) {
      setMessage("Gender is required.");
      return false;
    }

    if (!maritalStatus) {
      setMessage("Marital status is required.");
      return false;
    }

    if (!placeOfBirthIndia) {
      setMessage("Place of birth is required.");
      return false;
    }

    if (!citizenshipBy) {
      setMessage("Citizenship status is required.");
      return false;
    }

    if (!employmentType) {
      setMessage("Employment type is required.");
      return false;
    }

    if (!education) {
      setMessage("Education level is required.");
      return false;
    }

    if (!addressLine1) {
      setMessage("Address Line 1 is required.");
      return false;
    }

    if (!city) {
      setMessage("City is required.");
      return false;
    }

    if (!state) {
      setMessage("State is required.");
      return false;
    }

    if (!postalCode) {
      setMessage("Postal code is required.");
      return false;
    }

    if (!country) {
      setMessage("Country is required.");
      return false;
    }

    return true;
  };

  const handleNext = async (event) => {
    event.preventDefault();

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (!validateForm()) return;
      try {
        const response = await fetch('http://localhost:5000/api/auth/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            aadhar: user.aadhar,
            passportType,
            bookletType,
            firstName,
            middleName,
            lastName,
            gender,
            dob,
            maritalStatus,
            nameChanged,
            placeOfBirthIndia,
            distinguishingMark,
            citizenshipBy,
            employmentType,
            education,
            govtServant,
            noECRCateg,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            sameAsPermanent,
            permanentAddress,
            holdIC,
            prevPassportDetails,
            appliedBefore
          }),
        });
  
        const data = await response.json();
        setMessage(data.message);

        // Navigate to the upload route only if the application was successfully submitted
        if (data.message === 'Application submitted successfully! Please wait...') {
          setTimeout(() => {
            navigate('/upload');
          }, 3000);
        }

      } catch (error) {
        setMessage('An error occurred');
      }
    }
  };

  const handleClear = () => {
    // Clear all form fields
    setPassportType('');
    setBookletType('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setGender('');
    setDob('');
    setMaritalStatus('');
    setNameChanged('');
    setPlaceOfBirthIndia('');
    setDistinguishingMark('');
    setCitizenshipBy('');
    setEmploymentType('');
    setEducation('');
    setGovtServant('');
    setNoECRCateg('');
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setState('');
    setPostalCode('');
    setCountry('');
    setSameAsPermanent('');
    setPermanentAddress('');
    setHoldIC('');
    setPrevPassportDetails('');
    setAppliedBefore('');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/welcome');
    }
  };

  return (
    <div className="step-container">
      <h2>Application Steps</h2>
      <form onSubmit={handleNext}>
        <div className="progress-bar">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${index <= currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              {step}
            </div>
          ))}
        </div>

        <div className="step-content">
          {currentStep === 0 && (
            <Step1
              passportType={passportType} setPassportType={setPassportType}
              bookletType={bookletType} setBookletType={setBookletType}
            />
          )}

          {currentStep === 1 && (
            <Step2
              firstName={firstName} setFirstName={setFirstName}
              middleName={middleName} setMiddleName={setMiddleName}
              lastName={lastName} setLastName={setLastName}
              gender={gender} setGender={setGender}
              dob={dob} setDob={setDob}
              maritalStatus={maritalStatus} setMaritalStatus={setMaritalStatus}
              nameChanged={nameChanged} setNameChanged={setNameChanged}
              placeOfBirthIndia={placeOfBirthIndia} setPlaceOfBirthIndia={setPlaceOfBirthIndia}
              distinguishingMark={distinguishingMark} setDistinguishingMark={setDistinguishingMark}
              citizenshipBy={citizenshipBy} setCitizenshipBy={setCitizenshipBy}
              employmentType={employmentType} setEmploymentType={setEmploymentType}
              education={education} setEducation={setEducation}
              govtServant={govtServant} setGovtServant={setGovtServant}
              noECRCateg={noECRCateg} setNoECRCateg={setNoECRCateg}
            />
          )}

          {currentStep === 2 && (
            <Step3
              addressLine1={addressLine1} setAddressLine1={setAddressLine1}
              addressLine2={addressLine2} setAddressLine2={setAddressLine2}
              city={city} setCity={setCity}
              state={state} setState={setState}
              postalCode={postalCode} setPostalCode={setPostalCode}
              country={country} setCountry={setCountry}
              sameAsPermanent={sameAsPermanent} setSameAsPermanent={setSameAsPermanent}
              permanentAddress={permanentAddress} setPermanentAddress={setPermanentAddress}
            />
          )}

          {currentStep === 3 && (
            <Step4
              holdIC={holdIC} setHoldIC={setHoldIC}
              prevPassportDetails={prevPassportDetails} setPrevPassportDetails={setPrevPassportDetails}
              appliedBefore={appliedBefore} setAppliedBefore={setAppliedBefore}
            />
          )}

          {currentStep === 4 && (
            <div className="sub-section">
              <h3>Verification</h3>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2"><h3>Passport Details</h3></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Passport Type</strong></td>
                    <td>{passportType}</td>
                  </tr>
                  <tr>
                    <td><strong>Booklet Type</strong></td>
                    <td>{bookletType}</td>
                  </tr>
                </tbody>
            
                <thead>
                  <tr>
                    <th colSpan="2"><h3>Personal Details</h3></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>First Name</strong></td>
                    <td>{firstName}</td>
                  </tr>
                  <tr>
                    <td><strong>Middle Name</strong></td>
                    <td>{middleName}</td>
                  </tr>
                  <tr>
                    <td><strong>Last Name</strong></td>
                    <td>{lastName}</td>
                  </tr>
                  <tr>
                    <td><strong>Gender</strong></td>
                    <td>{gender}</td>
                  </tr>
                  <tr>
                    <td><strong>Date of Birth</strong></td>
                    <td>{dob}</td>
                  </tr>
                  <tr>
                    <td><strong>Marital Status</strong></td>
                    <td>{maritalStatus}</td>
                  </tr>
                  <tr>
                    <td><strong>Name Changed</strong></td>
                    <td>{nameChanged}</td>
                  </tr>
                  <tr>
                    <td><strong>Place of Birth in India</strong></td>
                    <td>{placeOfBirthIndia}</td>
                  </tr>
                  <tr>
                    <td><strong>Distinguishing Mark</strong></td>
                    <td>{distinguishingMark}</td>
                  </tr>
                  <tr>
                    <td><strong>Citizenship By</strong></td>
                    <td>{citizenshipBy}</td>
                  </tr>
                  <tr>
                    <td><strong>Employment Type</strong></td>
                    <td>{employmentType}</td>
                  </tr>
                  <tr>
                    <td><strong>Education</strong></td>
                    <td>{education}</td>
                  </tr>
                  <tr>
                    <td><strong>Government Servant</strong></td>
                    <td>{govtServant}</td>
                  </tr>
                  <tr>
                    <td><strong>No ECR Category</strong></td>
                    <td>{noECRCateg}</td>
                  </tr>
                </tbody>
            
                <thead>
                  <tr>
                    <th colSpan="2"><h3>Address Details</h3></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Address Line 1</strong></td>
                    <td>{addressLine1}</td>
                  </tr>
                  <tr>
                    <td><strong>Address Line 2</strong></td>
                    <td>{addressLine2}</td>
                  </tr>
                  <tr>
                    <td><strong>City</strong></td>
                    <td>{city}</td>
                  </tr>
                  <tr>
                    <td><strong>State</strong></td>
                    <td>{state}</td>
                  </tr>
                  <tr>
                    <td><strong>Postal Code</strong></td>
                    <td>{postalCode}</td>
                  </tr>
                  <tr>
                    <td><strong>Country</strong></td>
                    <td>{country}</td>
                  </tr>
                  <tr>
                    <td><strong>Same as Permanent Address</strong></td>
                    <td>{sameAsPermanent}</td>
                  </tr>
                </tbody>
            
                <thead>
                  <tr>
                    <th colSpan="2">Permanent Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Address Line 1</strong></td>
                    <td>{permanentAddress.addressLine1}</td>
                  </tr>
                  <tr>
                    <td><strong>Address Line 2</strong></td>
                    <td>{permanentAddress.addressLine2}</td>
                  </tr>
                  <tr>
                    <td><strong>City</strong></td>
                    <td>{permanentAddress.city}</td>
                  </tr>
                  <tr>
                    <td><strong>State</strong></td>
                    <td>{permanentAddress.state}</td>
                  </tr>
                  <tr>
                    <td><strong>Postal Code</strong></td>
                    <td>{permanentAddress.postalCode}</td>
                  </tr>
                  <tr>
                    <td><strong>Country</strong></td>
                    <td>{permanentAddress.country}</td>
                  </tr>
                </tbody>
            
                <thead>
                  <tr>
                    <th colSpan="2"><h3>Identity Certificate</h3></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Held/Holding Identity Certificate</strong></td>
                    <td>{holdIC}</td>
                  </tr>
                  <tr>
                    <td><strong>Details of Previous/Current Diplomatic/Official Passport</strong></td>
                    <td>{prevPassportDetails}</td>
                  </tr>
                  <tr>
                    <td><strong>Applied for Passport Before but Not Issued</strong></td>
                    <td>{appliedBefore}</td>
                  </tr>
                </tbody>
              </table>
            </div>          
          )}
        </div>

        <div className="form-buttons">
          <button className="save-and-back" type="button" onClick={handleBack}>BACK</button>
          <button className="clear-form" type="button" onClick={handleClear}>CLEAR</button>
          <button className="save-and-continue" type="submit">{currentStep === 4 ? 'SUBMIT' : 'CONTINUE >'}</button>
        </div>
      </form>
      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

function Step1({
  passportType, setPassportType,
  bookletType, setBookletType
}) {
  return (
    <>
      <div className="sub-section">
        <h3>Passport Type</h3>
        <p>How urgently is the Passport required?</p>
        <div className="sub-section-options">
          <label>
            <input
              type="radio"
              name="passportType"
              value="Normal"
              checked={passportType === 'Normal'}
              onChange={(e) => setPassportType(e.target.value)}
            />
            Normal (₹1,500)
            <p>The standard processing time is 30 to 45 days from the date of application</p>
          </label>
          <label>
            <input
              type="radio"
              name="passportType"
              value="Tatkaal"
              checked={passportType === 'Tatkaal'}
              onChange={(e) => setPassportType(e.target.value)}
            />
            Tatkaal (₹3,500)
            <p>Tatkaal applications take less than a week. An additional fee applies for this expedited service.</p>
          </label>
        </div>
      </div>

      <div className="sub-section">
        <h3>Type of Passport Booklet</h3>
        <div className="sub-section-options">
          <label>
            <input
              type="radio"
              name="bookletType"
              value="36 Pages"
              checked={bookletType === '36 Pages'}
              onChange={(e) => setBookletType(e.target.value)}
            />
            36 Pages
          </label>
          <label>
            <input
              type="radio"
              name="bookletType"
              value="60 Pages"
              checked={bookletType === '60 Pages'}
              onChange={(e) => setBookletType(e.target.value)}
            />
            60 Pages
          </label>
        </div>
        <p>A sum of ₹500 will be applied additionally for 60 pages booklet</p>
      </div>
    </>
  )
}

function Step2({
  firstName, setFirstName,
  middleName, setMiddleName,
  lastName, setLastName,
  gender, setGender,
  dob, setDob,
  maritalStatus, setMaritalStatus,
  nameChanged, setNameChanged,
  placeOfBirthIndia, setPlaceOfBirthIndia,
  distinguishingMark, setDistinguishingMark,
  citizenshipBy, setCitizenshipBy,
  employmentType, setEmploymentType,
  education, setEducation,
  govtServant, setGovtServant,
  noECRCateg, setNoECRCateg
}) {
  return (
    <div className="sub-section">
      <h3>Personal Details</h3>
      <label>
        First Name<br />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <br />
      <br />
      <label>
        Middle Name<br />
        <input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Last Name<br />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <br />
      <br />
      <label>
        <div>
          Gender:&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === 'Male'}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === 'Female'}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={gender === 'Other'}
              onChange={(e) => setGender(e.target.value)}
            />
            Other
          </label>
        </div>
      </label>
      <br />
      <label>
        Date of Birth<br />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </label>
      <br />
      <br />
      <label>
        <div>
          Marital Status:&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="Single"
              checked={maritalStatus === 'Single'}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            Single
          </label>
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="Married"
              checked={maritalStatus === 'Married'}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            Married
          </label>
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="Divorced"
              checked={maritalStatus === 'Divorced'}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            Divorced
          </label>
        </div>
      </label>
      <br />
      <label>
        <div>
          Have you ever changed your name?&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="nameChanged"
              value="Yes"
              checked={nameChanged === 'Yes'}
              onChange={(e) => setNameChanged(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="nameChanged"
              value="No"
              checked={nameChanged === 'No'}
              onChange={(e) => setNameChanged(e.target.value)}
            />
            No
          </label>
        </div>
      </label>
      <br />
      <label>
        <div>
          Is your place of birth India?&nbsp;
          <label>
            <input
              type="radio"
              name="placeOfBirthIndia"
              value="Yes"
              checked={placeOfBirthIndia === 'Yes'}
              onChange={(e) => setPlaceOfBirthIndia(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="placeOfBirthIndia"
              value="No"
              checked={placeOfBirthIndia === 'No'}
              onChange={(e) => setPlaceOfBirthIndia(e.target.value)}
            />
            No
          </label>
        </div>
      </label>
      <br />
      <label>
        Distinguishing Mark<br />
        <input
          type="text"
          value={distinguishingMark}
          onChange={(e) => setDistinguishingMark(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        <div>
          Citizenship by:&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="citizenshipBy"
              value="Birth"
              checked={citizenshipBy === 'Birth'}
              onChange={(e) => setCitizenshipBy(e.target.value)}
            />
            Birth
          </label>
          <label>
            <input
              type="radio"
              name="citizenshipBy"
              value="Descent"
              checked={citizenshipBy === 'Descent'}
              onChange={(e) => setCitizenshipBy(e.target.value)}
            />
            Descent
          </label>
          <label>
            <input
              type="radio"
              name="citizenshipBy"
              value="Registration"
              checked={citizenshipBy === 'Registration'}
              onChange={(e) => setCitizenshipBy(e.target.value)}
            />
            Registration
          </label>
          <label>
            <input
              type="radio"
              name="citizenshipBy"
              value="N.A."
              checked={citizenshipBy === 'N.A.'}
              onChange={(e) => setCitizenshipBy(e.target.value)}
            />
            N.A.
          </label>
        </div>
      </label>
      <br />
      <label>
        Employment Type:&nbsp;&nbsp;
        <select
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
        >
          <option value=""></option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Student">Student</option>
          <option value="Retired">Retired</option>
          <option value="Not Employed">Not Employed</option>
        </select>
      </label>
      <br />
      <br />
      <label>
        Education Qualification&nbsp;&nbsp;
        <select
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        >
          <option value=""></option>
          <option value="Matriculation">Matriculation</option>
          <option value="Graduate & Above">Graduate & Above</option>
          <option value="Uneducated">Uneducated</option>
        </select>
      </label>
      <br />
      <br />
      <label>
        <div>
          Is either of your parent/spouse a government servant?&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="govtServant"
              value="Yes"
              checked={govtServant === 'Yes'}
              onChange={(e) => setGovtServant(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="govtServant"
              value="No"
              checked={govtServant === 'No'}
              onChange={(e) => setGovtServant(e.target.value)}
            />
            No
          </label>
        </div>
      </label>
      <br />
      <label>
        <div>
          Applicant eligible for No-ECR category?&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="noECRCateg"
              value="Yes"
              checked={noECRCateg === 'Yes'}
              onChange={(e) => setNoECRCateg(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="noECRCateg"
              value="No"
              checked={noECRCateg === 'No'}
              onChange={(e) => setNoECRCateg(e.target.value)}
            />
            No
          </label>
        </div>
      </label>
    </div>
  )
}

function Step3({
  addressLine1, setAddressLine1,
  addressLine2, setAddressLine2,
  city, setCity,
  state, setState,
  postalCode, setPostalCode,
  country, setCountry,
  sameAsPermanent, setSameAsPermanent,
  permanentAddress, setPermanentAddress
}) {
  return (
    <div className="sub-section">
      <h3>Address</h3>
      <label>
        Address Line 1<br />
        <input
          type="text"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          required
        />
      </label>
      <br />
      <br />
      <label>
        Address Line 2<br />
        <input
          type="text"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        City<br />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <br />
      <br />
      <label>
        State<br />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <br />
      <br />
      <label>
        Postal Code<br />
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </label>
      <br />
      <br />
      <label>
        Country<br />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <br />
      <br />
      <label>
        <div>
          Is your address the same as your permanent address?&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="sameAsPermanent"
              value="Yes"
              checked={sameAsPermanent === 'Yes'}
              onChange={(e) => setSameAsPermanent(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="sameAsPermanent"
              value="No"
              checked={sameAsPermanent === 'No'}
              onChange={(e) => setSameAsPermanent(e.target.value)}
            />
            No
          </label>
        </div>
      </label>
      {sameAsPermanent === 'No' && (
        <div>
          <h4>Permanent Address</h4>
          <label>
            Address Line 1<br />
            <input
              type="text"
              value={permanentAddress.addressLine1}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, addressLine1: e.target.value })}
              required
            />
          </label>
          <br />
          <br />
          <label>
            Address Line 2<br />
            <input
              type="text"
              value={permanentAddress.addressLine2}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, addressLine2: e.target.value })}
            />
          </label>
          <br />
          <br />
          <label>
            City<br />
            <input
              type="text"
              value={permanentAddress.city}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, city: e.target.value })}
              required
            />
          </label>
          <br />
          <br />
          <label>
            State<br />
            <input
              type="text"
              value={permanentAddress.state}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, state: e.target.value })}
              required
            />
          </label>
          <br />
          <br />
          <label>
            Postal Code<br />
            <input
              type="text"
              value={permanentAddress.postalCode}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, postalCode: e.target.value })}
              required
            />
          </label>
          <br />
          <br />
          <label>
            Country<br />
            <input
              type="text"
              value={permanentAddress.country}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, country: e.target.value })}
              required
            />
          </label>
        </div>
      )}
    </div>
  );
}

function Step4({
  holdIC, setHoldIC,
  prevPassportDetails, setPrevPassportDetails,
  appliedBefore, setAppliedBefore
}) {
  return (
    <div className="sub-section">
      <h3>Identity Certificate</h3>
      <label>
        <div>
          Have you ever held/hold any Identity Certificate?<br />(Identity Certificate (IC) is normally issued to Tibetan/other stateless people residing in India):&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="holdIC"
              value="Yes"
              checked={holdIC === 'Yes'}
              onChange={(e) => setHoldIC(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="holdIC"
              value="No"
              checked={holdIC === 'No'}
              onChange={(e) => setHoldIC(e.target.value)}
            />
            No
          </label>
        </div>
      </label>
      <br />
      <label>
        <div>
          Details of Previous/Current Diplomatic/Official Passport:&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="prevPassportDetails"
              value="Available"
              checked={prevPassportDetails === 'Available'}
              onChange={(e) => setPrevPassportDetails(e.target.value)}
            />
            Available
          </label>
          <label>
            <input
              type="radio"
              name="prevPassportDetails"
              value="Not Available"
              checked={prevPassportDetails === 'Not Available'}
              onChange={(e) => setPrevPassportDetails(e.target.value)}
            />
            Not Available
          </label>
        </div>
      </label>
      <br />
      <label>
        <div>
          Have you ever applied for passport, but not issued?&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="appliedBefore"
              value="Yes"
              checked={appliedBefore === 'Yes'}
              onChange={(e) => setAppliedBefore(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="appliedBefore"
              value="No"
              checked={appliedBefore === 'No'}
              onChange={(e) => setAppliedBefore(e.target.value)}
            />
            No
          </label>
        </div>
      </label>
    </div>
  );
}

export default Application;
