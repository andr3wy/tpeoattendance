import "./Home.css";
import { useEffect, useState, Fragment } from "react";
//import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ".//image_2.png";

/*Modify the Home.js file with the following:
Make buttons with entry types: 
in one div: 1. attendee name 
in another div: type of meeting
    1. general meeting 
    2. new fellow meeting
    3. engineering meeting
    4. product meeting
    5. design meeting

Make another button for the check in.
*/

export default function Home(props) {
  //const navigate = useNavigate();
  const history = useHistory();
  const [name, setName] = useState('');
  const [meetingType, setmeetingType] = useState('');
  const [checkedIn, setcheckedIn] = useState(false);

  function printName(input){
    setName(input);
    console.log(name);
  }


  return (
    <Fragment>
      <div id="new_container">
        
      {/*<img
              className="tpeoLogoPhoto"
              src={"./image_2.png"}
              alt="tpeo logo here"
      />*/}
        <h2 id= "home_header"> TPEO Attendance</h2>
        
            <input 
                placeholder="Full Name"
                id= "name_input_bar"
                value={name}
                onChange={(event) => printName(event.target.value)}
            ></input>
        {console.log(name)}
    
          
        <div id= "all_buttons">
            <div className= "meeting_type_buttons">
                <button id='meeting_button' onClick={() => setmeetingType("general")}>General Meeting</button> 
                <button id='meeting_button' onClick={() => setmeetingType("engineering")}>Engineering</button>
                <button id='meeting_button' onClick={() => setmeetingType("new_fellow")}>New Fellow</button>
                <button id='meeting_button' onClick={() => setmeetingType("product")}> Product</button>
                <button id='meeting_button' onClick={() => setmeetingType("design")}> Design</button>
            </div>
            <button id='check_in_button' onClick={() => setcheckedIn(true)}>Check In</button>
          </div>
            
        
        <button
        className="admin-checkin-button"
        onClick={() => {
          localStorage.removeItem("@token");
          history.push("/AdminCheckIn");
        }}>
        Admin? Click Here
        </button>
      </div>
    </Fragment>
  )
}
