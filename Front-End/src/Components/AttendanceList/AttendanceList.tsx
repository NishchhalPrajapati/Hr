import React from "react";
import Card from "../Card/Card";
import "./AttendanceList.css";
export const AttendanceList = () => {
  let data: any = [
    {
      SNo: "1",
      Date: "19 Feb 2019",
      PunchIN: "10AM",
      PunchOut: "7pm",
      Production: "9hrs",
      Break: "1hrs",
      Overtime: "2hr",
    },
    {
      SNo: "2",
      Date: "20 Feb 2019",
      PunchIN: "10AM",
      PunchOut: "7pm",
      Production: "9hrs",
      Break: "1hrs",
      Overtime: "2hr",
    },
    {
      SNo: "3",
      Date: "21 Feb 2019",
      PunchIN: "10AM",
      PunchOut: "7pm",
      Production: "9hrs",
      Break: "1hrs",
      Overtime: "2hr",
    },
    {
      SNo: "4",
      Date: "22 Feb 2019",
      PunchIN: "10AM",
      PunchOut: "7pm",
      Production: "9hrs",
      Break: "1hrs",
      Overtime: "2hr",
    },
    {
      SNo: "5",
      Date: "23 Feb 2019",
      PunchIN: "10AM",
      PunchOut: "7pm",
      Production: "9hrs",
      Break: "1hrs",
      Overtime: "2hr",
    },
    {
      SNo: "6",
      Date: "24 Feb 2019",
      PunchIN: "10AM",
      PunchOut: "7pm",
      Production: "9hrs",
      Break: "1hrs",
      Overtime: "2hr",
    },
  ];
  return (
    <>
      <div style={{ width: "100%" }}>
        <Card
          valueHeight="295px"
          valueWidth="65%"
          valueBoxShadow="0px 0px 2px #9a9a9a61"
          valueBoxRadius="25px"
        >
          <div className="dashboardActivityHeadingContainer">
            <span className="DashboardTitles">Attendance List</span>
          </div>
          <div>
            <table width="100%" className="attendanceListTableBox">
              <tr>
                <td>
                  <span className="attendanceListTableHading">S. No</span>
                </td>
                <td>
                  <span className="attendanceListTableHading">Date</span>
                </td>{" "}
                <td>
                  <span className="attendanceListTableHading">Punch In</span>
                </td>{" "}
                <td>
                  <span className="attendanceListTableHading">Punch Out</span>
                </td>
                <td>
                  <span className="attendanceListTableHading">Production</span>
                </td>{" "}
                <td>
                  <span className="attendanceListTableHading">Break</span>
                </td>
                <td>
                  <span className="attendanceListTableHading">Overtime</span>
                </td>
              </tr>

              {data.map((items: any) => (
                <tr>
                  <td>
                    <span className="attendanceListTableHading">
                      {items.SNo}
                    </span>
                  </td>
                  <td>
                    <span className="attendanceListTable">{items.Date}</span>
                  </td>{" "}
                  <td>
                    <span className="attendanceListTable">{items.PunchIN}</span>
                  </td>{" "}
                  <td>
                    <span className="attendanceListTable">
                      {items.PunchOut}
                    </span>
                  </td>
                  <td>
                    <span className="attendanceListTable">
                      {items.Production}
                    </span>
                  </td>{" "}
                  <td>
                    <span className="attendanceListTable">{items.Break}</span>
                  </td>
                  <td>
                    <span className="attendanceListTable">
                      {items.Overtime}
                    </span>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};
