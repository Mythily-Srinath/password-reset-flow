import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Forgot Password */}
        <Route path="/" element={<ForgotPassword />} />

        {/* Reset Password */}
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;