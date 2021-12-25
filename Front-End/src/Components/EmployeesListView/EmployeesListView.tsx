import { FunctionComponent, useEffect } from "react";
import Card from "../Card/Card";
import "./EmployeesListView.css";
import { useState } from "react";
import Button from "../AddMember/AddMember";
import Pencilcon from "../../assets/images/pencilcon.png";
import Checkbox from "../CheckBox/Checkbox";
import  { useNavigate }  from "react-router-dom";
import {
  getFilterObject,
  searchTaskItem,
  filterTaskStatus,
} from "../../Values/utils";
import Topbar from "../TopBar/Topbar";


type props = {
  empProfileDetailsListView: any;

};

const EmployeesListView: FunctionComponent<props> = ({
  empProfileDetailsListView,

}) => {

  const [searchQuery, setsearchQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [tasksList, setTasksList] = useState<any[] | undefined>(undefined);
  const [temporaryData, setTemporaryData] = useState<any[]>([]);
  let navigate :any = useNavigate();


  const EditChange = () =>{ 
    let path = `/employees/form/edit`;
    navigate(path);
  }



  useEffect(() => {
    if (searchQuery === "") {
      if (tasksList) {
        const data = filterTaskStatus(tasksList, status);
        setTemporaryData(data);
        setFilterData(data);
      }
    } else {
      const data = filterTaskStatus(temporaryData, status);
      setFilterData(data);
    }

  }, [status, tasksList]);


  return (
    <>
      <div
        className="employeesListViewTable"
        style={{ position: "relative", left: "1.7%", top: "5px" }}
      >

        <Card
          valueHeight="510px"
          valueWidth="94%"
          valueBoxShadow="0px 0px 4px #9a9a9a61"
          valueBoxRadius="5px"
        >


          {/* <div className={commonStyle.topBar}> */}
            {/* <Topbar */}
              {/* // history={history} */}
              {/* // title={"Add Project"} */}
              {/* // path={"/addProjects"} */}
              {/* // filterText="Property Type" */}
              {/* // onChange={(val) => setsearchQuery(val)} */}
              {/* // projectFilter={true} */}
              {/* // setStatus={(status) => setStatus(status)} */}
              {/* // status={status} */}
              {/* // setColumnModal={(data) => setColumnModal(data)} */}
              {/* // show={false} */}
              {/* // showStatusBox={true} */}
              {/* // onExport={() => { }} */}
              {/* // onClick={() => { */}
                {/* // setShowImportModal(true); */}
              {/* // }} */}
            {/* // /> */}
          {/* </div> */}

          <div style={{ padding: "10px" }} >
            <table className="employeesListViewTable">
              <tr className="empheading">
                <td></td>
                <td></td>
                <td>Full name</td>
                <td>Emp. Code</td>
                <td colSpan={2}>Emp. Mail</td>
                <td>Owner</td>
                <td>Reporting to</td>
                <td>Team</td>
                <td colSpan={2}>Branch</td>
              </tr>


              {empProfileDetailsListView.map((empDetails: any, id: number) => (
                <tr className="employeesList">
                  <td>
                    <div>
                      <Checkbox

                        key={id}

                      />
                    </div>
                  </td>

                  <td>
                    <div className="employeesListViewProfile"></div>
                  </td>

                  <td>{empDetails.FullName}</td>
                  <td>{empDetails.EmpCode}</td>
                  <td colSpan={2}>{empDetails.EmpEmail}</td>
                  <td>{empDetails.Owner}</td>
                  <td>{empDetails.ReportingTo}</td>
                  <td>{empDetails.Team}</td>
                  <td>{empDetails.Branch}</td>

                  <td>
                    <div>
                      <Button
                        border="1px solid #add8e6"
                        color="#F8F8FF"
                        children=" "
                        height="22px"
                        onClick={() => alert("You clicked on the button")}
                        radius="50px"
                        width="22px"
                        font-style="normal" fontFamily={"Poppins"} fontSize={"12px"} fontWeight={`normal`}
                        textAlign={`left`}
                        cursor={`pointer`}
                      />
                      <div onClick={ EditChange }
                        style={{ cursor: "pointer" }}>
                        <img className="PencilIcon" src={Pencilcon} />
                      </div>
                    </div>
                  </td>

                </tr>
              ))}
            </table>
          </div>
        </Card>
      </div >
    </>
  );
};

export default EmployeesListView;

function setFilterData(originalData: any) {
  throw new Error("Function not implemented.");
}
function originalData(originalData: any) {
  throw new Error("Function not implemented.");
}

function searchCallLogs(originalData: (originalData: any) => void, searchedItem: string) {
  throw new Error("Function not implemented.");
}

