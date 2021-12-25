import React, { useEffect, useState } from "react";
import axios from "axios";
import DropDownIcon from "../../assets/images/drop_down_icon.png";
// import "./App.css";
import "../EmployeesForm/Form.css";
import Card from "../Card/Card";
import Checkbox from "react-custom-checkbox";
import * as Icon from "react-icons/fi";
import OptionSearchBox from "../OptionSearchBox/OptionSearchBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Navigate, useLocation } from "react-router-dom";

type props={
  register:any,
  errors:any,
  EditEmpDetail:any,
  setValue?:any
  id?:any
}
const Form: React.FC<props> = ({register,errors,EditEmpDetail,setValue,id}) => {
  const location=useLocation();
  let DesignationOption = [
    "software enginner",
    "designer",
    "sales Man",
    "font-end Devloper",
    "back-end devloper",
    "full stack devloper",
  ];
  let EmployementSubTypeOption = ["Salaried", "Freelancer", "Channel Partner"];
  let GenderOption = ["Male", "Female", "Other"];
  let EmployementTypeOption = ["On Roll", "Off Roll"];
  let BranchOption = [""];
  let DepartmentOption = [""];
  let WeekllyOffDayOption = [""];
  
  let FormData = [
    {
      title: "key Information",
      Fvalue: [
        {
          firstFieldLable: "Employement Sub Type",
          secondFieldLable: "Gender",
          firstType: "option",
          secondType: "option",
          firstOptions: EmployementSubTypeOption,
          secondOptions: GenderOption,
          secondInputName: "Gender",
          firstInputName: "EmployementSubType",
        },
        {
          firstFieldLable: "Employement Code",
          secondFieldLable: "Team",
          firstType: "text",
          secondType: "option",
          secondInputName: "Team",
          firstInputName: "EmployeeCode",
        },
        {
          firstFieldLable: "Employement Type",
          secondFieldLable: "Department",
          firstType: "option",
          secondType: "option",
          firstOptions: EmployementTypeOption,
          secondOptions: DepartmentOption,
          secondInputName: "Department",
          firstInputName: "EmployementType",
        },
        {
          firstFieldLable: "Employement Fullname",
          secondFieldLable: "Branch",
          firstType: "text",
          secondType: "option",
          secondOptions: BranchOption,
          secondInputName: "Branch",
          firstInputName: "EmployementFullName",
        },
        {
          firstFieldLable: "Designation",
          secondFieldLable: "Weekly off Day",
          firstType: "option",
          secondType: "option",
          firstOptions: DesignationOption,
          secondOptions: WeekllyOffDayOption,
          secondInputName: "WeeklyOfDay",
          firstInputName: "Designation",
        },
        {
          firstFieldLable: "Date of Joining",
          secondFieldLable: "Shift",
          firstType: "option",
          secondType: "option",
          secondInputName: "Shift",
          firstInputName: "DateOfJoining",
        },
      ],
    },
    {
      title: "Associate Identity Details:",
      Fvalue: [
        {
          firstFieldLable: "D.O.B- On Papers",
          secondFieldLable: "Passport",
          firstType: "text",
          secondType: "text",
          secondInputName: "Passport",
          firstInputName: "DateOfBirthOnPapers",
        },
        {
          firstFieldLable: "D.O.B- Celebration",
          secondFieldLable: "Marital Status",
          firstType: "text",
          secondType: "option",
          secondInputName: "Marital_Status",
          firstInputName: "DateOfBirth",
        },
        {
          firstFieldLable: "Personal Phone No.",
          secondFieldLable: "Blood Group",
          firstType: "text",
          secondType: "option",
          secondInputName: "Blood_Group",
          firstInputName: "PersonalPhoneNo",
        },
        {
          firstFieldLable: "Personal Email Id",
          secondFieldLable: "Religion",
          firstType: "text",
          secondType: "option",
          secondInputName: "Religion",
          firstInputName: "PersonalEmailId",
        },
        {
          firstFieldLable: "PAN Number",
          secondFieldLable: "Aadhar Number",
          firstType: "text",
          secondType: "Number",
          secondInputName: "AadharNumber",
          firstInputName: "PANNumber",
        },
      ],
    },
    {
      title: "HR Record Information",
      Fvalue: [
        {
          firstFieldLable: "Official Email Id",
          secondFieldLable: "Appointment Letter Issued",
          firstType: "text",
          secondType: "text",
          secondInputName: "AppointmentLetterIssued",
          firstInputName: "OfficailEmailId",
        },
        {
          firstFieldLable: "Offer Letter Issued ",
          secondFieldLable: "Appointment Letter Issue Date",
          firstType: "option",
          secondType: "option",
          secondInputName: "AppointmentLetterIssuedDate",
          firstInputName: "OfficailLetterIssued ",
        },
        {
          firstFieldLable: "Offer Letter Issue Date",
          secondFieldLable: "Confimation Letter",
          firstType: "text",
          secondType: "option",
          secondInputName: "ConfirmationLatter",
          firstInputName: "OfferLetterIssueDate",
        },
        {
          firstFieldLable: "Employee ID Card Issued",
          secondFieldLable: "Confirmation Letter Issue Date",
          firstType: "option",
          secondType: "text",
          secondInputName: "ConfirmationLatterDate",
          firstInputName: "EmployeeIdCardIssued",
        },
        {
          firstFieldLable: "Employee ID Card Issue Date",
          secondFieldLable: "No Feild",
          firstType: "text",
          secondType: "",
          secondInputName: "",
          firstInputName: "EmployeeIdCardIssuedDate",
        },
      ],
    },
    {
      title: "Experience Details",
      Fvalue: [
        {
          firstFieldLable: "Total Years of Experience",
          secondFieldLable: "Designation",
          firstType: "option",
          secondType: "text",
          secondInputName: "Designation",
          firstInputName: "TotalYearsOfExperience",
        },
        {
          firstFieldLable: "Total Experience",
          secondFieldLable: "Previous Organization Start Date",
          firstType: "text",
          secondType: "text",
          secondInputName: "PreviousOrganizationStartDate",
          firstInputName: "TotalExperience",
        },
        {
          firstFieldLable: "Relevant Experience",
          secondFieldLable: "Previous Organization End Date",
          firstType: "text",
          secondType: "text",
          secondInputName: "PreviousOrganizationEndDate",
          firstInputName: "RelavantExperience",
        },
        {
          firstFieldLable: "Previous Organization Name",
          secondFieldLable: "Previous Organization",
          firstType: "text",
          secondType: "text",
          secondInputName: "Previous_Organization",
          firstInputName: "PreviousOrganizationName",
        },
      ],
    },
    {
      title: "Qualification Details",
      Fvalue: [
        {
          firstFieldLable: "Highest Qualification",
          secondFieldLable: "Institute Name",
          firstType: "text",
          secondType: "text",
          secondInputName: "InstitutionName",
          firstInputName: "HighestQualification",
        },
        {
          firstFieldLable: "Qualification Name",
          secondFieldLable: "Passed Out Year",
          firstType: "text",
          secondType: "text",
          secondInputName: "PassedOutYear",
          firstInputName: "QualificationName",
        },
        {
          firstFieldLable: "University/Board Name",
          secondFieldLable: "Add Section",
          firstType: "text",
          secondType: "Button",
          secondInputName: "",
          firstInputName: "UniversityOrBoardName",
        },
      ],
    },
    {
      title: "Experience Details",
      Fvalue: [
        {
          firstFieldLable: "Total Years of Experience",
          secondFieldLable: "Designation",
          firstType: "option",
          secondType: "text",
          secondInputName: "Designation",
          firstInputName: "Total Years of Experience",
        },
        {
          firstFieldLable: "Total Experience",
          secondFieldLable: "Previous Organization Start Date",
          firstType: "text",
          secondType: "text",
          secondInputName: "Previous Organization Start Date",
          firstInputName: "Total Experience",
        },
        {
          firstFieldLable: "Relevant Experience",
          secondFieldLable: "Previous Organization End Date",
          firstType: "text",
          secondType: "text",
          secondInputName: "Previous Organization End Date",
          firstInputName: "Relevant Experience",
        },
        {
          firstFieldLable: "Previous Organization Name",
          secondFieldLable: "Add Section",
          firstType: "text",
          secondType: "Button",
          secondInputName: "",
          firstInputName: "Previous Organization Name",
        },
      ],
    },
    {
      title: "Documentation Checklists",
      Fvalue: [
        {
          firstFieldLable: "CV/Resume?",
          secondFieldLable: "Temporary Address Proof Copy",
          firstType: "checkbox",
          secondType: "checkbox",
          secondInputName: "TemporaryAddressProofCopy",
          firstInputName: "CvOrResume",
        },
        {
          firstFieldLable: "Interview Assesment Sheet",
          secondFieldLable: "Permanent Address Proof Copy",
          firstType: "checkbox",
          secondType: "checkbox",
          secondInputName: "PermanentAddressProofCopy",
          firstInputName: "InterviewAssesmentSheet",
        },
        {
          firstFieldLable: "Photograph",
          secondFieldLable: "NOC from the College",
          firstType: "checkbox",
          secondType: "checkbox",
          secondInputName: "NOCFromTheCollege",
          firstInputName: "Photograph",
        },
        {
          firstFieldLable: "10th Mark Sheet Copy",
          secondFieldLable: "Resignation/Relieving Letter",
          firstType: "checkbox",
          secondType: "checkbox",
          secondInputName: "ResignationOrRelievingLetter",
          firstInputName: "TenthMarkSheetCopy",
        },
        {
          firstFieldLable: "Highest Qualification Copy",
          secondFieldLable: "Last 3 Months Salary Slips",
          firstType: "checkbox",
          secondType: "checkbox",
          secondInputName: "Last3MonthsSalarySlips",
          firstInputName: "HighestQualificationCopy",
        },
        {
          firstFieldLable: "Pan Card Copy",
          secondFieldLable: "Last 6 Months Bank Statement?",
          firstType: "checkbox",
          secondType: "checkbox",
          secondInputName: "Last6MonthsBackStatement",
          firstInputName: "PanCardCopy",
        },
      ],
    },
  ];
  // const validationSchema = Yup.object().shape({
  // Employement_Sub_Type: Yup.string().required(
  // "Employement Sub Type is required"
  // ),
  // Gender: Yup.string().required("Gender is required"),
  // Employement_Code: Yup.string().required("Employee Code is required"),
  // Team: Yup.string().required("Team Code is required"),
  // Employement_Type: Yup.string().required("Employement Type  is required"),
  // Department: Yup.string().required("Department is required"),
  // Employement_Fullname: Yup.string().required(
  // "Employement Fullname  is required"
  // ),
  // Branch: Yup.string().required("Department is required"),
  // Designation: Yup.string().required("Designation is required"),
  // Weekly_off_Day: Yup.string().required("Weekly off Day is required"),
  // Date_of_Joining: Yup.string().required("Date of Joining is required"),
  // Shift: Yup.string().required("Shift is required"),
  // Associate Identity
  // D_O_B_On_Papers: Yup.string().required("D.O.B On Papers is required"),
  // Passport: Yup.string().required("Passport is required"),
  // D_O_B_Celebration: Yup.string().required("D.O.B. Celebration is required"),
  // Marital_Status: Yup.string().required("Marital Status is required"),
  // Personal_Phone_No: Yup.string().required("Personal Phone No. is required"),
  // Blood_Group: Yup.string().required("Blood_Group  is required"),
  // Personal_Email_Id: Yup.string()
  // .required("Personal Email Id is required")
  // .email(),
  // Religion: Yup.string().required("Religion is required"),
  // PAN_Number: Yup.string().required("PAN Number is required").min(10).max(10),
  // Aadhar_Number: Yup.string()
  // .required("Aadhar Number is required")
  // .min(12)
  // .max(12),
  // HR Record Information
  // Official_Email_Id: Yup.string()
  // .required("Official Email Id is required")
  // .email(),
  // Appointment_Letter_Issued: Yup.string().required(
  // "Appointment Letter Issued is required"
  // ),
  // Offer_Letter_Issue: Yup.string().required(
  // "Offer Letter Issue Status is required"
  // ),
  // Appointment_Letter_Issued_Date: Yup.string().required(
  // "Appointment Letter Issued Date is required"
  // ),
  // Offer_Letter_Issue_Date: Yup.string().required(
  // "Offer_Letter_Issue_Date is required"
  // ),
  // Confimation_Letter: Yup.string().required("Confimation Letter is required"),
  // Employee_ID_Card_Issued: Yup.string().required(
  // "Employee ID Card Issued is required"
  // ),
  // Confirmation_Letter_Issue_Date: Yup.string().required(
  // "Confirmation Letter Issue Date is required"
  // ),
  // Employee_ID_Card_Issue_Date: Yup.string().required(
  // "Employee ID Card Issue Date is required"
  // ),
  // Experience Details
  // Total_Years_of_Experience: Yup.string()
  // .required("Total Years of Experience is required")
  // .email(),
  // Total_Experience: Yup.string().required("Total Experience is required"),
  // Previous_Organization_Start_Date: Yup.string().required(
  // "Previous Organization Start Date is required"
  // ),
  // Relevant_Experience: Yup.string().required(
  // "Relevant Experience is required"
  // ),
  // Previous_Organization_End_Date: Yup.string().required(
  // "Previous Organization End Date is required"
  // ),
  // Previous_Organization_Name: Yup.string().required(
  // "Previous Organization Name is required"
  // ),
  // Previous_Organization: Yup.string().required(
  // "Previous Organization is required"
  // ),
  // Qualification Details
  // Highest_Qualification: Yup.string()
  // .required("Highest_Qualification is required")
  // .email(),
  // Institute_Name: Yup.string().required("Institute Name is required"),
  // Qualification_Name: Yup.string().required("Qualification Name is required"),
  // Passed_Out_Year: Yup.string()
  // .required("Passed Out Year is required")
  // .min(4)
  // .max(4),
  // University_Board_Name: Yup.string().required(
  // "University_Board_Name is required"
  // ),
  // Documentation CheckLists
  // CV_Resume: Yup.bool().required("CV/Resume is required"),
  // Temporary_Address_Proof_Copy: Yup.bool().required(
  // "Temporary Address Proof Copy is required"
  // ),
  // Interview_Assesment_Sheet: Yup.bool().required(
  // "Interview Assesment Sheet is required"
  // ),
  // Permanent_Address_Proof_Copy: Yup.bool().required(
  // "Permanent Address Proof Copy is required"
  // ),
  // Photograph: Yup.bool().required("Photograph is required"),
  // NOC_from_the_College: Yup.bool().required(
  // "NOC from the College is required"
  // ),
  // Tenth_Mark_Sheet_Copy: Yup.bool().required(
  // "10th Mark Sheet Copy is required"
  // ),
  // Resignation_Relieving_Letter: Yup.bool().required(
  // "Resignation Relieving Letter is required"
  // ),
  // Highest_Qualification_Copy: Yup.bool().required(
  // "Highest Qualification Copy is required"
  // ),
  // Last_3_Months_Salary_Slips: Yup.bool().required(
  // "Last 3 Months Salary Slips is required"
  // ),
  // Pan_Card_Copy: Yup.bool().required("Pan Card Copy is required"),
  // Last_6_Months_Bank_Statement: Yup.bool().required(
  // "Last 6 Months Bank Statement? is required"
  // ),
  // });
  
    //
 
    if(id){
    FormData.map((fdata:any)=>{fdata.Fvalue.map((inamn:any)=>{
      setValue(inamn.firstInputName,EditEmpDetail[inamn.firstInputName])

      setValue(inamn.secondInputName,EditEmpDetail[inamn.secondInputName])
        })});
      }
      console.log(EditEmpDetail);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", position: "relative", marginLeft: "1.5px" }}>
      {/* <div className="employeesContainer"> */}
      <>
       
              <div className="employeeFormContainer">
                {FormData.map((fdata) => (
                  <div
                    style={{
                      marginTop: "35px",
                      marginLeft: "15px",
                    }}
                  >
                    <Card
                      valueHeight="250px"
                      valueWidth="99%"
                      valueBoxShadow="0px 0px 2.2px #9a9a9a61"
                      valueBoxRadius="5px"
                    >
                      <div className="employeeSubFormContainer">
                        <label className="formTitle" htmlFor="formTitle">
                          {fdata.title}
                        </label>
                        <div style={{ marginTop: " 20px" }}>
                          {fdata.Fvalue.map((data) => (
                            <div className="formField">
                              <div
                                style={{
                                  width: "43%",
                                  marginTop: "20px",
                                  marginLeft: "2%",
                                }}
                              >
                                {data.firstType !== "checkbox" ? (
                                  <label className="Sub_Type" htmlFor="Sub_Type">
                                    {data.firstFieldLable}
                                  </label>
                                ) : (
                                  <span></span>
                                )}
                                {data.firstType == "option" ? (
                                  <div>
                                    <div>
                                        <input
                                              className="optionsearchBox"
        list="Designation"
        type="text"
        placeholder=""
        {...register(`${data.firstInputName}`)}
        style={{
          backgroundColor : `#ffff`,
          borderRadius:"3px",
          boxShadow:"0 1px 3px #9a9a9a61",
          width: "100%",
          height: "28px",
          border: "1px solid #9a9a9a61",
          fontFamily: "Poppins",
          fontSize: "11px",
          // color: `${searchColor}`,
      
          // color: `${BoxColor}`,
      
          // color: `${searchColor}`
        }}
       
      />
      <datalist id="Designation">
        {DesignationOption.map((Optionsvalue: any, key: number) => (
          <option key={key} value={Optionsvalue} />
        ))}
      </datalist>
                                      <span style={{
                                        position: "absolute",
                                        width: "10px",
                                        height: "10px",
                                        // border: "1px solid",
                                        left: "45.8%",
                                        marginTop: "-25px",
                                        backgroundColor: "#fff"
                                      }}>
                                      </span>
                                      <img
                                        className="DropDownIcon"
                                        src={DropDownIcon}
                                        alt="search"
                                      />
                                    </div>
                                    <div style={{ color: "red" }}>
                                      {errors[data.firstInputName]?.message}
                                    </div>
                                  </div>
                                ) : data.firstType == "checkbox" ? (
                                  <div>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginTop: "20px",
                                      }}
                                    >
                                      <div className="formCheckBoxField">
                                        <label
                                          style={{
                                            position: "relative",
                                            top: "7px",
                                            left: "2%",
                                            fontSize: "15px",
                                            fontWeight: "650px",
                                            fontFamily: "poppins"
                                          }}
                                        >
                                          {data.firstFieldLable}
                                        </label>
                                      </div>

                                      <div>
                                        <Checkbox
                                          {...register(`${data.firstInputName}`)}
                                          icon={
                                            <div
                                              style={{
                                                height: "15px",
                                                width: "15px",
                                                backgroundColor: "#279F9F",
                                              }}
                                            >
                                              <Icon.FiCheck color="white" cursor="pointer" 
                                              size={20} />
                                            </div>
                                          }
                                          style={{
                                            cursor: "pointer",
                                            backgroundColor: "#279F9F",
                                            marginLeft: "-5px",
                                          }}
                                          borderColor="#279F9F"
                                          borderRadius="1px 5px 5px 0px"
                                          cursor="pointer"
                                          size={32}
                                        />
                                      </div>

                                      {/* <div> */}
                                      {/* <Checkbox */}
                                      {/* // checked={true} */}
                                      {/* // name={data.firstFieldLable} */}
                                      {/* // style={{ */}
                                      {/* // cursor: "pointer", */}
                                      {/* // backgroundColor: "#279F9F", */}
                                      {/* // marginLeft: "-10px", */}
                                      {/* // }} */}
                                      {/* // borderColor="#279F9F" */}
                                      {/* // size={32} */}
                                      {/* // /> */}
                                      {/* </div> */}
                                    </div>
                                    <div style={{ color: "red" }}>
                                      {errors[data.firstInputName]?.message}
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <input
                                      
                                      type={data.firstType}
                                      {...register(`${data.firstInputName}`)}
                                      className="formInputBox"
                                    />
                                    <div style={{ color: "red" }}>
                                      {errors[data.firstInputName]?.message}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div
                                style={{
                                  width: "43%",
                                  marginTop: "20px",
                                  marginRight: "5%",
                                }}
                              >
                                {data.secondType !== "checkbox" &&
                                  data.secondType !== "Button" &&
                                  data.secondType !== "" ? (
                                  <label className="Sub_Type" htmlFor="Sub_Type">
                                    {data.secondFieldLable}
                                  </label>
                                ) : (
                                  <span></span>
                                )}
                                <br />
                                {data.secondType == "option" ? (
                                  <div>
                                    <div>
                                    <input
                                              className="optionsearchBox"
        list="Designation"
        type="text"
        placeholder=""
        {...register(`${data.firstInputName}`)}
        style={{
          backgroundColor : `#ffff`,
          borderRadius:"3px",
          boxShadow:"0 1px 3px #9a9a9a61",
          width: "100%",
          height: "28px",
          border: "1px solid #9a9a9a61",
          fontFamily: "Poppins",
          fontSize: "11px",
          // color: `${searchColor}`,
      
          // color: `${BoxColor}`,
      
          // color: `${searchColor}`
        }}
       
      />
      <datalist id="Designation">
        {DesignationOption.map((Optionsvalue: any, key: number) => (
          <option key={key} value={Optionsvalue} />
        ))}
      </datalist>
                                      <span style={{
                                        position: "absolute",
                                        width: "10px",
                                        height: "10px",
                                        // border: "1px solid",
                                        left: "92.5%",
                                        marginTop: "-25px",
                                        backgroundColor: "#fff"
                                      }}>
                                      </span>
                                      <img
                                        className="DropDownIcon"
                                        src={DropDownIcon}
                                        alt="search"
                                      />
                                    </div>
                                    <div style={{ color: "red" }}>
                                      {errors[data.secondInputName]?.message}
                                    </div>
                                  </div>
                                ) : data.secondType == "checkbox" ? (
                                  <div>
                                    <div
                                      style={{
                                        display: "flex",
                                      }}
                                    >
                                      <div className="formCheckBoxField">
                                        <label
                                          style={{
                                            position: "relative",
                                            top: "7px",
                                            left: "2%",
                                            fontSize: "15px",
                                            fontWeight: "650px",
                                            fontFamily: "poppins"
                                          }}
                                        >
                                          {data.secondFieldLable}
                                        </label>
                                      </div>
                                      {/* <input
                                    name={data.firstInputName}
                                    type={data.firstType}
                                    className="formCheckBox"
                                  /> */}
                                      <div>
                                        <Checkbox
                                          checked={EditEmpDetail[data.secondFieldLable]}
                                          {...register(`${data.secondInputName}`)}
                                          icon={
                                            <div
                                              style={{
                                                height: "15px",
                                                width: "15px",
                                                backgroundColor: "#279F9F",
                                              }}
                                            >
                                              <Icon.FiCheck color="white" cursor="pointer" size={20} />
                                            </div>
                                          }

                                          style={{
                                            cursor: "pointer",
                                            backgroundColor: "#279F9F",
                                            marginLeft: "-5px",

                                          }}
                                          borderColor="#279F9F"
                                          borderRadius="1px 5px 5px 0px"
                                          cursor="pointer"
                                          size={32}
                                        />
                                      </div>
                                    </div>
                                    <div style={{ color: "red" }}>
                                      {errors[data.secondInputName]?.message}
                                    </div>
                                  </div>
                                ) : data.secondType == "Button" ? (
                                  <button className="formButton formAddSectionButton">
                                    {data.secondFieldLable}
                                  </button>
                                ) : data.secondType == "" ? (
                                  <div></div>
                                ) : (
                                  <div>
                                    <input
                                      type={data.secondType}
                                      className="formInputBox"
                                      {...register(`${data.secondInputName}`)}
                                    />
                                    <div style={{ color: "red" }}>
                                      {errors[data.secondInputName]?.message}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
                <input
                  className="formButton formSaveButton"
                  type="submit"
                  value="Save"
                />
              </div>
          
      </>
    </div>
  );
};
export default Form;

{
  /* <div className="formField">
                    <div>
                      <label className="E_Code" htmlFor="E_Code">
                        Employement Code
                      </label>
                      <br />
                      <input
                        className="e_Code"
                        id="Code"
                        name="Code"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="Team" htmlFor="Team">
                        Team
                      </label>
                      <br />
                      <input
                        className="team"
                        id="team"
                        name="team"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="formField">
                    <div>
                      <label className="E_Type" htmlFor="E_Type">
                        Employement Type
                      </label>
                      <br />
                      <input
                        className="e_type"
                        id="Code"
                        name="Code"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="Department" htmlFor="Department">
                        Department
                      </label>
                      <br />
                      <input
                        className="department"
                        id="department"
                        name="department"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="formField">
                    <div>
                      <label className="E_Fullname" htmlFor="E_Fullname">
                        Employement Fullname
                      </label>
                      <br />
                      <input
                        className="e_fullname"
                        id="e_fullname"
                        name="e_fullname"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="Branch" htmlFor="Branch">
                        Branch
                      </label>
                      <br />
                      <input
                        className="branch"
                        id="branch"
                        name="branch"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="formField">
                    <div>
                      <label className="Design" htmlFor="Designation">
                        Designation
                      </label>
                      <br />
                      <input
                        className="design"
                        id="designation"
                        name="designation"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="Weekly" htmlFor="Weekly">
                        Weekly off Day
                      </label>
                      <br />
                      <input
                        className="weekly"
                        id="weekly"
                        name="Weekly"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="formField">
                    <div>
                      <label className="Joining" htmlFor="Joining">
                        Date of Joining
                      </label>
                      <br />
                      <input
                        className="joining"
                        id="joining"
                        name="joining"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="Shift" htmlFor="Shift">
                        Shift
                      </label>
                      <br />
                      <input
                        className="shift"
                        id="shift"
                        name="shift"
                        type="text"
                      />
                    </div>
                  </div>*/
}

{
  /* ASSOCIATE IDENTITY DETAILS
                <div className="employeeSubFormContainer">
                  <label className="formTitle" htmlFor="formTitle">
                    Associate Identity Details
                  </label>
                  <div className="formField"> 
                  <div>
                    <label className="Sub_Type" htmlFor="Sub_Type">
                      D.O.B- On Papers
                    </label>
                    <br />
                    <input className="Sub" id="Sub" name="Sub" type="text" />
                    {
                      //  errors.firstname && <div className="error">Enter your name</div>
                    }
                  </div>
                  <div>
                    <label className="Gender" htmlFor="Gender">
                      Passport
                    </label>
                    <br />
                    <input
                      className="gender"
                      id="gender"
                      name="gender"
                      type="text"
                    />
                    {
                      // errors.lastname && <div className="error">Enter your last name</div>
                    }
                  </div>
                  </div>
                  
                  <div className="formField"> 
                  <div>
                    <label className="E_Code" htmlFor="E_Code">
                      D.O.B- Celebration
                    </label>
                    <br />
                    <input
                      className="e_Code"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                    {
                      // errors.age && <div className="error">Enter your age</div>
                    }
                  </div>
                  <div>
                    <label className="Team" htmlFor="Team">
                      Marital Status
                    </label>
                    <br />
                    <input className="team" id="team" name="team" type="text" />
                    {
                      // errors.lastname && <div className="error">Enter your last name</div>
                    }
                  </div>
                  </div>
                  
                  <div className="formField"> 
                  <div>
                    <label className="E_Type" htmlFor="E_Type">
                      Personal Email Id
                    </label>
                    <br />
                    <input
                      className="e_type"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                    {
                      // errors.age && <div className="error">Enter your age</div>
                    }
                  </div>
                  <div>
                    <label className="Department" htmlFor="Department">
                      Religion
                    </label>
                    <br />
                    <input
                      className="department"
                      id="department"
                      name="department"
                      type="text"
                    />
                    {
                      // errors.lastname && <div className="error">Enter your last name</div>
                    }
                  </div>
                  </div>
                  
                  <div className="formField"> 
                  <div>
                    <label className="E_Fullname" htmlFor="E_Fullname">
                      PAN Number
                    </label>
                    <br />
                    <input
                      className="e_fullname"
                      id="e_fullname"
                      name="e_fullname"
                      type="text"
                    />
                    {
                      // errors.age && <div className="error">Enter your age</div>
                    }
                  </div>
                  <div>
                    <label className="Branch" htmlFor="Branch">
                      Aadhar Number
                    </label>
                    <br />
                    <input
                      className="branch"
                      id="branch"
                      name="branch"
                      type="text"
                    />
                    {
                      // errors.lastname && <div className="error">Enter your last name</div>
                    }
                  </div>
                  </div>
                </div>

                {/* HR RECORD INFORMATION */
}
{
  /* <div className="employeeSubFormContainer">
                  <label className="formTitle" htmlFor="formTitle">
                    HR Record Information
                  </label>
                  
                  <div className="formField"> 
                  <div>
                    <label className="Sub_Type" htmlFor="Sub_Type">
                      Official Email Id
                    </label>
                    <br />
                    <input className="Sub" id="Sub" name="Sub" type="text" />
                   
                  </div>
                  <div>
                    <label className="Gender" htmlFor="Gender">
                      Appointment Letter issued
                    </label>
                    <br />
                    <input
                      className="gender"
                      id="gender"
                      name="gender"
                      type="text"
                    />
                   
                  </div>
                  </div>
                  
                  <div className="formField"> 
                  <div>
                    <label className="E_Code" htmlFor="E_Code">
                      Offer Letter Issued
                    </label>
                    <br />
                    <input
                      className="e_Code"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                    
                  </div>
                  <div>
                    <label className="Team" htmlFor="Team">
                      Appointment Letter Issue Date
                    </label>
                    <br />
                    <input className="team" id="team" name="team" type="text" />
                   
                  </div>
                  </div>
                  
                  <div className="formField"> 
                  <div>
                    <label className="E_Type" htmlFor="E_Type">
                      Offer Letter Issue Date
                    </label>
                    <br />
                    <input
                      className="e_type"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                   
                  </div>
                  <div>
                    <label className="Department" htmlFor="Department">
                      Confirmation Letter
                    </label>
                    <br />
                    <input
                      className="department"
                      id="department"
                      name="department"
                      type="text"
                    />
                  
                  </div>
                  </div>
                  
                  <div className="formField"> 
                  <div>
                    <label className="E_Fullname" htmlFor="E_Fullname">
                      Employee ID Card Issued
                    </label>
                    <br />
                    <input
                      className="e_fullname"
                      id="e_fullname"
                      name="e_fullname"
                      type="text"
                    />
                   
                  </div>
                  <div>
                    <label className="Branch" htmlFor="Branch">
                      Confirmation Letter Issue Date
                    </label>
                    <br />
                    <input
                      className="branch"
                      id="branch"
                      name="branch"
                      type="text"
                    />
                   
                  </div>
                    </div>
                  <div>
                    <label className="E_Fullname" htmlFor="E_Fullname">
                      Employee ID Card Issued Date
                    </label>
                    <br />
                    <input
                      className="e_fullname"
                      id="e_fullname"
                      name="e_fullname"
                      type="text"
                    />
                   
                  </div>
                </div>

                <div className="employeeSubFormContainer">
                  <label className="formTitle" htmlFor="formTitle">
                    Experience Details
                  </label>
                  
                  <div className="formField"> 
                  <div>
                    <label className="Sub_Type" htmlFor="Sub_Type">
                      Total Year of Experience
                    </label>
                    <br />
                    <input className="Sub" id="Sub" name="Sub" type="text" />
                  
                  </div>
                  <div>
                    <label className="Gender" htmlFor="Gender">
                      Designation
                    </label>
                    <br />
                    <input
                      className="gender"
                      id="gender"
                      name="gender"
                      type="text"
                    />
                  
                  </div>
                  </div>
                  
                  <div className="formField"> 
                  <div>
                    <label className="E_Code" htmlFor="E_Code">
                      Total Experience
                    </label>
                    <br />
                    <input
                      className="e_Code"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                   
                  </div>
                  <div>
                    <label className="Team" htmlFor="Team">
                      Previous Organization Start Date
                    </label>
                    <br />
                    <input className="team" id="team" name="team" type="text" />
                   
                  </div>
                  </div>
                  
                  <div className="formField"> 
                  <div>
                    <label className="E_Type" htmlFor="E_Type">
                      Previous Organization Name
                    </label>
                    <br />
                    <input
                      className="e_type"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                   
                  </div>
                  <div>
                    <label className="Department" htmlFor="Department">
                      Previous Organization
                    </label>
                    <br />
                    <input
                      className="department"
                      id="department"
                      name="department"
                      type="text"
                    />
                   
                  </div>
                  </div>
                </div> */
}

{
  /* <div className="employeeSubFormContainer">
                  <label className="formTitle" htmlFor="formTitle">
                    Qualification Details
                  </label>
                  
                  <div className="formField"> 
                  <div>
                    <label className="Sub_Type" htmlFor="Sub_Type">
                      Highest Qualification
                    </label>
                    <br />
                    <input className="Sub" id="Sub" name="Sub" type="text" />
                   
                  </div>
                  <div>
                    <label className="Gender" htmlFor="Gender">
                      Institute Name
                    </label>
                    <br />
                    <input
                      className="gender"
                      id="gender"
                      name="gender"
                      type="text"
                    />
                   
                  </div>
                  </div>
                  
                  <div className="formField"> 
                  <div>
                    <label className="E_Code" htmlFor="E_Code">
                      Qualification Name
                    </label>
                    <br />
                    <input
                      className="e_Code"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                   
                  </div>
                  <div>
                    <label className="Team" htmlFor="Team">
                      Passed Out Year
                    </label>
                    <br />
                    <input className="team" id="team" name="team" type="text" />
                   
                  </div>
                    </div>
                  <div>
                    <label className="E_Type" htmlFor="E_Type">
                      University / Board Name
                    </label>
                    <br />
                    <input
                      className="e_type"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                   
                  </div>
                </div>

                <div className="employeeSubFormContainer">
                  <label className="formTitle" htmlFor="formTitle">
                    Experience Details
                  </label>
                  
                  <div className="formField"> 
                  <div>
                    <label className="Sub_Type" htmlFor="Sub_Type">
                      Total Year of Experience
                    </label>
                    <br />
                    <input className="Sub" id="Sub" name="Sub" type="text" />
                  
                  </div>
                  <div>
                    <label className="Gender" htmlFor="Gender">
                      Previous Organization Name
                    </label>
                    <br />
                    <input
                      className="gender"
                      id="gender"
                      name="gender"
                      type="text"
                    />
                  
                  </div>
                  </div>
                  <div>
                    <label className="E_Code" htmlFor="E_Code">
                      Total Experience
                    </label>
                    <br />
                    <input
                      className="e_Code"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                 
                  </div>
                  <div>
                    <label className="Team" htmlFor="Team">
                      Designation
                    </label>
                    <br />
                    <input className="team" id="team" name="team" type="text" />
                  
                  </div>
                  <div>
                    <label className="E_Type" htmlFor="E_Type">
                      Relevant Experience
                    </label>
                    <br />
                    <input
                      className="e_type"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                  
                  </div>
                  <div>
                    <label className="Team" htmlFor="Team">
                      Previous Organization Start Date
                    </label>
                    <br />
                    <input className="team" id="team" name="team" type="text" />
                    {
                    
                    }
                  </div>
                  <div>
                    <label className="E_Type" htmlFor="E_Type">
                      Previous Organization End Date
                    </label>
                    <br />
                    <input
                      className="e_type"
                      id="Code"
                      name="Code"
                      type="text"
                    />
                    {
                   
                    }
                  </div>*/
}
