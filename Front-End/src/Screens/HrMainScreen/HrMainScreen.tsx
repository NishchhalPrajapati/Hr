import { FunctionComponent } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ReadProLogo from "../../assets/images/readPro_logo.png";
import SiderBar from "../../Components/Sidebar/Sidebar";
import "./HrMainScreen.css";

type props = {
  children: React.ReactNode;
};

const HrMainScreen: FunctionComponent<props> = ({ children }) => {
  return (
    <>
      <div className="dashboard">
        <div className="hrDashboardNavbar">
          <div>
            <img
              className="readProLogo"
              src={ReadProLogo}
              alt="Read_Pro_Logo"
            />
          </div>
          <div className="hrNavbar">
            <Navbar />
          </div>
          </div>
          <div className="hrMainAndSideBar">
          <div className="sidebar">
            <SiderBar />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default HrMainScreen;
