import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import LandingPage from "./pages/landingpage/LandingPage";
import Login from "./pages/login/Login";
import AdminLogin from "./pages/login/AdminLogin"

function App() {
    return (
      <div>
        <Router>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="admin-login" element={<AdminLogin />} />
          </Route>
        </Routes>
      </Router>
      </div>
    );
  }

export default App;
