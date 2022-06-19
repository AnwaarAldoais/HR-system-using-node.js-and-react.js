import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import HR from "./components/HR";
import NarrowLayout from "./components/Layouts/narrowLayout";
import MyReport from "./components/monthly-report";
import HrMonthlyReports from "./components/HrMonthlyReports";
import HrWeeklyReports from "./components/hrWeeklyReport";
import Hr from "./components/hrpage";
import Initialization from "./components/Initialization";
import Departments from "./components/Departements";
import Employees from "./components/Employees";
import Users from "./components/Users";
import Shifts from "./components/shifts";
import OfficialHolidays from "./components/officialHolidays";
import GeneralHolidays from "./components/generalHolidays";
import EmpGroups from "./components/EmpGroups";
import Jobs from "./components/Jobs";
import Sections from "./components/sections";
import HolidaysStocks from "./components/holidaysStocks";
import HolidayRequest from "./components/holidayRequest";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Home" element={<NarrowLayout />} />
          <Route exact path="/HrDashboard" element={<HR />} />
          <Route exact path="/MyReport" element={<MyReport />} />
          <Route
            exact
            path="/HrMonthlyReports"
            element={<HrMonthlyReports />}
          />
          <Route exact path="/HrWeeklyReports" element={<HrWeeklyReports />} />
          <Route exact path="/employeesAttendance" element={<Hr />} />
          <Route exact path="/Initialization" element={<Initialization />} />
          <Route
            exact
            path="/Initialization/departements"
            element={<Departments />}
          />
          <Route
            exact
            path="/Initialization/Employees"
            element={<Employees />}
          />
          <Route exact path="/Initialization/Shifts" element={<Shifts />} />
          <Route exact path="/Initialization/Users" element={<Users />} />
          <Route
            exact
            path="/Initialization/officialHolidays"
            element={<OfficialHolidays />}
          />
          <Route
            exact
            path="/Initialization/generalHolidays"
            element={<GeneralHolidays />}
          />
           <Route exact path="/Initialization/Sections" element={<Sections />} />
          <Route exact path="/Initialization/Groups" element={<EmpGroups />} />
          <Route exact path="/Initialization/Jobs" element={<Jobs />} />
          <Route exact path="/Initialization/holidaysStocks" element={<HolidaysStocks />} />
          <Route exact path="/Initialization/holidayRequest" element={<HolidayRequest />} />
          <Route
            exact
            path="/Initialization/Employees"
            element={<Employees />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
