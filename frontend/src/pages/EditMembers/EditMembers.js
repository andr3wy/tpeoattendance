import "./EditMembers.css";
import Topbar from "../../components/topbar/Topbar";

//import Tables from "../../components/Tables.js";
//import KitchenSinkTable from "../../components/KitchenSinkTable.js";
import MemberTable from "../../components/MemberTable/MemberTable.js";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
//import {useRoute} from '@react-navigation/native';
//import newEvent from '/newEvent/newEvent.js';
import { useHistory } from "react-router-dom";

export default function EditMembers(props) {
  const history = useHistory();

  const [members, setMembers] = useState([]);

  return (
    <Fragment>
       <div id="member_container">
        <Topbar/>
        {/*<div id= "center_member_container">*/}
             
              <MemberTable />
      
        {/*</div>*/}
         
        
                    
        </div>
    </Fragment>
  )
}
