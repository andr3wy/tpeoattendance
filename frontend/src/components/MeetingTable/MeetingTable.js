import React, { useState, useEffect } from 'react';
import './MeetingTable.css';
import { forwardRef } from 'react';
//import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import MaterialTable from '@material-table/core';
import { useHistory } from "react-router-dom";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';

import  "../../pages/IndividAttendance/IndividAttendance.js";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
  baseURL: `https://reqres.in/api`
})



//export default function MeetingTable() {
  const MeetingTable = (props) => {

    const history = useHistory();
    const columns = [
    {title: "id", field: "id", hidden:true},
    //{title: "Name", field: "name" },
    {title: "Type", field: "type"},
    {title: "Attendance", field: "attendancePeople"},
    {title: "Start Date and Time", field: "start"},
    {title: "End Date and Time", field: "end"}
  ]
  const [data, setData] = useState([]); //all table (firebase database) data
  
  
  //for error handling
  

  useEffect(() => {
    const fetchData = async () => {
       await fetch('https://attendancetpeo.herokuapp.com/api/allmeetings', {
           method: 'GET',
           headers: {
            Authorization: "Bearer " + localStorage.getItem("@token"),'Content-Type': 'application/json',
           },
       }).then((response) => {
           response.json().then((json) => {
               //initLoad= true;
               var gendata = json;
               console.log('before setting data');
               setData(gendata); 
               console.log('new set data '+ data);
           })
       }).catch(error => {
           console.log(error);
       })
       }
       fetchData();
   }, [setData])
  
   

  //new,old date just row to be updated
  //const handleRowUpdate = (newData, oldData, resolve) => {
  async function handleRowAdd(newData,  resolve) {
    console.log("newdata");
    console.log(newData);
    //validation
    let errorList = []
    if(newData.type === ""){
      errorList.push("Please enter meeting type")
    }
    if(newData.number === undefined){
      newData.number =0;
      //errorList.push("Please enter number of people at meeting")
    }
    if(newData.start === ""){
      errorList.push("Please enter meeting start time")
    }
    if(newData.end === ""){
      errorList.push("Please enter meeting end time")
    }
    console.log("errorList "+ errorList);
    
    //let tempEnd= newData.end;

    let tempStart = new Date(newData.start);
    console.log(tempStart.toString());
    console.log(tempStart.toISOString());
    tempStart = new Date(tempStart);
    let res= tempStart.getTime();
    console.log(res);

    let tempEnd = new Date(newData.end);
    console.log(tempEnd.toString());
    console.log(tempEnd.toISOString());
    tempEnd= new Date(tempEnd);
    let resEnd= tempEnd.getTime();
    console.log(resEnd);



    //if there are no errors with row update: all fields complete and valid
    if(errorList.length < 1){
      console.log("handleRowAdd type: "+ newData.type+ " attendance: " + newData.number + " start time: " + newData.start + " end time: " + newData.end);
      const request = await fetch("https://attendancetpeo.herokuapp.com/api/create-meeting", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),"Content-Type": "application/json",
        },
        body: JSON.stringify({ type: newData.type, start: res, end: resEnd}),
      });
      // Get Status and Response
      const response = await request.json();
      const status = await request.status;


      //api.patch("/users/"+newData.id, newData)
      //.then(res => {

        if (status===200){
          let dataToAdd = [...data]; //data=all current data in database
          console.log("teeeemmmp" + response.msg);
          newData.id = response.msg;
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve()
          /*setErrorMessages([])
          setIserror(false)*/
        }
        console.log("print data");
        console.log(JSON.stringify(data));
        //console.log("data var after row add "+ JSON.stringify(data[1])+ "  " +data[2][1] );

  }
}

  //const handleRowUpdate = (newData, oldData, resolve) => {
  async function handleRowUpdate (newData, oldData, resolve){
    //validation
    let errorList = []

    if(errorList.length < 1){ //no error
      //api.post("/users", newData)

      console.log("handleRowUpdate type: "+ newData.type+ " attendance: " + newData.number + " start time: " + newData.start + " end time: " + newData.end);
      const request = await fetch("https://attendancetpeo.herokuapp.com/api/edit-meeting", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),"Content-Type": "application/json",
        },
        //
        body: JSON.stringify({ meetingID: newData.id, type: newData.type, start: newData.start, end: newData.end, people: newData.people }),
      });
      // Get Status and Response
      const response = await request.json();
      const status = await request.status;



      //.then(res => {
        if (status === 200) {

          const dataUpdate = [...data]; //data=all current data in database
          //get the index of the row using its unique id 
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);

          console.log("data update after row update " +dataUpdate);
          console.log("set data after row update " + data);
          resolve()
          /*setIserror(false)
          setErrorMessages([])*/
      }
         else {
           console.log("errrorr");
        }
      //})
      /*.catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
      */
    }

    
  }

  async function handleRowDelete (oldData, resolve) {
    
    console.log(" handleRowDelete id: "+ oldData.id);
    console.log(oldData);
    console.log(oldData + oldData.id);
      const request = await fetch("https://attendancetpeo.herokuapp.com/api/deletemeeting", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),"Content-Type": "application/json",
        },
        body: JSON.stringify({ id: oldData.id}),
      });
      // Get Status and Response
      const response = await request.json();
      const status = await request.status;


    //api.delete("/users/"+oldData.id)
      //.then(res => {
      if (status===200){
        console.log("pizookie 1")
        const dataDelete = [...data];
        const index = oldData.tableData.index;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        console.log("pizookie");
        // setData([]);
        resolve()
      }
      //)
      //.catch(error => {
      else{
        console.log('delete failed');
        /*setErrorMessages(["Delete failed! Server error"])
        setIserror(true)*/
        resolve()
      }
      //)
  }


  return (
    <div className="table_container">
      
      <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
          {/*<div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>*/}
            <MaterialTable
              id= "materialTable"
              style={{ width: '80vw',  left: '-30%', top: '-20%'}}
              title="Member Manager"
              columns={columns}
              data={data}
              icons={tableIcons}
              //onRowClick={onRowClick}
              onRowClick={(event, rowData) => {
                //for a static path with no params

                console.log(rowData.id);
                history.push({pathname:"/IndividMeeting",
                  state: {id: rowData.id}});
                //for dynamic path with id coming from data, feel free to edit history.push above
              }}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                      
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  );
}

export default MeetingTable;