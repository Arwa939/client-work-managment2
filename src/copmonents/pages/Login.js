import React, { useState,useEffect } from "react";
import "../css/Login.css";
import loginLogo from "../assets/login.png";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ValidationLoginSchema from "../../validations/LoginValidation";
import { useDispatch, useSelector } from "react-redux";
import { getUser, resetState } from "../../Features/UserSlice";
import { Modal } from "reactstrap";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [faild, setFaild] = useState("");
  const [loading, setLoading] = useState(false);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);
  const username = useSelector((state) => state.users.user);
  const isAdmin = useSelector((state) => state.users.user?.isAdmin);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Navto = useNavigate();

  const handleSubmit = () => {
    const user1 = { password: password, user: user.toLowerCase() };
    setLoading(true);
    dispatch(getUser(user1));
  };
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        if (username && isAdmin && isSuccess) {
          setLoading(false);
          dispatch(resetState()); // Reset state before navigating
          Navto("/admin");
        } else if (username && !isAdmin && isSuccess) {
          setLoading(false);
          dispatch(resetState()); // Reset state before navigating
          Navto("/home");
        } else if (isError) {
          setLoading(false);
          setFaild("Invalid Username or Password !!");
          dispatch(resetState()); // Reset state after failure
        }
      }, 2000);
  
      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [loading, username, isAdmin, isSuccess, isError, Navto, dispatch]);
  
  useEffect(() => {
    dispatch(resetState()); // Clear any previous state on component load
  }, [dispatch]);
  
  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationLoginSchema),
  });

  return (
    <>
      <Modal isOpen={loading} className="loading-modal" centered>
        <br></br><br></br><br></br>
        <div className="text-center">
        <div class="orwellian-container">
            <div class="orwellian-loader">
              <div class="eye">
                <div class="pupil"></div>
                <div class="eyelid"></div>
              </div>
              <div class="spotlight"></div>
              <div class="text">SEARCH FOR THE USER</div>
              <div class="scan-lines"></div>
              <div class="tv-effect"></div>
            </div>
          </div>         
        </div>
        <br></br><br></br><br></br>
      </Modal>
      <form className="container-login">
        <div className="left-section-login ">
          <img src={loginLogo} alt="Signup Illustration" />
        </div>
        <div className="right-section-login ">
          <h2 className="signin">Sign in to your account</h2>
          <span className="error small">{errors.username?.message}</span>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {errors.username ? (
                  <i className="bi bi-person-fill icon-error"></i>
                ) : (
                  <i className="bi bi-person-fill"></i>
                )}
              </span>
            </div>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Username"
              {...register("username", {
                value: user,
                onChange: (e) => setUser(e.target.value),
              })}
            />
          </div>
          <span className="error small">{errors.password?.message}</span>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {errors.password ? (
                  <i className="bi bi-shield-lock-fill icon-error"></i>
                ) : (
                  <i className="bi bi-shield-lock-fill"></i>
                )}
              </span>
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="Password"
              {...register("password", {
                value: password,
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={
                    passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"
                  }
                  id="toggleIcon"
                ></i>
              </button>
            </div>
          </div>
          <button
            className="cssbuttons-io-button"
            onClick={submitForm(handleSubmit)}
          >
            Login
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
          <span className="error small">{faild}</span>
          <div className="create-account">
            <button className="tag-button" onClick={()=>Navto('/register')}>Create an account?</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
