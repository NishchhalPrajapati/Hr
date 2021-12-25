import React from "react";
import Card from "../Card/Card";
import "./TimeSheet.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../CommonStyle/HrMain.css";
export const TimeSheet = () => {
  return (
    <>
      <div>
        <div className="timeSheet">
          <Card
            valueHeight="320px"
            valueWidth="255px"
            valueBoxShadow="0px 0px 2px #9a9a9a61"
            valueBoxRadius="25px"
          >
            <div className="dashboardActivityHeadingContainer">
              <div className="DashboardTitles">
                <span>Timesheet </span>
              </div>
              <div className="timesheetDate">
                <span>11 Mar 2019</span>
              </div>
            </div>

            <div className="punchTextBox">
              <Card
                valueHeight="50px"
                valueWidth="235px"
                valueBoxShadow="0px 0px 2px #9a9a9a61"
                valueBoxRadius="15px"
              >
                <div className="punchInAtTextBox">
                  <div className="punchInAt">
                    <span>Punch In at</span>
                  </div>
                  <div className="punchInAtDate">
                    <span>Wed, 11th Mar 2019 10.00 AM</span>
                  </div>
                </div>
              </Card>
            </div>
            <div
              style={{
                width: 90,
                height: 90,
                position: "absolute",
                top: "115px",
                left: "80px",
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
            >
              <CircularProgressbar
                styles={buildStyles({
                  pathColor: `#279EA0`,
                  textColor: "#394158",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
                value={3.45}
                maxValue={8}
                minValue={1}
                text={`3.45hrs`}
              />
            </div>
            <div>
              <div className="punchOutBtnBox">
                <button className="punchOutBtn">
                  <span className="punchOutBtnText">Punch Out</span>
                </button>
              </div>
            </div>
            <div
              className="breakAndOvertime"
              style={{
                fontFamily: "Poppins",
                color: "rgba(69,72,75,1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTop: "1px solid rgb(244,247,247)",
              }}
            >
              {/* #9a9a9a61 */}
              <div
                style={{
                  borderRight: "1px solid rgb(244,247,247)",
                  position: "absolute",
                  width: "50%",
                  top: "10px",
                  right: "50%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    position: "relative",

                    textAlign: "center",
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  Break
                </span>

                <span
                  style={{
                    marginLeft: "1px",
                    fontSize: "9px",
                    fontWeight: 500,
                  }}
                >
                  1.21hr
                </span>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "50%",
                  height: "100%",
                  left: "25%",
                  top: "10px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    position: "relative",

                    textAlign: "center",
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  Overtime
                </span>
                <span style={{ fontSize: "9px" }}>3hr</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

// <Card
//                 valueHeight="44px"
//                 valueWidth="100%"
//                 valueBoxShadow="0 -0.5px 2px #9a9a9a61"
//                 valueBoxRadius="0px"
//               ></Card>
