import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import ComplaintHistory from "./pages/ComplaintHistory";
import AllRequests from "./pages/AllRequests";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<Complaints />} />
        <Route path="/request/history" element={<ComplaintHistory />} />
        // <Route path="/request/all" element={<AllRequests />} />
      </Routes>
    </div>
  );
}

export default App;