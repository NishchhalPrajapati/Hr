import { FunctionComponent, useEffect, useState } from "react";
import AttendanceDashboard from "../../Components/AttendanceDashboard/AttendanceDashboard";
import HrMainScreen from "../HrMainScreen/HrMainScreen";
import "../../Components/CommonStyle/HrMain.css";
import Form from "../../Components/EmployeesForm/Form";
import * as serviceWorker from "../../serviceWorker";
import { useForm } from "react-hook-form";
import axios from "axios";
import Card from "../../Components/Card/Card";
import { Navigate, useParams } from 'react-router-dom'; 

const EmployeeForm: FunctionComponent  = ({ }) => {

  let [EditEmpDetail,setEditEmpDetail]=useState<any[]>([{}])

  const { id } = useParams();
    console.log(id);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,reset
  } = useForm({
    // resolver: yupResolver(validationSchema),
  });
  let [fromData, setFormData] = useState([])
  
  let EmpDetails= async()=>{

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };
     
    let { data } = await axios.get<any>(
      `/api/employee/getEmployees/${id}`,
      config
    );
    console.log(data)
    setEditEmpDetail(data);
    // console.log(data);
  }
  
   useEffect(()=>{
    EmpDetails()
    console.log(EditEmpDetail)
   },[])


   

  const onSubmit = async (formdata: any) => {
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    console.log(id)
    const { data } = await axios.put<any>(
      `/api/employee/updateEmployees/${id}`,
      formdata,
      config
    );
     if(data){
      alert("updated Successfully")
     }
    
     
  };
  return (
    <>
      <HrMainScreen>
        <div className="hrMain">
        <Card
          valueHeight="5000px"
          valueWidth="100%"
          valueBoxShadow="-1px 1px 2px #9a9a9a61"
          valueBoxRadius="0px"
        >
          {" "}
          <div
            style={{
              padding: "20px",
              marginTop: "0px",
              marginLeft: "5px",
            }}
          >
            {/* <button className="formButton formEditButton">Edit</button> */}
            <form onSubmit={handleSubmit(onSubmit)}>
          <Form id={id} register={register} errors={errors} EditEmpDetail={EditEmpDetail} setValue={setValue}/>
          </form>
          </div>
        </Card>
        </div>
      </HrMainScreen>
    </>
  );
};

serviceWorker.unregister();
export default EmployeeForm;
