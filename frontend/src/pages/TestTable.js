
//import Tables from "../../components/Tables.js";
//import KitchenSinkTable from "../../components/KitchenSinkTable.js";
import FinalTable from "../components/MemberTable/MemberTable.js";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
//import {useRoute} from '@react-navigation/native';
//import newEvent from '/newEvent/newEvent.js';
import { useHistory } from "react-router-dom";

export default function TestTable(props) {

  return (
    <Fragment>
       <div id="main_container">
              <FinalTable />
      </div>
    </Fragment>
  )
}
