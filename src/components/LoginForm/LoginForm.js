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
      await axios.post(`${BACKEND_URL}/api/profiles/resetColumn`, {});
      navigate("/profile");
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="logging__container">
        <h1 className="logging__logo">Wonderly</h1>
        <h2 className="logging__slogan">Ready to start your next adventure?</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
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
        <div className="logging__link-wrap">
          <p className="logging__que">Don't have an account?</p>
          <Link to="/register" className="logging__link">
            <p className="logging__signup">Sign up</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
