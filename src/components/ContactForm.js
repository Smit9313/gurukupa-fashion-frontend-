import React,{ useState } from 'react';
import '../Style/contactform.css'

function ContactForm() {

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameFlag, setNameFlag] = useState(false);


  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [subjectFlag, setSubjectFlag] = useState(false);

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageFlag, setMessageFlag] = useState(false);


  const [error, setError] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    /*************** Name *************/
    console.log(name);
    let nameNull = name.trim() === "";
    let nameNotNull = name.trim() !== "";
    let minNameLength = name.trim().length < 6;
    let maxNameLength = name.trim().length > 10;

    if (nameNull) {
      setNameFlag(false);
      setNameError("Name Should not blank.");
    }

    if ((minNameLength || maxNameLength) && nameNotNull) {
      setNameFlag(false);
      setNameError("Name length must be 6 to 10");
    }

    if (!nameNull && !minNameLength && !maxNameLength) {
      setNameFlag(true);
    }

    /*************** Email *************/
    console.log(email);
    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let emailNull = email.trim() === "";
    let emailNotNull = email.trim() !== "";

    if (emailNull) {
      setEmailFlag(false);
      setEmailError("Email Should not be blank.");
    }

    if (emailNotNull && !email_pattern.test(email)) {
      setEmailFlag(false);
      setEmailError("Enter Valid Email.");
    }

    if (!emailNull && email_pattern.test(email)) {
      setEmailFlag(true);
    }

    /*************** Subject *************/
    console.log(subject);
    if (subject.length < 15 || subject.length > 50) {
      setSubjectFlag(false);
      setSubjectError("Subject length must be 15 to 50.");
    }

    if (subject.length > 15 && subject.length < 50) {
      setSubjectFlag(true);
    }

    /*************** Message *************/
    if (message.length < 40 || message.length > 100) {
      setMessageFlag(false);
      setMessageError("Message length must be 40 to 100.");
    }

    if (message.length > 40 && message.length < 100) {
      setMessageFlag(true);
    }

  }

  return (
    <div className="form-container">
      <h1>Send a message to us!</h1>
      <form type="submit">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        {!nameFlag && <p>{nameError}</p>}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!emailFlag && <p>{emailError}</p>}
        {/* {errorFlag && <p>{error}</p>} */}
        <input
          type="text"
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        {!subjectFlag && <p>{subjectError}</p>}

        <textarea
          placeholder="Message"
          rows="4"
          onChange={(e) => setMessage(e.target.value)}
          required />
        {!messageFlag && <p>{messageError}</p>}
        <button type="submit" onClick={handleSubmit}>
          Send Message
        </button>

      </form>
    </div>
  );
}

export default ContactForm