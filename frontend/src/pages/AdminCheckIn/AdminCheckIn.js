//import "./AdminCheckIn.css";
import "./AdminCheckIn.css";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
//import {useRoute} from '@react-navigation/native';
//import newEvent from '/newEvent/newEvent.js';
import { useHistory } from "react-router-dom";

export default function AdminCheckIn(props) {
  //const navigate= useNavigate();
  const history = useHistory();
  /*const route = useRoute();
  console.log(route.name);*/


  return (
    <Fragment>
      <div id="admin_container">
        <div id= "main_right_container">
            <h2 id= "Admin_Header"> Welcome Back</h2>
            <div className= "event_buttons">
                    <button id= "event_button" onClick={() => {
                        //console.log(this.route.name);
                        localStorage.removeItem("@token");
                        //navigate('/NewEvent')
                        history.push('/NewEvent')
                        }}>Create an Event</button> 
                    <button id= "event_button" onClick={() => history.push("/EditAccount")}>Edit Account</button>
                    <button id= "event_button" onClick={() => history.push("/MemberSearch")}>Member Search</button>
                    <button id= "event_button" onClick={() => history.push("/EditMembers")}>Add/Remove Member</button>
            </div>
        </div>
        <div id= "sidebar">
            <span id = "sidebar_header"> TPEO Admin</span>
            <div id= "side_bar_buttons">
                    <button id = "function_button" onClick={() => 
                      //navigate('/AdminCheckIn')
                      history.push('/AdminCheckIn')
                      }>Dashboard</button> 
                    <button id = "function_button" onClick={() => 
                      //navigate('/AdminCheckIn')
                      history.push('/NewEvent')
                      }>Events</button>
                    <button id = "function_button" onClick={() => 
                      //navigate('/AdminCheckIn')
                      history.push("/EditMembers")
                      }>Members</button>
            </div>
        </div>
        </div>
    </Fragment>
  )
}
