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
import StaffMana from "./pages/admin/staff/StaffMana";
import Business from "./pages/admin/business/Business";
import Finance from "./pages/admin/finance/Finance";
import ViewReservation from "./pages/admin/reservation/ViewReservation";
import Service from "./pages/service/Service";
import Profile from "./pages/profile/Profile";
import Reservation from "./pages/reservation/Reservation";
import ViewStaff from "./pages/admin/staff/Components/ViewStaff";
import ChangePassword from "./pages/changePassword/ChangePassword.jsx";
import WarehouseComponent from "./pages/admin/warehouse";
import AddFacility from "./pages/admin/warehouse/tabs/addForm/AddFacility.jsx";
import AddService from "./pages/admin/warehouse/tabs/addForm/AddService.jsx";
import Payment from "./pages/hotel/Payment.jsx";
import BookingSuccess from "./pages/hotel/BookingSuccess.jsx";
import ProcurementComponent from "./pages/admin/procurement/index.jsx";
import ClientReservation from "./pages/reservation/ClientReservation.jsx";
import NotFound from "./pages/errors/NotFound.jsx";
import Forbidden from "./pages/errors/Forbidden.jsx";

// ----------------------------------------------------------------
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/bookingSuccess" element={<BookingSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Service />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation/:id" element={<ClientReservation />} />
        <Route path="/changePw" element={<ChangePassword />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />}>
          <Route path="room" element={<RoomsMana />} />
          <Route path="reservation" element={<ReservationMana />} />
          <Route path="reservation/detail" element={<ViewReservation />} />
          <Route path="staff" element={<StaffMana />} />
          <Route path="staff/detail" element={<ViewStaff />} />
          <Route path="business" element={<Business />} />
          <Route path="warehouse" element={<WarehouseComponent />} />
          <Route path="warehouse/newFacility" element={<AddFacility />} />
          <Route path="warehouse/newService" element={<AddService />} />
          <Route path="finance" element={<Finance />} />
          <Route path="procurement" element={<ProcurementComponent />} />

          <Route path=":id" element={<NotFound />} />
        </Route>

        {/* Error page handler */}
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
