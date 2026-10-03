import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token,
            newPassword
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Password reset failed");
        return;
      }

      setMessage(data.message);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("Unable to connect to the server");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>

        <form onSubmit={handleResetPassword}>
          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">
            Reset Password
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;