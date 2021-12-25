import React, { FunctionComponent, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Card from "../Card/Card";
import OptionSearchBox from "../OptionSearchBox/OptionSearchBox";
import ImportContactsModal from "../../Modals/ImportModal/ImportContactsModal";
import PlusIcon from "../../assets/images/plus_icon.png";
import DropDownIcon from "../../assets/images/dropdown_arrow.png";
import FilterIcon from "../../assets/images/filtre_icon.png";
import CrossIcon from "../../assets/images/crossicon.png";
import OptionIcon from "../../assets/images/optionIcon.png";
import  { useNavigate }  from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";
import Button from "../AddMember/AddMember"
import doticon from "../../assets/images/three dot icon.png";
import "./EmployeesMain.css";
import SearchIcon from "../../assets/images/sideBarIcon/Search.svg";
import FilterButton from "../../Components/Icons/IconsBtn"
import EmployeesGridView from "../EmployeesGridView/EmployeesGridView";
import { Routes, useLocation } from "react-router";
import EmployeesListView from "../EmployeesListView/EmployeesListView";
import TopBar from "../TopBar/Topbar";
import commonStyle from "../common.module.css";
import Header from "../TableHeader/TableHeader"
import TableHeader from "../TableHeader/TableHeader"
import { IoChevronDown } from "react-icons/io5";
import { AiFillFilter } from "react-icons/ai"
import styles from "../TableHeader/TableHeader.module.css";
import { Route } from "react-router-dom";
import DrilldownPanel from "../../Screens/UserPanel/DrillDownPanel";
import { getDateString, searchContacts } from "../../Values/utils";
import { CONTACT_COLUMNS, TASK_COLUMNS } from "../../Values/tables";
import Loading from "../../Components/Loading/Loading";
import CustomTable from "../../Components/CustomTable/CustomTable";
import {
  getFilterObject,
  searchTaskItem,
  filterTaskStatus,
} from "../../Values/utils";
import { connect, useDispatch } from "react-redux";
import OwnerModal from "../../Modals/ChangeOwnerModels/ChangeOwnerModal";
import { showSnackbarAction } from "../Redux/actions";
import ImportCallLogsModal from "../../Modals/ImportModal/ImportCallLogsModal";
import ImportNotesModal from "../../Modals/ImportModal/ImportNotesModal";
import ImportTasksModal from "../../Modals/ImportModal/ImportTaskModal";
import BulkEditModal from "../../Modals/BulkEditModal/BulkEditModal";
import { getDataFromRoute } from "../../Services/contacts";
import EmployeeForm from "../../Screens/EmployeeForm/EmployeeForm";
import axios from "axios";


type Props = {
  history: any;
  user: any;
  contacts: {
    data: any;
  };
  organizationUsers: any;
  role: any;
  teamLeadUsers: any;
};
let usersList: any[] = [];

const EmployeesMain = ({  history,user, contacts, organizationUsers, role, teamLeadUsers, }: Props) => {
  const location: any = useLocation();
  const [columnModal, setColumnModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedRowsData, setSelectedRowsData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[] | undefined>(undefined);
  const [callLogsImportModal, setCallLogsImportModal] = useState(false);
  const [notesImportModal, setNotesImportModal] = useState(false);
  const [tasksImportModal, setTasksImportModal] = useState(false);
  const [tasksList, setTasksList] = useState<any[] | undefined>(undefined);
  const [temporaryData, setTemporaryData] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [owner, setOwner] = useState(false);
  const [searchedItem, setsearchedItem] = useState("");
  const [allContacts, setAllContacts] = useState<any[] | undefined>(undefined);
  const [transferStatusTrueRows, setTransferStatusTrueRows] = useState<any[]>(
    []
  );
  const [allEmp, setAllEmp] = useState<any[]>([]);
  let dispatcher = useDispatch();
  let navigate :any = useNavigate();

  const routeChange = () =>{ 
    let path = `/employees/form`; 
    navigate(path);
  }

  const createUsersList = (email: string, users:
    any[], uid: boolean) => {
    users.map((item: any) => {
      if (usersList.includes(item)) {
        return;
      } else {
        if (item.reporting_to === email && item.
          status === "ACTIVE") {
          if (!usersList.includes(item)) {
            usersList.push(item);
          }
          createUsersList(item.user_email, users,
            uid);
        }
      }
    });
  };

  useEffect(() => {
    if (user === undefined) {
      setFilterData([]);
      dispatcher(showSnackbarAction("User Does Not Exists!!", "error"));
    }
  }, []);

  useEffect(() => {
    let trueStatusList: any = [];
    selectedRowsData.forEach((row) => {
      Object.keys(row).forEach((item) => {
        if (item === "transfer_status") {
          trueStatusList.push(row[item]);
        }
      });
    });
    setTransferStatusTrueRows(trueStatusList);
  }, [selectedRowsData]);

  useEffect(() => {
  let contact: any[] = [];
  Object.keys(contacts.data).forEach((key) => {
  contact = [...contact, ...contacts.data[key]];
  });
  setAllContacts(contact);
  }, [contacts.data]);


  useEffect(() => {
    let mapReportingTo: { [key: string]: string } = {};
    if (organizationUsers) {
      organizationUsers.forEach((item: any) => {
        if (mapReportingTo[item.uid] === undefined) {
          mapReportingTo[item.uid] = item.reporting_to;
        }
      });
    }
    // eslint-disable-next-line
  }, [allContacts]);


  const setUsersList = () => {
    if (role === "Lead Manager") {
      organizationUsers.map((item: any) => {
        if (usersList.includes(item)) {
          return;
        } else {
          if (item.status === "ACTIVE") {
            usersList.push(item);
          }
        }
      });
    } else {
      createUsersList(user.user_email, organizationUsers, false);
    }
  };

  useEffect(() => {
    if (selectedRows.length > 0) {
      setOwner(true);
    } else if (selectedRows.length === 0) {
      setOwner(false);
    }
  }, [selectedRows]);

  useEffect(() => {
    if (role !== "Team Lead") {
      if (allContacts === undefined) {
      } else {
        if (location.state?.detail) {
          const routeData = getDataFromRoute(location.state.detail);
          setFilterData(routeData);
        } else {
          setFilterData(allContacts);
        }
      }
    }
  }, [allContacts, role, location]);


  useEffect(() => {
    if (role === "Team Lead") {
      if (teamLeadUsers && allContacts) {
        if (location.state?.detail) {
          const routeData = getDataFromRoute(location.state.detail);
          setFilterData(
            routeData.filter((item: any) => teamLeadUsers.includes(item.uid))
          );
        } else {
          setFilterData(
            allContacts.filter((item) => teamLeadUsers.includes(item.uid))
          );
        }
      }
    }
    // eslint-disable-next-line
  }, [role, allContacts, teamLeadUsers, location]);


  useEffect(() => {
    if (searchedItem.length === 0) {
      if (allContacts) {
        if (role !== "Team Lead") {
          if (location.state?.detail) {
            const routeData = getDataFromRoute(location.state.detail);
            setFilterData(routeData);
          } else {
            setFilterData(allContacts);
          }
        } else {
          if (location.state?.detail) {
            const routeData = getDataFromRoute(location.state.detail);
            setFilterData(
              routeData.filter((item: any) => teamLeadUsers.includes(item.uid))
            );
          } else {
            setFilterData(
              allContacts.filter((item) => teamLeadUsers.includes(item.uid))
            );
          }
        }
      }
    } else {
      if (allContacts) {
        const data = searchContacts(allContacts, searchedItem);
        setFilterData(data);
      }
    }
    // eslint-disable-next-line
  }, [searchedItem, location, teamLeadUsers]);



  const clearSelectedRowsData = () => {
    setSelectedRowsData([]);
    setSelectedRows([]);
  };
  
//getEmployees
const allEmps=async()=>{
  let id="61c08377ca5d0b615f9a9a15"
  const config = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.get<any>(`/api/employee/getBulkEmployees/${id}`, config);
  setAllEmp(data)
  // console.log(allEmp)
  // console.log(data)
}
useEffect(() => {
  allEmps()
}, [history])
//getEmployees
  const exportFile = () => {
    let data: any[] = [];
    if (selectedRowsData.length === 0) {
    } else {
      selectedRowsData.forEach((item) => {
        data.push({
          Id: item.contactId,
          "Customer Name": item.customer_name,
          "Mobile No": item.contact_no,
          "Email ID": item.email,
          Stage: item.stage,
          Owner: item.contact_owner_email,
          "CallBack Reason": item.call_back_reason,
          "Property Type": item.property_type,
          "Property Stage": item.property_stage,
          Location: item.location,
          Project: item.project,
          "Not Interested Reason": item.not_int_reason,
          "Lost Reason": item.lost_reason,
          "Other Not Interested Reason": item.other_not_int_reason,
          "Other Lost Reason": item.other_lost_reason,
          "Previous Owner": item.previous_owner,
          "Next follow Up Type": item.next_follow_up_type,
          "Next Follow Up Date & Time": getDateString(
            item.next_follow_up_date_time
          ),
          AddSet: item.addset,
          Campaign: item.campaign,
          Budget: item.budget,
          "Lead Source": item.lead_source,
          "Transfer Status": item.transfer_status,
          "Associate Status": item.associate_status,
          "Source Status": item.source_status,
          "Created By": item.created_by,
          "Created At": getDateString(item.created_at),
          "Lead Assign At": getDateString(item.lead_assign_time),
        });
      });
    }
    return data;
  };



  let Designation = [
    "software enginner",
    "designer",
    "sales Man",
    "font-end Devloper",
    "back-end devloper",
    "full stack devloper",
  ];
  let empProfileDetails = [
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
    {
      username: "username",
      empMail: "xyz@gmail.com",
      Designation: "Designation",
    },
  ];

  let empProfileDetailsListView = [
    {
      FullName: "Simran Chawala",
      EmpCode: "87585",
      EmpEmail: "xyz@gmail.com",
      Owner: "Kajal Chawala",
      ReportingTo: "Himanshu",
      Team: " Designing",
      Branch: "Value First",
    },
    {
      FullName: "Simran Chawala",
      EmpCode: "87585",
      EmpEmail: "xyz@gmail.com",
      Owner: "Kajal Chawala",
      ReportingTo: "Himanshu",
      Team: " Designing",
      Branch: "Value First",
    },
    {
      FullName: "Simran Chawala",
      EmpCode: "87585",
      EmpEmail: "xyz@gmail.com",
      Owner: "Kajal Chawala",
      ReportingTo: "Himanshu",
      Team: " Designing",
      Branch: "Value First",
    },
    {
      FullName: "Simran Chawala",
      EmpCode: "87585",
      EmpEmail: "xyz@gmail.com",
      Owner: "Kajal Chawala",
      ReportingTo: "Himanshu",
      Team: " Designing",
      Branch: "Value First",
    },
    {
      FullName: "Simran Chawala",
      EmpCode: "87585",
      EmpEmail: "xyz@gmail.com",
      Owner: "Kajal Chawala",
      ReportingTo: "Himanshu",
      Team: " Designing",
      Branch: "Value First",
    },
    {
      FullName: "Simran Chawala",
      EmpCode: "87585",
      EmpEmail: "xyz@gmail.com",
      Owner: "Kajal Chawala",
      ReportingTo: "Himanshu",
      Team: " Designing",
      Branch: "Value First",
    },
    {
      FullName: "Simran Chawala",
      EmpCode: "87585",
      EmpEmail: "xyz@gmail.com",
      Owner: "Kajal Chawala",
      ReportingTo: "Himanshu",
      Team: " Designing",
      Branch: "Value First",
    },
    {
      FullName: "Simran Chawala",
      EmpCode: "87585",
      EmpEmail: "xyz@gmail.com",
      Owner: "Kajal Chawala",
      ReportingTo: "Himanshu",
      Team: " Designing",
      Branch: "Value First",
    },
  ];
 

  return (
    <>
      <div className="employeesBoxContainer">
        <Card
          valueHeight="960px"
          valueWidth="100%"
          valueBoxShadow="-1px 1px 2px #9a9a9a61"
          valueBoxRadius="0px"
        >
         
           

          <div className={commonStyle.topBar}>
            <TopBar
              history={history}
              title={"Add Contacts"}
              path={"/addContacts"}
              onClick={() => {
                setShowImportModal(true);
              }}
              owner={owner}
              changeOwner={() => {
                setUsersList();
                setShow(true);
              }}
              onChange={(val) => setsearchedItem(val)}
              filterText={"Status"}
              setColumnModal={(data) => setColumnModal(data)}
              show={true}
              showStatusBox={true}
              onExport={exportFile}
              setBulkEdit={() => {
                setShowBulkEdit(true);
              }}
              onCallLogsImport={() => {
                setCallLogsImportModal(true);
              }}
              onNotesImport={() => {
                setNotesImportModal(true);
              }}
              onTasksImport={() => {
                setTasksImportModal(true);
              }}
              transferLeads={transferStatusTrueRows}
            />
          </div>
          <div className={commonStyle.parent}>
            {filterData === undefined && <Loading />}
            <CustomTable
              tableColumns={CONTACT_COLUMNS}
              tableRows={filterData}
              selectedRows={selectedRows}
              setSelectedRows={(data) => setSelectedRows(data)}
              tableType="User"
              showColumnModal={columnModal}
              hideColumnModal={() => setColumnModal(false)}
              selectedRowsData={selectedRowsData}
              setSelectedRowsData={(data) => setSelectedRowsData(data)}
              setSearchedItem={(val) => setsearchedItem(val)}
            />
            {show && (
              <OwnerModal
                open={show}
                close={() => {
                  setShow(false);
                }}
                usersList={usersList}
                rowsSelected={selectedRowsData}
                clearSelectedRowsData={clearSelectedRowsData}
                organization_id={user.organization_id}
              />
            )}
            {showImportModal && (
              <ImportContactsModal
                open={showImportModal}
                close={() => setShowImportModal(false)}
                organization_id={user.organization_id}
                history={history}
                usersList={organizationUsers}
                user={user}
              />
            )}
            {callLogsImportModal && (
              <ImportCallLogsModal
                open={callLogsImportModal}
                close={() => setCallLogsImportModal(false)}
                organization_id={user.organization_id}
                usersList={organizationUsers}
              />
            )}
            {notesImportModal && (
              <ImportNotesModal
                open={notesImportModal}
                close={() => setNotesImportModal(false)}
              />
            )}
            {tasksImportModal && (
              <ImportTasksModal
                open={tasksImportModal}
                close={() => setTasksImportModal(false)}
                organization_id={user.organization_id}
                usersList={organizationUsers}
                user={user}
              />
            )}
            {showBulkEdit && (
              <BulkEditModal
                open={showBulkEdit}
                organization_id={user.organization_id}
                close={() => {
                  setShowBulkEdit(false);
                  clearSelectedRowsData();
                }}
                rowsData={selectedRowsData}
              />
            )}
          </div>
         




          {/* <div className={commonStyle.topBar}> */}
          {/* <TopBar */}
          {/* // history={history} */}
          {/* // title={" "} */}
          {/* // path={" "} */}
          {/* // onChange={(val) => setsearchQuery(val)} */}
          {/* // setStatus={(status) => setStatus(status)} */}
          {/* // filterText={"Status"} */}
          {/* // taskFilter={true} */}
          {/* // onClick={() => { */}
          {/* // setShowImportModal(true); */}
          {/* // }} */}
          {/* // status={status} */}
          {/* // setColumnModal={(data) => setColumnModal(data)} */}
          {/* // show={true} */}
          {/* // showStatusBox={true} */}
          {/* // onExport={exportFile} */}
          {/* // /> */}
          {/* </div> */}
           
          {/* <div className={commonStyle.parent}> */}
            {/* {tasksList === undefined && <Loading logo />} */}
            {/* <CustomTable */}
            {/* // tableColumns={TASK_COLUMNS} */}
            {/* // tableRows={filterData} */}
            {/* // selectedRows={selectedRows} */}
            {/* // setSelectedRows={(data) => setSelectedRows(data)} */}
            {/* // tableType="Task" */}
            {/* // selectedRowsData={selectedRowsData} */}
            {/* // showColumnModal={columnModal} */}
            {/* // setSelectedRowsData={(data) => setSelectedRowsData(data)} */}
            {/* // hideColumnModal={() => setColumnModal(false)} */}
            {/* // setSearchedItem={(val) => setsearchQuery(val)} */}
            {/* // /> */}

            {/* {show && ( */}
            {/* // <OwnerModal */}
            {/* // open={show} */}
            {/* // close={() => { */}
            {/* // setShow(false); */}
            {/* // }} */}
            {/* // usersList={usersList} */}
            {/* // rowsSelected={selectedRowsData} */}
            {/* // clearSelectedRowsData={clearSelectedRowsData} */}
            {/* // organization_id={user.organization_id} */}
            {/* // /> */}
            {/* // )} */}

            {/* {showImportModal && ( */}
            {/* // <ImportContactsModal */}
            {/* // open={showImportModal} */}
            {/* // close={() => setShowImportModal(false)} */}
            {/* // organization_id={user.organization_id} */}
            {/* // history={history} */}
            {/* // usersList={organizationUsers} */}
            {/* // user={user} */}
            {/* // /> */}
            {/* // )} */}



            <div className="employeesSearchBoxContainer">
              <div style={{ marginLeft: "20px", marginTop: "21px" }}>

                <Button
                  border="1px solid #add8e6"
                  color="#fcfcfc"
                  children="Add member"
                  height="35px"
                  // onClick={() => alert("You clicked on the button")}
                  onClick={ routeChange }
                  radius="3px"
                  width="120px"
                  font-style="normal"
                  fontFamily={"Poppins"}
                  fontSize={"12px"}
                  fontWeight={`normal`}
                  textAlign={`left`}
                  cursor= {`pointer`}
                />
                    <img className="plusIcon" src={PlusIcon} alt="search" />
              </div>

              <div style={{ marginLeft: "5px", marginTop: "15px" }}>
                <OptionSearchBox
                  searchOptionBorderRadiusValue="3px"
                  searchOptionWidthValue="130px"
                  searchOptionHeightValue="31px"
                  searchOptionPlaceholderValue="Employee status"
                  searchOptionListValue="Designation"
                  searchOptionBorderOrNot="1px solid #add8e6"
                  searchOptionBoxPaddingLeft="2px"
                  searchOptionLeft=" "
                  searchOptions={Designation}
                  fontFamily={"Poppins"}
                  fontSize={"11px"}
                  color="#fcfcfc"
                />
                {/* <AiFillFilter /> */}
                <img className="DropIcon" src={DropDownIcon} alt="search" />
              </div>

              <div style={{ marginLeft: "525px", marginTop: "15px" }}>
                <FilterButton
                  border="1px solid #add8e6"
                  color="#ffff"
                  width="40px"
                  height="40px"
                  // Image ="../../assets/images/filtre_icon.png"
                  onClick={() => alert("You clicked on the button")}
                  radius="3px"
                />
                  <div onClick={() => alert("You clicked on the button")}
                  style={{ cursor:"pointer" }}>
                    <img className="FilterIcon" src={FilterIcon} alt="search" />
                  </div>
              </div>

              <div style={{ marginLeft: "10px", marginTop: "15px" }}>
                <FilterButton
                  border="1px solid #add8e6"
                  color="#ffff"
                  width="40px"
                  height="40px"
                  // Image ="../../assets/images/three dot icon.png"
                  onClick={() => alert("You clicked on the button")}
                  radius="3px" />
                  <div onClick={() => alert("You clicked on the button")}
                  style={{ cursor:"pointer" }}>
                      <img className="doticon" src={doticon} alt="search" />
                  </div>
              </div>
              <div onClick={() => alert("You clicked on the button")}
              style={{ cursor:"pointer" }}>
                <img className="CrossIcon" src={CrossIcon} alt="search" />
              </div>

              <div onClick={() => alert("You clicked on the button")}
              style={{ cursor:"pointer" }}>
                <img className="OptionIcon" src={OptionIcon} alt="search" />
              </div>


            </div>
            <div className="employeesSearchBoxContainer">
              {location.pathname === "/employees" ? (
                <EmployeesGridView empProfileDetails={allEmp} />
              ) : location.pathname === "/employees/list" ? (
                <EmployeesListView
                  empProfileDetailsListView={empProfileDetailsListView}
                />
              ) : (
                <h1>Wrong route</h1>
              )}
            </div>
          {/* </div > */}
        </Card>
      </div>
    </>
  );
};

// export default EmployeesMain;

const mapStateToProps = (state: any) => {
  return {
    user: state.user.data,
    role: state.user.role,
    contacts: state.contacts,
    organizationUsers: state.organizationUsers.data,
    teamLeadUsers: state.teamLeadUsers.data,
  };
};

export default connect(mapStateToProps)(EmployeesMain);

