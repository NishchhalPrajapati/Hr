import React from "react";
import Card from "../Card/Card";
import Clock from "../../assets/images/clock_icon.png";
import "./TodayActivity.css";
export const TodayActivity = () => {
  let todayActivityData: any = [
    {
      punchInOrPunchOut: "Punch In at",
      punchInOrPunchOutTime: "10.00 AM",
    },
    {
      punchInOrPunchOut: "Punch Out at",
      punchInOrPunchOutTime: "11.00 AM",
    },
    {
      punchInOrPunchOut: "Punch In at",
      punchInOrPunchOutTime: "11.30 AM",
    },
    {
      punchInOrPunchOut: "Punch Out at",
      punchInOrPunchOutTime: "01.30 AM",
    },
    {
      punchInOrPunchOut: "Punch In at",
      punchInOrPunchOutTime: "02.30 AM",
    },
    {
      punchInOrPunchOut: "Punch In at",
      punchInOrPunchOutTime: "04.15 AM",
    },
    {
      punchInOrPunchOut: "Punch Out at",
      punchInOrPunchOutTime: "7.00 AM",
    },
  ];
  return (
    <div>
      <>
        <div>
          <div className="todayActivity">
            <Card
              valueHeight="320px"
              valueWidth="285px"
              valueBoxShadow="0px 0px 2px #9a9a9a61"
              valueBoxRadius="25px"
            >
              <div className="dashboardActivityHeadingContainer">
                <span className="DashboardTitles">Today Activity</span>
              </div>

              <div className="todayActivityCircle">
                {todayActivityData.map((data: any, key: number) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ marginTop: "-40px" }}>
                      <svg className="circleSvg" viewBox="0 0 20 20">
                        <path
                          className="circle"
                          d="M 10 0 C 15.52284812927246 0 20 4.477152347564697 20 10 C 20 15.52284812927246 15.52284812927246 20 10 20 C 4.477152347564697 20 0 15.52284812927246 0 10 C 0 4.477152347564697 4.477152347564697 0 10 0 Z"
                        ></path>
                      </svg>

                      <div className="vl"></div>
                    </div>
                    <div className="todayActivitypunchInAtText">
                      <span
                        style={{
                          fontFamily: "Poppins",
                          color: "rgba(69, 72, 75, 1)",
                          fontSize: "9px",
                          fontWeight: "bold",
                        }}
                      >
                        {data.punchInOrPunchOut}
                      </span>
                      <div style={{ display: "flex" }}>
                        <div style={{ marginTop: "-1px" }}>
                          <img className="clockSvg" src={Clock} alt="clock" />
                        </div>
                        <span
                          style={{
                            marginLeft: "4px",
                            marginTop: "2px",
                            fontFamily: "Poppins",
                            color: "#C3C4D4",
                            fontSize: "8px",
                            fontWeight: 500,
                          }}
                        >
                          {data.punchInOrPunchOutTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </>
    </div>
  );
};
