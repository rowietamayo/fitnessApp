import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import { UserProvider } from "./context/UserContext";
import { WorkoutProvider } from "./context/WorkoutContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Workout from "./pages/Workout";

function App() {
  return (
    <UserProvider>
      <WorkoutProvider>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/workouts" element={<Workout />} />
            </Routes>
          </Container>
        </Router>
      </WorkoutProvider>
    </UserProvider>
  );
}

export default App;
