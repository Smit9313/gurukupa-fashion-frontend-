import React,{ useState } from 'react';
import '../Style/contactform.css';
import { Toaster, toast } from "react-hot-toast";
import axios from 'axios';
import qs from "qs";

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
    // console.log(name);
    let nameNull = name.trim() === "";
    // let nameNotNull = name.trim() !== "";
    // let minNameLength = name.trim().length < 6;
    // let maxNameLength = name.trim().length > 10;

    if (nameNull) {
      setNameFlag(false);
      setNameError("Name Should not blank.");
    }

    // if ((minNameLength || maxNameLength) && nameNotNull) {
    //   setNameFlag(false);
    //   setNameError("Name length must be 6 to 10");
    // }

    if (!nameNull) {
      setNameFlag(true);
    }

    /*************** Email *************/
    // console.log(email);
    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let emailNull = email.trim() === "";

    if (emailNull) {
      setEmailFlag(false);
      setEmailError("Email Should not be blank.");
    }

    if (!email_pattern.test(email)) {
      setEmailFlag(false);
      setEmailError("Enter Valid Email.");
    }

    if (!emailNull && email_pattern.test(email)) {
      setEmailFlag(true);
       setEmailError("");
    }

    /*************** Subject *************/
    // console.log(subject);
    if (subject === "") {
      setSubjectFlag(false);
      setSubjectError("Subject should not be blank!.");
    }

    if (subject !== "") {
      setSubjectFlag(true);
      setSubjectError("");
    }

    /*************** Message *************/
    if (message === '') {
      setMessageFlag(false);
      setMessageError("Message should not be blank!");
    }

    if (message !== "") {
      setMessageFlag(true);
       setMessageError("");
    }

    if(nameNull || emailNull || !email_pattern.test(email) || subject === "" || message === ''){
      toast.error("Something wrong!", {
        duration: 3000,
      });
    }

    if(!nameNull && !emailNull && email_pattern.test(email) && subject !== "" && message !== ""){
      
      const headers = { "Content-Type": "application/jsonn" };
      try {
        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/contact-us/`,
            {
              name: name,
              email: email,
              subject: subject,
              message: message,
            },
            { headers }
          )
          .then((response) => {
            console.log(response)
            if (response.data.message === "Success!") {
              setName("");
              setEmail("");
              setSubject("");
              setMessage("");

              toast.success("Message sended!", {
                duration: 3000,
              });
            }else{
              toast.error(response.data.message, {
                duration: 3000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}

    }


  }

  return (
    <>
      <div className="form-container">
        <h1>Send a message to us!</h1>
        <form type="submit">
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          {!nameFlag && <p>{nameError}</p>}
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!emailFlag && <p>{emailError}</p>}
          {/* {errorFlag && <p>{error}</p>} */}
          <input
            type="text"
            value={subject}
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          {!subjectFlag && <p>{subjectError}</p>}

          <textarea
            placeholder="Message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          {!messageFlag && <p>{messageError}</p>}
          <button type="submit" onClick={handleSubmit}>
            Send Message
          </button>
        </form>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 10,
        }}
        reverseOrder={true}
      />
    </>
  );
}

export default ContactForm