import { FunctionComponent, useState } from "react";
import AttendanceDashboard from "../../Components/AttendanceDashboard/AttendanceDashboard";
import HrMainScreen from "../HrMainScreen/HrMainScreen";
import "../../Components/CommonStyle/HrMain.css";
import Form from "../../Components/EmployeesForm/Form";
import * as serviceWorker from "../../serviceWorker";
import { useForm } from "react-hook-form";
import axios from "axios";
import Card from "../../Components/Card/Card";
const EmployeeForm: FunctionComponent = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(validationSchema),
  });
  let [fromData, setFormData] = useState([])
  const onSubmit = async (formdata: any) => {
    
    formdata.Organization="61c08377ca5d0b615f9a9a15"
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post<any>(
      "/api/employee/createEmployees",
      formdata,
      config
    );
    setFormData(data);
    console.log(formdata)
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
          <Form register={register} errors={errors}  EditEmpDetail={""}/>
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
