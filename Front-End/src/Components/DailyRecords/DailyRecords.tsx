import React from "react";
import Card from "../Card/Card";
import DailyWorkProgressBar from "../DailyWorkProgressBar/DailyWorkProgressBar";
import "./DailyRecords.css";
const DailyRecords = () => {
  return (
    <>
      <div className="dailyRecords">
        <Card
          valueHeight="310px"
          valueWidth="30%"
          valueBoxShadow="0px 0px 2px #9a9a9a61"
          valueBoxRadius="25px"
        >
          <div className="dailyRecordsText">
            <span>Daily Records</span>
          </div>
          <div className="dailyRecordsProgressBarBox">
            <div>
              <div>
                <DailyWorkProgressBar
                  ProgressBarcolor="#84E0BE"
                  ProgressBarWidth={5}
                  ProgressBarHeight={50}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <DailyWorkProgressBar
                  ProgressBarcolor="#1E85F1"
                  ProgressBarWidth={5}
                  ProgressBarHeight={150}
                />
              </div>
            </div>

            <div>
              <div>
                <DailyWorkProgressBar
                  ProgressBarcolor="#84E0BE"
                  ProgressBarWidth={5}
                  ProgressBarHeight={70}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <DailyWorkProgressBar
                  ProgressBarcolor="#1E85F1"
                  ProgressBarWidth={5}
                  ProgressBarHeight={140}
                />
              </div>
            </div>

            <div>
              <div>
                <DailyWorkProgressBar
                  ProgressBarcolor="#84E0BE"
                  ProgressBarWidth={5}
                  ProgressBarHeight={20}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <DailyWorkProgressBar
                  ProgressBarcolor="#1E85F1"
                  ProgressBarWidth={5}
                  ProgressBarHeight={170}
                />
              </div>
            </div>

            <div>
              <div>
                <DailyWorkProgressBar
                  ProgressBarcolor="#84E0BE"
                  ProgressBarWidth={5}
                  ProgressBarHeight={60}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <DailyWorkProgressBar
                  ProgressBarcolor="#1E85F1"
                  ProgressBarWidth={5}
                  ProgressBarHeight={130}
                />
              </div>
            </div>

            <div>
              <div>
                <DailyWorkProgressBar
                  ProgressBarcolor="#84E0BE"
                  ProgressBarWidth={5}
                  ProgressBarHeight={50}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <DailyWorkProgressBar
                  ProgressBarcolor="#1E85F1"
                  ProgressBarWidth={5}
                  ProgressBarHeight={150}
                />
              </div>
            </div>

            <div>
              <div>
                <DailyWorkProgressBar
                  ProgressBarcolor="#84E0BE"
                  ProgressBarWidth={5}
                  ProgressBarHeight={50}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <DailyWorkProgressBar
                  ProgressBarcolor="#1E85F1"
                  ProgressBarWidth={5}
                  ProgressBarHeight={150}
                />
              </div>
            </div>

            <div>
              <div>
                <DailyWorkProgressBar
                  ProgressBarcolor="#84E0BE"
                  ProgressBarWidth={5}
                  ProgressBarHeight={50}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <DailyWorkProgressBar
                  ProgressBarcolor="#1E85F1"
                  ProgressBarWidth={5}
                  ProgressBarHeight={150}
                />
              </div>
            </div>

            <div>
              <div>
                <DailyWorkProgressBar
                  ProgressBarcolor="#84E0BE"
                  ProgressBarWidth={5}
                  ProgressBarHeight={50}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <DailyWorkProgressBar
                  ProgressBarcolor="#1E85F1"
                  ProgressBarWidth={5}
                  ProgressBarHeight={150}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default DailyRecords;
