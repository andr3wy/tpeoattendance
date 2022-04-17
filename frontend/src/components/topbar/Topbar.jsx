import "./topbar.css";
import { Home, Search, Person, Chat, Notifications,Event } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import "../../pages/AdminCheckIn/AdminCheckIn.js";
import "../../pages/EditMembers/EditMembers.js";
import "../../pages/NewEvent/NewEvent.js";

export default function Topbar() {
  const history = useHistory();
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      <Home className="HomeIcon" onClick={() => {
          history.push("/AdminCheckIn");
        }} />
      <Person className="PersonIcon" onClick={() => {
          history.push("/EditMembers");
        }} />
      <Event className="EventIcon" onClick={() => {
          history.push("/NewEvent");
        }}/>
      </div>
      <div className="topbarCenter">
      </div>
      <div className="topbarRight"></div>
      
    </div>
  );
}

/*export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Lamasocial</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>
      </div>
    </div>
  );
}*/

