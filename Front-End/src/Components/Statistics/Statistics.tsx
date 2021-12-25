import React from "react";
import Card from "../Card/Card";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import "./Statistics.css";
import "../CommonStyle/HrMain.css";
export const Statistics = () => {
  return (
    <>
      <div>
        <div className="statistics">
          <Card
            valueHeight="320px"
            valueWidth="255px"
            valueBoxShadow="0px 0px 2px #9a9a9a61"
            valueBoxRadius="25px"
          >
            <div
              className="dashboardActivityHeadingContainer"
              style={{ marginLeft: "-10px" }}
            >
              <span className="DashboardTitles">Statistics</span>
            </div>
            <div className="statisticsBarBox">
              <div className="todayStatistic statisticsBar">
                <Card
                  valueHeight="35px"
                  valueWidth="235px"
                  valueBoxShadow="1px 0px 4px #9a9a9a61"
                  valueBoxRadius="5px"
                >
                  <div>
                    <span className="statisticTitleText">Today</span>
                    <div>
                      <LoadingAnimation
                        ProgressBarcolor="#84E0BE"
                        ProgressBarWidth={(174 / 8) * 3}
                        ProgressBarHeight={5}
                      />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="thisWeekStatistic statisticsBar">
                <Card
                  valueHeight="25px"
                  valueWidth="235px"
                  valueBoxShadow="1px 0px 4px #9a9a9a61"
                  valueBoxRadius="5px"
                >
                  <span className="statisticTitleText">This Week</span>
                  <div>
                    <LoadingAnimation
                      ProgressBarcolor="#FF6643"
                      ProgressBarWidth={(174 / 40) * 10}
                      ProgressBarHeight={5}
                    />
                  </div>
                </Card>
              </div>

              <div className="thisMonthStatistic statisticsBar">
                <Card
                  valueHeight="25px"
                  valueWidth="235px"
                  valueBoxShadow="1px 0px 4px #9a9a9a61"
                  valueBoxRadius="5px"
                >
                  <span className="statisticTitleText">This Month</span>
                  <div>
                    <LoadingAnimation
                      ProgressBarcolor="#FFBC6E"
                      ProgressBarWidth={(174 / 160) * 90}
                      ProgressBarHeight={5}
                    />
                  </div>
                </Card>
              </div>

              <div className="remainingStatistic statisticsBar">
                <Card
                  valueHeight="25px"
                  valueWidth="235px"
                  valueBoxShadow="1px 0px 4px #9a9a9a61"
                  valueBoxRadius="5px"
                >
                  <span className="statisticTitleText"> Remaining </span>
                  <div>
                    <LoadingAnimation
                      ProgressBarcolor="#1E85F1"
                      ProgressBarWidth={(174 / 160) * 90}
                      ProgressBarHeight={5}
                    />
                  </div>
                </Card>
              </div>

              <div className="overtimeStatistic statisticsBar">
                <Card
                  valueHeight="25px"
                  valueWidth="235px"
                  valueBoxShadow="1px 0px 4px #9a9a9a61"
                  valueBoxRadius="5px"
                >
                  <span className="statisticTitleText"> Overtime </span>
                  <div>
                    <LoadingAnimation
                      ProgressBarcolor="#F1EA1E"
                      ProgressBarWidth={(174 / 16) * 5}
                      ProgressBarHeight={5}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
