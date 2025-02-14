import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../redux/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Login Data:", values);
      const resultAction = await dispatch(loginUser(values));
      console.log("Result of login",resultAction);
      if (loginUser.rejected.match(resultAction)) {
        console.log("Login failed:", resultAction.error.message);
      } else {
        navigate("/dashboard");
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-gradient-to-br from-gray-100 to-black">
      <div className="max-w-md w-full p-6 rounded-lg shadow-md bg-white">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl font-bold mb-4">Login</h2>
        </div>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
      
          <div>
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 mt-1">{formik.errors.password}</div>
            )}
            <button type="button" className="absolute right-2 bottom-2" onClick={togglePasswordVisibility}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="mt-2 text-gray-600 cursor-pointer">
              New user?{" "}
              <span style={{ color: "blue" }} onClick={() => navigate("/register")}>
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
