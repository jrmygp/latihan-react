/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/reducer/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Please use correct email format").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.get("http://localhost:2000/user", {
          params: {
            email: values.email,
            password: values.password,
          },
        });
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        dispatch(login(res.data[0]));
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          border: "1px solid black",
          padding: 40,
          width: 400,
          borderRadius: 10,
        }}
        onSubmit={formik.handleSubmit}
      >
        <span>Login to your account</span>
        <p style={{ margin: 0, alignSelf: "flex-start" }}>Email</p>
        <input
          type="text"
          style={{
            border: "1px solid #cbcbcb",
            borderRadius: 10,
            height: 30,
            padding: "0px 10px",
          }}
          name="email"
          onChange={formik.handleChange}
        />
        <p style={{ margin: 0, color: "red" }}>{formik.errors.email}</p>

        <p style={{ margin: 0, alignSelf: "flex-start" }}>Password</p>
        <input
          type={passwordIsShown ? "text" : "password"}
          style={{
            border: "1px solid #cbcbcb",
            borderRadius: 10,
            height: 30,
            padding: "0px 10px",
          }}
          onChange={(e) => formik.setFieldValue("password", e.target.value)}
        />
        <a style={{ fontSize: 12, alignSelf: "flex-end" }} onClick={() => setPasswordIsShown(!passwordIsShown)}>
          Show password
        </a>
        <p style={{ margin: 0, color: "red" }}>{formik.errors.password}</p>

        <button
          style={{
            borderRadius: 10,
            backgroundColor: "#fff",
            border: "1px solid black",
            padding: 8,
          }}
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
