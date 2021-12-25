import React from "react";
import "./UserProfileCard.css";
import Card from "../Card/Card";
const UserProfileCard = () => {
  return (
    <>
      <div className="profileCardBox">
        <Card
          valueHeight="150px"
          valueWidth="220px"
          valueBoxShadow="0 0 4px #71cacc96"
          valueBoxRadius="5px"
        >
          <div className="profilePic"></div>
          <div className="welcomeUser">
            <span>Welcome User</span>
          </div>
          <div className="date">
            <span>Sun, 29 Nov , 2021</span>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserProfileCard;
