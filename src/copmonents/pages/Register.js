import React, { useState, useEffect } from "react";
import "../css/Register.css";
import register1 from "../assets/register.png";
import { useNavigate } from "react-router-dom";
import ValidationRegisterSchema from "../../validations/RegisterValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../../Features/UserSlice";
import male from "../assets/male.png";
import female from "../assets/female.png";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [isp, setisp] = useState("");
  const [timezone, settimezone] = useState("");
  const [country_code, setcountry_code] = useState("");
  const [gender, setGender] = useState("");
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const [message,setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isError = useSelector((state) => state.users.isError);
  const msg = useSelector((state) => state.users.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  const toggleCPasswordVisibility = () => {
    setCPasswordVisible(!cpasswordVisible);
  };

  const handleSubmit = () => {
    const user = {
      user: name.toLocaleLowerCase(),
      password: password,
      email: email,
      gender:gender,
      imgUrl: imgUrl,
      country: country,
      city: city,
      isp: isp,
      timezone: timezone,
      country_code: country_code,
    };
    dispatch(addUser(user));
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage("User added successfully.");
      navigate("/login");
    } else if (isError) {
      if (msg === "User already exists.") {
        setMessage("User already exists.");
      } else {
        setMessage("Email already exists.");
      }
      setShowModal(true);
    }
  }, [isSuccess, isError, msg, navigate]);

  const fetchIPDetails = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setcountry(data.country_name);
      setcity(data.city);
      setisp(data.org);
      settimezone(data.timezone);
      setcountry_code(data.country_code);
    } catch (error) {
      console.error("Failed to fetch IP details:", error);
    }
  };

  useEffect(() => {
    fetchIPDetails();
  }, []);

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationRegisterSchema),
  });

  useEffect(() => {
    if (errors.checkbox) {
      setCheckboxError(errors.checkbox.message);
      setShowModal(true);
    } else {
      setCheckboxError("");
    }
  }, [errors]);

  return (
    <form className="container-register">
      <div className="left-section">
        <h2 className="signip">Sign up for a new account</h2>
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
            className="form-control"
            placeholder="Username"
            {...register("username", {
              value: name,
              onChange: (e) => setname(e.target.value),
            })}
            />
        </div>
        <span className="error small">{errors.ProfileUrl?.message}</span>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="bi bi-image-fill"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Profile Image Url"
            {...register("ProfileUrl", {
              value: imgUrl,
              onChange: (e) => setImgUrl(e.target.value),
            })}
            />
        </div>
        <span className="error small">{errors.email?.message}</span>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              {errors.email ? (
                <i className="bi bi-envelope-fill icon-error"></i>
              ) : (
                <i className="bi bi-envelope-fill"></i>
              )}
            </span>
          </div>
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            {...register("email", {
              value: email,
              onChange: (e) => setemail(e.target.value),
            })}
            />
        </div>
        <span className="error small">{errors.gender?.message}</span>
        <div className="input-group">
      <div className="radio-input">
        <label>
          <input
            type="radio"
            value="Male"
            {...register("gender", {
              onChange: (e) => setGender(e.target.value),
            })}
            />
          <img className="rounded-circle" src={male} alt="male" height="18px" />
          &nbsp;&nbsp;Male
        </label>
        <label>
          <input
            type="radio"
            value="Female"
            {...register("gender", {
              onChange: (e) => setGender(e.target.value),
            })}
            />
          <img className="rounded-circle" src={female} alt="female" height="18px" />
          &nbsp;&nbsp;Female
        </label>
        <span className="selection"></span>
      </div>
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
            className="form-control"
            placeholder="Password"
            {...register("password", {
              value: password,
              onChange: (e) => setpassword(e.target.value),
            })}
            />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={togglePasswordVisibility}
              >
              <i className={passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"}></i>
            </button>
          </div>
        </div>
        <span className="error small">{errors.conPassword?.message}</span>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              {errors.conPassword ? (
                <i className="bi bi-shield-lock-fill icon-error"></i>
              ) : (
                <i className="bi bi-shield-lock-fill"></i>
              )}
            </span>
          </div>
          <input
            type={cpasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="Repeat your password"
            {...register("conPassword")}
            />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={toggleCPasswordVisibility}
              >
              <i className={cpasswordVisible ? "bi bi-eye" : "bi bi-eye-slash"}></i>
            </button>
          </div>
        </div>
        <label>
          <input type="checkbox" className="mr-2" {...register("checkbox")} /> I agree to all terms of service
        </label>
        <br />
        <br />
        <button className="cssbuttons-io-button" onClick={submitForm(handleSubmit)}>
          Register
          <div className="icon">
            <svg height="24" width="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
                ></path>
            </svg>
          </div>
        </button>
        <div className="create-account">
        <button className="tag-button" onClick={() => navigate("/login")}>I am already a member</button>
        </div>
      </div>
      <div className="right-section">
        <img src={register1} alt="Signup Illustration" />
      </div>
      {showModal && message !== '' ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/8279/8279643.png" alt="Notification Icon" />
              </div>
              <div>
                <div className="modal-title">Notification !!</div>
                <div className="modal-subtitle">
                  {(message === 'User already exists.') || (message === 'Email already exists.') ? 'Please try again' : ''}
                </div>
              </div>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <button
              className="modal-close-button"
              onClick={() => setShowModal(false)} 
              >
              Close
            </button>
          </div>
        </div>
      ) : null}
      {showModal && checkboxError ?
      (<div>
    <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-icon">
                    <img src="https://thumbs.dreamstime.com/b/star-icon-vector-star-icon-eps-star-icon-jpg-star-icon-picture-star-icon-app-star-icon-web-star-icon-art-star-icon-star-color-143112858.jpg" alt="Terms Icon" />
                </div>
                <div>
                    <div className="modal-title">Terms of Service</div>
                    <div className="modal-subtitle">Last updated February 11, 2024</div>
                </div>
            </div>
            <div className="modal-body">
                <p>Welcome to Work Management System. By creating an account and using our platform, you agree to comply with and be bound by the following terms and conditions.</p>
                
                <h5>1. Acceptance of Terms</h5>
                <p>By creating an account on this platform, you agree to these Terms of Service. If you do not agree with these terms, you may not access or use this system.</p>
                
                <h5>2. Purpose of the System</h5>
                <p>This platform is designed to manage and track tasks assigned to staff members. The system enables administrators to assign tasks, and staff members are required to complete these tasks within the designated timelines.</p>
                
                <h5>3. User Roles and Responsibilities</h5>
                <p><strong>Administrators</strong> have the authority to:
                    <ul>
                        <li>Create and assign tasks to staff members.</li>
                        <li>Monitor the status of tasks.</li>
                        <li>Manage user accounts within the system.</li>
                    </ul>
                </p>
                <p><strong>Staff Members</strong> are responsible for:
                    <ul>
                        <li>Completing the tasks assigned to them by administrators.</li>
                        <li>Updating the task status to reflect progress or completion.</li>
                    </ul>
                </p>
                
                <h5>4. User Conduct</h5>
                <p>All users are expected to use the system responsibly. Prohibited behaviors include, but are not limited to:</p>
                <ul>
                    <li>Misrepresenting task completion status.</li>
                    <li>Sharing login credentials with unauthorized persons.</li>
                    <li>Misusing the system to disrupt operations or alter data.</li>
                </ul>
                
                <h5>5. Privacy and Data Collection</h5>
                <p>We collect and store certain personal information, including usernames, email addresses, and task performance data. This data is used solely to manage task assignments and track progress.</p>
                
                <h5>6. Accountability and Liability</h5>
                <p>Staff members are accountable for completing assigned tasks by the specified deadlines. Failure to do so may result in administrative actions deemed necessary by your employer.</p>
                
                <h5>7. Modifications to Terms</h5>
                <p>We reserve the right to update these Terms of Service periodically to reflect policy changes or to address new features. All updates will be posted within the system, and continued use of the platform implies acceptance of the revised terms.</p>
                
                <h5>8. Termination of Access</h5>
                <p>Failure to comply with these Terms of Service may result in suspension or termination of your account.</p>
                
                <p>By clicking "Register" and creating an account, you acknowledge that you have read, understood, and agree to these Terms of Service.</p>
            </div>
            <button
                className="modal-close-button"
                onClick={() => setShowModal(false)} 
            >
                Close
            </button>
        </div>
    </div>
      </div>):null}
    </form>
  );
};

export default Register;
