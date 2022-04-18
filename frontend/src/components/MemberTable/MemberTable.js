import React, { useState, useEffect } from 'react';
import './MemberTable.css';
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
    {title: "id", field: "id", hidden: true},
    {title: "Name", field: "name" },
    {title: "Fellowship", field: "fellowship"}
  ]
  const [data, setData] = useState([]); //all table (firebase database) data
  
  function onRowClick(event, rowData) {
    this.props.onViewItem(this.props.endpoint, rowData.id);
  }
  //for error handling
  
  /*const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  let initLoad= false;*/
  let initLoad= false;

  useEffect(() => {
    const fetchData = async () => {
      console.log("penis");
       await fetch('https://attendancetpeo.herokuapp.com/api/usersAndAttendance', {
           method: 'GET',
           headers: {
                mode: 'cors',
                Authorization: "Bearer " + localStorage.getItem("@token"),'Content-Type': 'application/json',
           },
       }).then((response) => {
                return response.json()}).then((res) => {
                   console.log(res.data);
                   var gendata = res;
                   console.log('before setting data');
                   setData(gendata);



       }).catch(error => {
           console.log(error);
       })
       }
       /*if (initLoad=== false){
        fetchData();
       }*/
       fetchData();
   }, [props.type])
  
   /*async function loadData(){
    console.log("inside load data");
    const request = await fetch("http://localhost:4000/usersAndAttendance", {
                  method: "GET",
                  mode: 'cors',
                  headers: {'Content-Type': 'application/json'}
              })
              const response = await request.json();
              const status = await request.status;
              if (status === 200) {
                const temp=response;
                setData(temp);
                console.log("loadData temp " + temp);
              }
                
                
                
            }
  
  console.log("load data");
  loadData();
  */

  /*useEffect(() => { 
    api.get("/users")
        .then(res => {
            console.log(res.data.data)
            //setData(res.data.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])*/

  /*const request = await fetch("http://localhost:4000/all-users", {
                method: "POST",
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            const result = await request.json();
            const status = await request.status;
            console.log(result);*/

  //new,old date just row to be updated
  //const handleRowUpdate = (newData, oldData, resolve) => {
  async function handleRowAdd(newData,  resolve) {
    console.log("newdata");
    console.log(newData);
    //validation
    let errorList = []
    if(newData.name === ""){
      errorList.push("Please enter member name")
    }
    if(newData.fellowship === ""){
      errorList.push("Please enter fellow type")
    }
    console.log("errorList "+ errorList);
    
    //if there are no errors with row update: all fields complete and valid
    if(errorList.length < 1){
      console.log("handleRowAdd name: "+ newData.name+ " fellowship: " + newData.fellowship);
      const request = await fetch("https://attendancetpeo.herokuapp.com/api/create-user", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),"Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newData.name, fellowship: newData.fellowship }),
      });
      // Get Status and Response
      const response = await request.json();
      const status = await request.status;


      //api.patch("/users/"+newData.id, newData)
      //.then(res => {

        if (status===200){
          let dataToAdd = [...data]; //data=all current data in database
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve()
          /*setErrorMessages([])
          setIserror(false)*/
        }
        console.log("print data");
        console.log(JSON.stringify(data));
        //console.log("data var after row add "+ JSON.stringify(data[1])+ "  " +data[2][1] );

      
  /*})
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }*/
    
  }
}

  //const handleRowUpdate = (newData, oldData, resolve) => {
  async function handleRowUpdate (newData, oldData, resolve){
    //validation
    console.log("new name"+ newData.name);
    console.log("old name"+ oldData.name);
    let errorList = []
    if(newData.name === ""){
      errorList.push("Please enter member name")
    }
    if(newData.fellowship === ""){
      errorList.push("Please enter fellow type")
    }

    if(errorList.length < 1){ //no error
      //api.post("/users", newData)

      console.log("handleRowUpdate name: "+ newData.name+ " fellowship: " + newData.fellowship);
      const request = await fetch("https://attendancetpeo.herokuapp.com/api/change-name", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),"Content-Type": "application/json",
        },
        body: JSON.stringify({ name: oldData.name, newName:newData.name }),
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
          console.log("set data after row update " + setData);
          resolve()
          /*setIserror(false)
          setErrorMessages([])*/
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
    
    console.log(" handleRowDelete id: "+ oldData.id+" handleRowDelete name: "+ oldData.name+ " fellowship: " + oldData.fellowship);
    console.log(oldData);
      const request = await fetch("https://attendancetpeo.herokuapp.com/api/delete", {
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
        const dataDelete = [...data];
        const index = oldData.tableData.index;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
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
                history.push({pathname:"/app/IndividAttendance",
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