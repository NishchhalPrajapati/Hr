import { FunctionComponent } from "react";
import SideMenuIcon from "../../assets/images/side_menu_icon.png";
import MsgIcon from "../../assets/images/msg_icon.png";
import NotificationIcon from "../../assets/images/notification_icon.png";
import NavProfile from "../../assets/images/nav_profile.png";
import Search from "../../assets/images/sideBarIcon/Search.svg";
import NavDropDown from "../../assets/images/drop_down_icon.png";
import "./Navbar.css";
import SearchBox from "../SearchBox/SearchBox";
const Navbar: FunctionComponent = () => {
  return (
    <>
      <div className="navbar">
        <div>
          {/* <img className="sideMenuIcon" src={SideMenuIcon} alt="Mask_Group" /> */}
        </div>
        <div className="rightBox">
          <div className="navSearchBox">
            <SearchBox
              searchBorderRadiusValue="25px"
              searchWidthValue="25%"
              searchHeightValue="20px"
              searchPlaceholderValue="Search here..."
              searchTypeValue="text"
              searchBorderOrNot="none"
              searchBoxPaddingLeft="30px"
            />
          </div>
          <img className="searchIcon" src={Search} alt="search" />
          <img
            className="notificationIcon"
            src={NotificationIcon}
            alt="notification"
          />
        
          <img className="msgIcon" src={MsgIcon} alt="Mask_Group_3" /> 
          
            <img className="navProfileIcon" src={NavProfile} alt="Profile" />
              <span className="circle"></span>
             
          <img className="dropDown" src={NavDropDown} alt="DropDown" />
          <span id="admin">Admin</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
