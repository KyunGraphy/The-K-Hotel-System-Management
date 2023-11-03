import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"
import Admin from "./pages/admin/Admin";
import RoomsMana from "./pages/admin/roomsMana/RoomsMana";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ReservationMana from "./pages/admin/reservation/ReservationMana";
import PageError from "./pages/admin/notFound/PageError.jsx";
import StaffMana from "./pages/admin/staff/StaffMana";
import Business from "./pages/admin/business/Business";
import Finance from "./pages/admin/finance/Finance";
import ViewReservation from "./pages/admin/reservation/ViewReservation";
import Service from "./pages/service/Service";
import Profile from "./pages/profile/Profile";
import Reservation from "./pages/reservation/Reservation";
import ViewStaff from "./pages/admin/staff/Components/ViewStaff";

// ----------------------------------------------------------------
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Service />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reservation" element={<Reservation />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />}>
          <Route path="room" element={<RoomsMana />} />
          <Route path="reservation" element={<ReservationMana />} />
          <Route path="reservation/detail" element={<ViewReservation />} />
          <Route path="staff" element={<StaffMana />} />
          <Route path="staff/detail" element={<ViewStaff />} />
          <Route path="business" element={<Business />} />
          <Route path="finance" element={<Finance />} />

          <Route path=":id" element={<PageError />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
