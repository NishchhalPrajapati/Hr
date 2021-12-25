import React, { useState, useEffect } from "react";
import styles from "./Resources.module.css";
// import ImportImageModal from "../../Modals/ImportModal/ImportImageModal";
// import { connect, useDispatch } from "react-redux";
import AddResources from "../../Modals/AddResourcesModal/AddResourceModal";
import { getDateString } from "../../Values/utils";
// import { showSnackbarAction } from "../../Redux/actions";
// import Loading from "../../Components/Loading/Loading";
import { MdDelete } from "react-icons/md";

import { FiEdit3 } from "react-icons/fi";
import AddMultiResources from "../../Modals/AddResourcesModal/AddMultiResourcesModal";
// import EditResources from "../../Modals/AddResourcesModal/EditResourceModal";

const Resources = ({ history, user }: any) => {
let demo=[]

const [EmployementSubType, setEmployementSubType] = useState(false);
const [EmployementType, setEmployementType] = useState(false);
const [Designation, setDesignation] = useState(false);
const [load, setLoad] = useState(false);
const [Team, setTeam] = useState(false);
const [Department, setDepartment] = useState(false);
const [Branch, setBranch] = useState(false);
const [Religion, setReligion] = useState(false);
const [TotalYearOfExperience, setTotalYearOfExperience] = useState(false);
const [MaritalStatus, setMaritalStatus] = useState(false);
const [HolidayList, setHolidayList] = useState(false);
const [Breaks, setBreaks] = useState(false);
const [AssignShift, setAssignShift] = useState(false);
const [shift,setShift] = useState(false);
const [AttachmentsName, setAttachmentsName] = useState(false);
const [TypeOfExitSubType, setTypeOfExitSubType] = useState(false);
const [QualificationName, setQualificationName] = useState(false);
  return (
    <>
   
      <div className={styles.parent}>
        <div className={styles.child}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "55%",
              justifyContent: "space-between",
            }}
          >

            <div className={styles.budgetContainer}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Employment Sub Type</th>
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                        
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setEmployementSubType(true)}
                >
                 Employement Sub Type
                </button>
              </div>
            </div>
              {/* EmployementSubType */}
            <div className={styles.budgetContainer}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Designation</th>
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                        
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setDesignation(true)}
                >
                 Designation
                </button>
              </div>
            </div>
            {/* Designation */}
            <div className={styles.budgetContainer}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Department</th>
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                        
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setDepartment(true)}
                >
                 Department
                </button>
              </div>
            </div>
            {/* Department */}
            <div className={styles.budgetContainer}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Marital Status</th>
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                        
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setMaritalStatus(true)}
                >
                 Marital Status
                </button>
              </div>
            </div>
            {/* MaritalStatus */}
            <div className={styles.budgetContainer}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Total Year of Experience</th>
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                        
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setTotalYearOfExperience(true)}
                >
                Total Year of Experience
                </button>
              </div>
            </div>
            {/* TotalYearOfExperience */}
            <div className={styles.budgetContainer}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Type of Exit Sub Type</th>
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                        
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setTypeOfExitSubType(true)}
                >
                Type of Exit Sub Type
                </button>
              </div>
            </div>
            {/* TypeOfExitSubType */}
            <div className={styles.budgetContainer}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Shift</th>
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                        
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setShift(true)}
                >
               Shift
                </button>
              </div>
            </div>
            {/* shift */}
            <div className={styles.budgetContainer}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Breaks</th>
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                        
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setBreaks(true)}
                >
               Breaks
                </button>
              </div>
            </div>
            {/* Breaks */}
          </div>

          <div className={styles.location}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // width: "55%",
              justifyContent: "space-between",
            }}
          >

            <div className={styles.budgetContainer}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Employment Type</th>
                     
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                       
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setEmployementType(true)}
                >
                Employement Type
                </button>
              </div>
            </div>
            {/* Employement Type */}
            <div className={styles.budgetContainer}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Team</th>
                     
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                       
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setTeam(true)}
                >
               Team
                </button>
            </div>
            </div>
            {/* Team */}
            <div className={styles.budgetContainer}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Branch</th>
                     
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                       
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setBranch(true)}
                >
               Branch
                </button>
            </div>
            </div>
            {/* Branch */}
            <div className={styles.budgetContainer}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Religion</th>
                     
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                       
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setReligion(true)}
                >
               Religion
                </button>
            </div>
            </div>
            {/*Religion  */}
            <div className={styles.budgetContainer}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Qualification Name</th>
                     
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                       
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setQualificationName(true)}
                >
               Qualification Name
                </button>
            </div>
            </div>
            {/*Qualification Name  */}
            <div className={styles.budgetContainer}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Attachments Name</th>
                     
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                       
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setAttachmentsName(true)}
                >
               Attachments Name
                </button>
            </div>
            </div>
            {/* AttachmentsName */}
            <div className={styles.budgetContainer}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Assign Shift</th>
                     
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                       
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setAssignShift(true)}
                >
              Assign Shift
                </button>
            </div>
            </div>
            {/* AssignShift */}
            <div className={styles.budgetContainer}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.head}>
                    <tr>
                      <th className={styles.th}></th>
                      <th className={styles.th}>Holiday List</th>
                     
                      <th className={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className={styles.td}>
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                               />
                        </td>
                        <td className={styles.td}>{item.leadSource}</td>
                       
                        <td className={styles.td} style={{ width: "40px" }}>
                          <MdDelete
                            color={"#ff0000"}
                            size={20}
              
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addLocationContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setHolidayList(true)}
                >
              Holiday List
                </button>
            </div>
            </div>
            {/* HolidayList */}
          </div>
          
           </div>
           
        </div>
        
        {EmployementSubType && (
          <AddResources
            open={EmployementSubType}
            close={() => setEmployementSubType(false)}
            heading={"Employement Sub Type"}
            title={"Enter Employement Sub Type"}
            name={"EmploymentSubType"}
          />
        )}
         {EmployementType && (
          <AddResources
            open={EmployementType}
            close={() => setEmployementType(false)}
            heading={"Employement Type"}
            title={"Enter Employement Type"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {Designation && (
          <AddResources
            open={Designation}
            close={() => setDesignation(false)}
            heading={"Designation"}
            title={"Enter Designation"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
          {Team && (
          <AddResources
            open={Team}
            close={() => setTeam(false)}
            heading={"Team"}
            title={"Enter Team"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {Department && (
          <AddResources
            open={Department}
            close={() => setDepartment(false)}
            heading={"Department"}
            title={"Enter Department"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
          {Branch && (
          <AddResources
            open={Branch}
            close={() => setBranch(false)}
            heading={"Branch"}
            title={"Enter Branch"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {MaritalStatus && (
          <AddResources
            open={MaritalStatus}
            close={() => setMaritalStatus(false)}
            heading={"Marital Status"}
            title={"Enter Marital Status"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {Religion && (
          <AddResources
            open={Religion}
            close={() => setReligion(false)}
            heading={"Department"}
            title={"Enter Department"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         { TotalYearOfExperience&& (
          <AddResources
            open={TotalYearOfExperience}
            close={() => setTotalYearOfExperience(false)}
            heading={"Total Year of Experience"}
            title={"Enter Total Year of Experience"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {QualificationName && (
          <AddResources
            open={QualificationName}
            close={() => setQualificationName(false)}
            heading={"Qualification Name"}
            title={"Enter Qualification Name"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {TypeOfExitSubType && (
          <AddResources
            open={TypeOfExitSubType}
            close={() => setTypeOfExitSubType(false)}
            heading={"Department"}
            title={"Enter Department"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {AttachmentsName && (
          <AddResources
            open={AttachmentsName}
            close={() => setAttachmentsName(false)}
            heading={"Attachments Name"}
            title={"Enter Attachments Name"}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {shift && (
          <AddMultiResources
            open={shift}
            close={() => setShift(false)}
            heading={["Shift Name","Check In Time","Check Out Time","Week off Day"]}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {AssignShift && (
          <AddMultiResources
            open={AssignShift}
            close={() => setAssignShift(false)}
            heading={["Shift Name","Date"]}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {Breaks && (
          <AddMultiResources
            open={Breaks}
            close={() => setBreaks(false)}
            heading={["Break Name","Start Time","End Time"]}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
         {HolidayList && (
          <AddMultiResources
            open={HolidayList}
            close={() => setHolidayList(false)}
            heading={["Name","Date"]}
            onSave={(value: any) => {
              if (value === "") {
                
              } else {
                setLoad(true);
              }
            }}
          />
        )}
        {/* { && (
          <AddResources
            open={}
            close={() => setOpenLocation(false)}
            heading={"Location"}
            title={"Enter Location"}
            onSave={(value: any) => {
              if (value === "") {
                dispatcher(showSnackbarAction("Enter Location!!", "error"));
              } else {
                setLoad(true);
                if (locationNames.includes(value)) {
                  dispatcher(
                    showSnackbarAction("This Location Already Exists!!", "info")
                  );
                  setLoad(false);
                  setOpenLocation(false);
                } else {
                  createLocation(
                    user.organization_id,
                    value,
                    dispatcher,
                    history,
                    (data) => {
                      setOpenLocation(data);
                      setLoad(data);
                    }
                  );
                }
              }
            }}
          />
        )}
        {openTransferReason && (
          <AddResources
            open={openTransferReason}
            close={() => setOpenTransferReason(false)}
            heading={"Transfer Reason"}
            title={"Enter Reason"}
            onSave={(value: any) => {
              if (value === "") {
                dispatcher(
                  showSnackbarAction("Enter Transfer Reason!!", "error")
                );
              } else {
                setLoad(true);

                createTransferReason(
                  user.organization_id,
                  value,
                  dispatcher,
                  history,
                  (data) => {
                    setOpenTransferReason(data);
                    setLoad(data);
                  }
                );
              }
            }}
          />
        )}
        {openBudget && (
          <AddResources
            open={openBudget}
            close={() => setOpenBudget(false)}
            heading={"Budget"}
            title={"Enter Budget"}
            onSave={(value: any) => {
              if (value === "") {
                dispatcher(showSnackbarAction("Enter Budget!!", "error"));
              } else {
                setLoad(true);
                createBudget(
                  user.organization_id,
                  value,
                  dispatcher,
                  history,
                  (data) => {
                    setOpenBudget(data);
                    setLoad(data);
                  }
                );
              }
            }}
          />
        )}
        {openLeadSource && (
          <AddResources
            open={openLeadSource}
            close={() => setOpenLeadSource(false)}
            heading={"Lead Source"}
            title={"Enter Lead Source"}
            onSave={(value: any) => {
              if (value === "") {
                dispatcher(showSnackbarAction("Enter Lead Source!!", "error"));
              } else {
                setLoad(true);

                createLeadSource(
                  user.organization_id,
                  value,
                  dispatcher,
                  history,
                  (data) => {
                    setOpenLeadSource(data);
                    setLoad(data);
                  }
                );
              }
            }}
          />
        )}
        {openCommercial && (
          <AddResources
            open={openCommercial}
            close={() => setOpenCommercial(false)}
            heading={"Commercial Type"}
            title={"Enter Commercial Type"}
            onSave={(value: any) => {
              if (value === "") {
                dispatcher(
                  showSnackbarAction("Enter Commercial Type!!", "error")
                );
              } else {
                setLoad(true);

                createCommercialType(
                  user.organization_id,
                  value,
                  dispatcher,
                  history,
                  (data) => {
                    setOpenCommercial(data);
                    setLoad(data);
                  }
                );
              }
            }}
          />
        )}
        {openResidential && (
          <AddResources
            open={openResidential}
            close={() => setOpenResidential(false)}
            heading={"Residential Type"}
            title={"Enter Residential Type"}
            onSave={(value: any) => {
              if (value === "") {
                dispatcher(
                  showSnackbarAction("Enter Residential Type!!", "error")
                );
              } else {
                setLoad(true);

                createResidentialType(
                  user.organization_id,
                  value,
                  dispatcher,
                  history,
                  (data) => {
                    setOpenResidential(data);
                    setLoad(data);
                  }
                );
              }
            }}
          />
        )}

        {importImageModal && (
          <ImportImageModal
            open={importImageModal}
            close={() => setImportImageModal(false)}
            organization_id={user.organization_id}
            history={history}
          />
        )}
        {editModal && (
          <EditResources
            open={editModal}
            title={`${editValue}`}
            heading={`Edit ${editModalType}`}
            close={() => setEditModal(false)}
            onSave={(newValue) => {
              setLoad(true);
              if (editModalType === "Budget") {
                editBudget(
                  user.organization_id,
                  editValue,
                  newValue,
                  budgetsList,
                  dispatcher,
                  (val: boolean) => {
                    setLoad(val);
                    setEditModal(val);
                  }
                );
              } else if (editModalType === "Lead Source") {
                editLeadSource(
                  user.organization_id,
                  editValue,
                  newValue,
                  leadSourceList,
                  dispatcher,
                  (val: boolean) => {
                    setLoad(val);
                    setEditModal(val);
                  }
                );
              } else if (editModalType === "Residential") {
                editResType(
                  user.organization_id,
                  editValue,
                  newValue,
                  resTypes,
                  dispatcher,
                  (val: boolean) => {
                    setLoad(val);
                    setEditModal(val);
                  }
                );
              } else if (editModalType === "Commercial") {
                editCommType(
                  user.organization_id,
                  editValue,
                  newValue,
                  comTypes,
                  dispatcher,
                  (val: boolean) => {
                    setLoad(val);
                    setEditModal(val);
                  }
                );
              } else {
                editLocation(
                  user.organization_id,
                  editValue,
                  newValue,
                  locationsList,
                  dispatcher,
                  (val: boolean) => {
                    setLoad(val);
                    setEditModal(val);
                  }
                );
              }
            }}
          /> */}
        {/* )} */}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user.data,
    contacts: state.contacts,
  };
};

export default Resources;
