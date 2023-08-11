import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      full_name: yup.string().max(20, "Max character is 20").required("Full name is required"),
      email: yup.string().email("Please use the correct email format").required("Email is required"),
      phone_number: yup.string().required("Phone number is required"),
      password: yup.string().required("Password is required"),
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      // Function kalian disini
      try {
        await axios.post("http://localhost:2000/user", {
          ...values,
          user_uniqueid: nanoid(5),
          referral_code: nanoid(10),
          points: 0,
          user_type: "user",
        });
        navigate("/login");
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
        <span>Register your account</span>
        <p style={{ margin: 0, alignSelf: "flex-start" }}>Full Name</p>
        <input
          type="text"
          style={{
            border: "1px solid #cbcbcb",
            borderRadius: 10,
            height: 30,
            padding: "0px 10px",
          }}
          name="full_name"
          onChange={formik.handleChange}
        />
        <p style={{ margin: 0, color: "red" }}>{formik.errors.full_name}</p>

        <p style={{ margin: 0, alignSelf: "flex-start" }}>Email</p>
        <input
          type="text"
          style={{
            border: "1px solid #cbcbcb",
            borderRadius: 10,
            height: 30,
            padding: "0px 10px",
          }}
          onChange={(e) => formik.setFieldValue("email", e.target.value)}
        />
        <p style={{ margin: 0, color: "red" }}>{formik.errors.email}</p>

        <p style={{ margin: 0, alignSelf: "flex-start" }}>Password</p>
        <input
          type="password"
          style={{
            border: "1px solid #cbcbcb",
            borderRadius: 10,
            height: 30,
            padding: "0px 10px",
          }}
          name="password"
          onChange={formik.handleChange}
        />
        <p style={{ margin: 0, color: "red" }}>{formik.errors.password}</p>

        <p style={{ margin: 0, alignSelf: "flex-start" }}>Phone Number</p>
        <input
          type="text"
          style={{
            border: "1px solid #cbcbcb",
            borderRadius: 10,
            height: 30,
            padding: "0px 10px",
          }}
          name="phone_number"
          onChange={formik.handleChange}
        />
        <p style={{ margin: 0, color: "red" }}>{formik.errors.phone_number}</p>

        <button
          style={{
            borderRadius: 10,
            backgroundColor: "#fff",
            border: "1px solid black",
            padding: 8,
          }}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
