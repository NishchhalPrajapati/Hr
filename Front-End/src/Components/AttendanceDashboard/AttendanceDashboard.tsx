import React from "react";
import { AttendanceList } from "../AttendanceList/AttendanceList";
import Card from "../Card/Card";
import DailyRecords from "../DailyRecords/DailyRecords";
import { Statistics } from "../Statistics/Statistics";
import { TimeSheet } from "../TimeSheet/TimeSheet";
import { TodayActivity } from "../TodayActivity/TodayActivity";
import "./AttendanceDashboard.css";
const AttendanceDashboard = () => {
  return (
    <>
      <div
        style={{ position: "relative" }}
      >
      <Card
        valueHeight="960px"
        valueWidth="100%"
        valueBoxShadow="-1px 1px 2px #9a9a9a61"
        valueBoxRadius="5px"
      >
        <div className="dashboardTitle">
          <span className="attendance">Attendance</span>
          <br />
          <span className="dashboardAttendance">Dashboard/Attendance</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <TimeSheet />
          </div>
          <div>
            <Statistics />
          </div>
          <div>
            <TodayActivity />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div className="attendanceList">
            <AttendanceList />
          </div>
          <div className="dailyRecordsBox">
            <DailyRecords />
          </div>
        </div>
      </Card>
      </div>
    </>
  );
};

export default AttendanceDashboard;
