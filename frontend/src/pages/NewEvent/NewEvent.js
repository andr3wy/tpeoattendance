import "./NewEvent.css";
import { useEffect, useState, Fragment } from "react";

import Topbar from "../../components/topbar/Topbar";
//import { useNavigate } from "react-router-dom";
import MeetingTable from "../../components/MeetingTable/MeetingTable.js";
import { useHistory } from "react-router-dom";
import "../TestTable.js";

export default function NewEvent(props) {
  console.log('in new event');
  const history = useHistory();
  const [allEvents, setallEvents] = useState([]);
  const [inputEvent, setinputEvent]= useState('');

    function addNewEvent(){
        if (inputEvent & !(allEvents.includes(inputEvent))){
            setallEvents(allEvents.concat(inputEvent));
            setinputEvent("");}
    }

    function deleteEvent(){
        if (inputEvent & (allEvents.includes(inputEvent))){
            var index= allEvents.indexOf(inputEvent);
            setallEvents(allEvents.splice(index,1));
        }
    }

  return (
    <Fragment>
      <div id="new_event_container">
        {/*<div id= "center_events_container">*/}
            {/*
            <h2 id= "New_Event_Header"> Meeting Manager</h2>
            */}
            <Topbar />

            
          

            <MeetingTable/>
        </div>
        {/*</div>*/}
    </Fragment>
    //h
  )
}
