import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;