import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Dùng useLocation để lấy query params
import axios from "axios";

const ConfirmEmail = () => {
  const location = useLocation();

  useEffect(() => {
    const confirmEmail = async () => {
      console.log("hehe");

      // Dùng URLSearchParams để lấy query parameters từ URL
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const email = params.get("email");
      console.log(token);

      if (!token || !email) {
        alert("Invalid confirmation link");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:7132/api/Account/confirm-email?token=${token}&email=${email}`
        );
        alert(response.data.message || "Email confirmed successfully!");
      } catch (error) {
        alert(
          error.response?.data?.message || "An error occurred during confirmation."
        );
      }
    };

    confirmEmail();
  }, [location]);

  return (
    <div>
      <h1>Processing Email Confirmation...</h1>
    </div>
  );
};

export default ConfirmEmail;
