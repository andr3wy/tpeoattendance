//import "./AdminCheckIn.css";
import "./AdminCheckIn.css";
import ".//src/components/Table.js";
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

    /*let _index = props.state.index;
    let _routeName = props.state.routeNames;
    return  _routeName[_index]*/

    //console.log(props.navigation.state.routeName);
    //console.log(navigate.state.routeName);

  const [name, setName] = useState('');
  const [meetingType, setmeetingType] = useState('');
  const [checkedIn, setcheckedIn] = useState(false);

  function printName(input){
    setName(input);
    console.log(name);
  }

  /*function doTask(cur_index) {
    setToDo(toDoTasks.filter((task) => task != toDoTasks[cur_index]));
    setDone(finishedTasks, ... toDoTasks[cur_index]);
  }

  function removeTask(cur_index){
    removedTask= finishedTasks[cur_index];
    setDone(finishedTasks.filter((task) => task != removedTask));
    setToDos(toDoTasks, ... removedTask);
  }*/
  // setName(event.target.value)

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
                        history.push("/NewEvent")
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
                      history.push('/AdminCheckIn')
                      }>Events</button>
                    <button id = "function_button" onClick={() => 
                      //navigate('/AdminCheckIn')
                      history.push('/AdminCheckIn')
                      }>Members</button>
            </div>
        </div>
        </div>
    </Fragment>
  )
}
