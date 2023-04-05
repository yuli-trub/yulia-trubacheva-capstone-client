import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setIsRegistered, BACKEND_URL }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    bio: "",
  });

  const navigate = useNavigate();

  // When any input changes, update the correct field in state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      setErrorMessage("You must fill in all the form fields");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/users/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        bio: formData.bio,
      });

      setIsRegistered(true);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="emailRegister">Email</label>
          <input
            type="email"
            name="email"
            id="emailRegister"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="passwordRegister">Password</label>
          <input
            type="password"
            name="password"
            id="passwordRegister"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="age">age</label>
          <input
            type="age"
            name="age"
            id="age"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="bio">bio</label>
          <input
            type="bio"
            name="bio"
            id="bio"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button>Signup</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
};

export default RegisterForm;
