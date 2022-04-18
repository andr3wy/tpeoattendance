//import "./AdminCheckIn.css";
import "./IndividAttendance.css";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
//import {useRoute} from '@react-navigation/native';
//import newEvent from '/newEvent/newEvent.js';
import { useHistory } from "react-router-dom";

// import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function IndividAttendance(props) {
  //const navigate= useNavigate();
  const history = useHistory();
  /*const route = useRoute();
  console.log(route.name);*/
    let self = this;
    let meetings = {};
    let productCount = 0;
    var generalCount = 0;
    var designCount = 0;
    var engineeringCount = 0;
    const[meeting, setMeetings] = useState({})
    async function handleData(data) {
        console.log(data);
        const request = await fetch("http://localhost:4000/statsuser", {
            method: "POST",
            mode: 'cors',
            headers: {Authorization: "Bearer " + localStorage.getItem("@token"),'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        const result = await request.json();
        const status = await request.status;

        let temp = {};
        let product = 0;
        let general = 0;
        let engineering = 0;
        let design = 0;
        Object.values(result).forEach((object) => {
            if(object === "Product") {
                product += 1;
            }
            if(object === "General") {
                general += 1;
            }
            if(object === "Engineering") {
                engineering += 1;
            }
            if(object === "Design") {
                design += 1;
            }
            console.log("temmmmpp");
        })
        temp.Product = product;
        temp.General = general;
        temp.Engineering = engineering;
        temp.Design = design;

        // meetings.Product = product;
        // meetings.General = general;
        // meetings.Engineering = engineering;
        // meetings.Design = design;
        //
        productCount = product;
        generalCount = general;
        engineeringCount = engineering;
        designCount = design;
        // console.log(productCount);
        // console.log(designCount);
        //
        //
        // console.log(temp);
        // console.log(meetings);

        setMeetings(temp);



    }
    console.log("meetings");
    // console.log(meetings);
    const location = useLocation()
    console.log(location.state.id);
    useEffect(() => {
        console.log("peneneisisis")
        handleData({id:location.state.id});

    }, [])

    console.log("right before");

    console.log(designCount);



    return (

        <Fragment>
          <div id="page_container">
          <Topbar />
            <div id= "containerrrrrrr">
              <h2 className="test_gen_header"> Member Info </h2>
                {/*<h2 id= "new_gen_Header "> Member Information</h2>*/}
                <div id= "attendance_info">
                    <h3 id= "attendance_header"> Attendance</h3>
                    <div id= "full_attendance_section">
                      <div id = "meeting_attendance_button">
                          <h3 id= "attendance_button_header"> Product: </h3> 
                      </div>
                      <h3 id = "num_meetings"> {meeting.Product} </h3>
                    </div>
    
                    <div id= "full_attendance_section">
                      <div id = "meeting_attendance_button">
                          <h3 id= "attendance_button_header"> General: </h3> 
                      </div>
                      <h3 id = "num_meetings"> {meeting.General} </h3>
                    </div>
    
                    <div id= "full_attendance_section">
                      <div id = "meeting_attendance_button">
                          <h3 id= "attendance_button_header"> Design: </h3> 
                      </div>
                      <h3 id = "num_meetings"> {meeting.Design} </h3>
                    </div>
    
                    <div id= "full_attendance_section">
                      <div id = "meeting_attendance_button">
                          <h3 id= "attendance_button_header"> Engineering: </h3> 
                      </div>
                      <h3 id = "num_meetings"> {meeting.Engineering} </h3>
                    </div>
    
    
    
                    {/*<div id = "meeting_attendance_button">
                        General: {meeting.General}
                    </div>
                    <div id = "meeting_attendance_button">
                        Design: {meeting.Design}
                    </div>
                    <div id = "meeting_attendance_button">
                        Engineering: {meeting.Engineering}
                    </div>*/}
                </div>
            </div>
            </div>
        </Fragment>
      )
}
