/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../redux/reducer/auth";
import { useEffect } from "react";

const KeepLogin = ({ children }) => {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const router = useLocation();

  const refresh = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      dispatch(login(userData));
    } else if (!userData) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!userSelector.id) {
      refresh();
    }
  }, [userSelector.id]);

  return children;
};

export default KeepLogin;
