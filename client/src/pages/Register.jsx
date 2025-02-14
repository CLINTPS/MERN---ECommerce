import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "../redux/auth/authSlice"

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: async (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      console.log("Registration Data:", userData);
      try {
        const resultAction = await dispatch(registerUser(userData))

        console.log("Result of register user result action",resultAction);

        if (registerUser.fulfilled.match(resultAction)) {
          navigate("/login");
        }
        
      } catch (err) {
        console.error("Registration failed:", err);
      }

    },
  });

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-gradient-to-br from-gray-100 to-black">
      <div className="max-w-md w-full p-6 rounded-lg shadow-md bg-white">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl font-bold mb-4">Register</h2>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 mt-1">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
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
            <label className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Confirm password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500 mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Register
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <p className="mt-2 text-gray-600 cursor-pointer">
              Already have an account?{" "}
              <span
                style={{ color: "blue" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
