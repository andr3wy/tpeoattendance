//import "./AdminCheckIn.css";
//import "./IndividMeeting.css";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
//import {useRoute} from '@react-navigation/native';
//import newEvent from '/newEvent/newEvent.js';
import { useHistory } from "react-router-dom";

// import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function IndividMeeting(props) {
    console.log("in individ meeting")
    //const navigate= useNavigate();
    const history = useHistory();
    //const location = useLocation();
    /*const route = useRoute();
    console.log(route.name);*/
    let self = this;
    /*let meetings = {};
    let productCount = 0;
    var generalCount = 0;
    var designCount = 0;
    var engineeringCount = 0;*/
    let people= [];
    const[peoples, setPeoples] = useState([])
    async function handleData(data) {
        console.log("in individ meeting")
        console.log(data);
        const request = await fetch("https://attendancetpeo.herokuapp.com/api/statsmeeting", {
            method: "POST",
            mode: 'cors',
            headers: {Authorization: "Bearer " + localStorage.getItem("@token"),"Content-Type": "application/json",},
            body: JSON.stringify(data)
        })
        const result = await request.json();
        const status = await request.status;

        let temp = [];

        Object.keys(result).forEach((object) => {
            temp.push(object);
            console.log("temp");
            //console.log()
        })

        setPeoples(temp);
        //console.log(peoples);



    }
    console.log("peoples");
    console.log(peoples);
    const location = useLocation()
    console.log(location.state.id);
    useEffect(() => {
        handleData({id:location.state.id});

    }, [])

    console.log("right before");

    //console.log(designCount);



    return (

        <Fragment>
            <div id="page_container">
                <Topbar />
                <div id= "containerrrrrrr">
                    <h2 className="test_gen_header"> Meeting Info </h2>
                    {/*<h2 id= "new_gen_Header "> Member Information</h2>*/}
                    <div id= "attendance_info">
                        {/*<h3 id= "attendance_header"> Meeting</h3>*/}
                        <div id = "meeting_attendance_button">
                            People:
                            <ul>
                                {peoples.map((user) => {
                                    return <li>{user.toUpperCase()}</li>
                                })}
                            </ul>

                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}