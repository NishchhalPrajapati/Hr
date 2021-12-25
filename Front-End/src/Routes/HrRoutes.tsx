import { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Deshboard from "../Screens/Deshboard/Deshboard";
import Employees from "../Screens/Employees/Employees";
import EmployeeForm from "../Screens/EmployeeForm/EmployeeForm"
import EmployeeEditForm from "../Screens/EmployeeEditForm/EmployeeEditForm"
import Resources from "../Screens/Resources/Resources";
const HrRoutes: FunctionComponent = () => {
  return (
    <>
      <Router>
          <Routes>
          <Route path="/" element={<Deshboard/>} />
          <Route path="/employees" element={<Employees/>} />
          <Route path="/employees/list" element={<Employees/>} />
          <Route path="/employees/form" element={<EmployeeForm/> } />
          <Route path="/employees/form/edit/:id" element={<EmployeeEditForm/> } />
          <Route path="/hrresourses" element={<Resources/> } />
          </Routes>
      </Router>
    </>
  );
};

export default HrRoutes;