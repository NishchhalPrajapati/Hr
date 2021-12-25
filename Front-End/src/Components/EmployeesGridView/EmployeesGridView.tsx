import { FunctionComponent } from "react";
import Card from "../Card/Card";
import "./EmployeesGridView.css";
import "../CommonStyle/HrMain.css";
import Button from "../AddMember/AddMember";
import Pencilcon from "../../assets/images/pencilcon.png";
import  { useNavigate }  from "react-router-dom";


type props = {
  empProfileDetails: any;
};

const EmployeesGridView: FunctionComponent<props> = ({ empProfileDetails }) => {
  let navigate :any = useNavigate();

  const EditChange = (id) =>{ 
    let path = `/employees/form/edit/${id}`;
    navigate(path);
  }
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {empProfileDetails.map((empProfileDetail: any) => (
          <div className="employeesContainer">
            
            <Card
              valueHeight="135px"
              valueWidth="135px"
              valueBoxShadow="0px 0px 2px #9a9a9a61"
              valueBoxRadius="5px"
            >
              
              <div  className="Edit_icon">
              <Button
                border="1px solid #add8e6"
                color="#F8F8FF"
                children=" "
                height="22px"
                onClick={() => alert("You clicked on the button")}
                radius="50px"
                width="22px"
                font-style="normal" 
                fontFamily={"Poppins"} 
                fontSize={"12px"} 
                fontWeight={`normal`}
                textAlign={`left`} 
                cursor= {`pointer`}
                />
                  <div onClick={()=> EditChange(empProfileDetail._id) }
                  style={{ cursor:"pointer" }}>
                    <img className="Pencilcon" src={Pencilcon} alt="search" />
                  </div>
                </div>
              <div key={empProfileDetail._id} style={{ paddingBottom: "25px" }}>
                <div className="EmployeesProfilePic"></div>
                <div className="empUserName">
                  <span>{empProfileDetail.EmployementFullName}</span>
                </div>
                <div className="empUserMail">
                  <span>{empProfileDetail.OfficailEmailId}</span>
                </div>
                <div className="Designation">
                  <span>{empProfileDetail.Designation}</span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmployeesGridView;

 
 
 
 
 
