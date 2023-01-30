import React,{useState, useEffect} from 'react';
import axios from 'axios';

function ProfileDetails() {

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token,setToken] = useState(sessionStorage.getItem("token"));


  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get("http://127.0.0.1:8000/user-profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDetails(response.data);
    setIsLoading(false);
  };
    // return 
    //   .get("http://127.0.0.1:8000/user-profile/", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
      // .then((response) => setDetails(response.data.data))
      // .catch((error) => console.log(error));




   useEffect(() => {
     fetchData();
   }, []);

  
        


// console.log(details)

  return (
    <div className="profile-sub-2">

      {!isLoading && details !== null &&
        <>
          <h2>Profile</h2>
          <hr />
          <div className="down-pf"></div>
          <div className="profile-sub-3">
            <h4>Name:</h4>
            <p>{details.data["name"]}</p>
          </div>
          <div className="profile-sub-3">
            <h4>Email:</h4>
            <p>{details.data["email"]}</p>
          </div>
          <div className="profile-sub-3">
            <h4>Mobile No:</h4>
            <p></p>
          </div>
        </>
      }
      
      {isLoading && 
        <>
            <div className="error">
        <h1>
          <center>Loading...</center>
          <center>            
              {/* <Link to="/"><h6>Back to home</h6></Link> */}
          </center>
        </h1>
        </div>
        </>
      }
    </div>
  );
}

export default ProfileDetails