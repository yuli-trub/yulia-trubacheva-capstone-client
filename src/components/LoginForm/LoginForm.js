import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";

const LoginForm = ({ setIsLoggedIn, BACKEND_URL }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // When any input changes, update the correct field in state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please provide a username and a password");
      return;
    }

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/login`, {
        email: formData.email,
        password: formData.password,
      });

      sessionStorage.setItem("authToken", data.authToken);

      setIsLoggedIn(true);

      navigate("/profile");
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="login__container">
        <h1 className="login__logo">Wonderly</h1>
        <h2 className="login__slogan">Ready to start your next adventure?</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            {/* <label htmlFor="email" className="form__label">
              
            </label> */}
            <input
              className="form__input"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form__group">
            {/* <label htmlFor="password" className="form__label">
              Password
            </label> */}
            <input
              className="form__input"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {errorMessage && <p className="form__error">{errorMessage}</p>}
          <button className="form__btn">Sign in</button>
        </form>
        <div className="login__link-wrap">
          <p className="login__que">Don't have an account?</p>
          <Link to="/register" className="login__link">
            <p className="login__signup">Sign up</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
