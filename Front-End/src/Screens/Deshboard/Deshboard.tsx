import { FunctionComponent } from "react";
import AttendanceDashboard from "../../Components/AttendanceDashboard/AttendanceDashboard";
import HrMainScreen from "../HrMainScreen/HrMainScreen";
import "../../Components/CommonStyle/HrMain.css";
const Deshboard: FunctionComponent = () => {
  return (
    <>
      <HrMainScreen>
        <div className="hrMain">
          <AttendanceDashboard />
        </div>
      </HrMainScreen>
    </>
  );
};

export default Deshboard;
