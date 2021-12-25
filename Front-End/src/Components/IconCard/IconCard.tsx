import { FunctionComponent } from "react";
import Card from "../Card/Card";
import Home from "../../assets/images/sideBarIcon/Home.svg";
import Company from "../../assets/images/sideBarIcon/Company.svg";
import Users from "../../assets/images/sideBarIcon/Users.svg";
import Calendar from "../../assets/images/sideBarIcon/MonthlyCalendar.svg";
import Leaves from "../../assets/images/sideBarIcon/Suitcase.svg";
import Project from "../../assets/images/sideBarIcon/Project.svg";
import Setting from "../../assets/images/sideBarIcon/Setting.svg";
import Profile from "../../assets/images/sideBarIcon/Profile.svg";

const IconCard: FunctionComponent = () => {
  let icon: any = [
    {
      firstIcon: Home,
      firstIconName: "Dashboard",
      secondIcon: Users,
      secondIconName: "Employees",
    },
    {
      firstIcon: Company,
      firstIconName: "Company",
      secondIcon: Calendar,
      secondIconName: "Calendar",
    },
    {
      firstIcon: Leaves,
      firstIconName: "  Leave",
      secondIcon: Project,
      secondIconName: "Projects",
    },
    {
      firstIcon: Setting,
      firstIconName: "Settings",
      secondIcon: Profile,
      secondIconName: "My Profile",
    },
  ];
  return (
    <>
      <div style={{ marginTop: "25px", marginLeft: "28px" }}>
        <Card
          valueHeight="425px"
          valueWidth="215px"
          valueBoxShadow="0px 0px 4px #9a9a9a61"
          valueBoxRadius="5px"
        >
          <div style={{}}>
            {icon.map((iconUrl: any) => (
              <div style={{ display: "flex" }}>
                <div>
                  <Card
                    valueHeight="107px"
                    valueWidth="107px"
                    valueBoxShadow="0px 1px 4px #e4f5f5"
                    valueBoxRadius="0px"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginTop: "40px" }}>
                        <img
                          style={{ width: "20px", height: "20px" }}
                          src={iconUrl.firstIcon}
                          alt="home"
                        />
                      </div>

                      <div  
                        style={{
                          marginTop: "14px",
                          color:"black",
                          fontSize: "12px",
                          fontFamily: "Poppins",
                          fontWeight: 500,
                        }}
                      >
                        <span>{iconUrl.firstIconName}</span>
                      </div>
                    </div>
                  </Card>
                </div>
                <div>
                  {/* #e4f5f5 */}
                  <Card
                    valueHeight="107px"
                    valueWidth="107px"
                    valueBoxShadow=" 1px 1px 4px #e4f5f5"
                    valueBoxRadius="0px"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ marginTop: "40px" }}>
                        <img
                          src={iconUrl.secondIcon}
                          alt="home"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "14px",
                          color:"black",
                          fontSize: "12px",
                          fontFamily: "Poppins",
                          fontWeight: 500,
                        }}
                      >
                        <span>{iconUrl.secondIconName}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default IconCard;
