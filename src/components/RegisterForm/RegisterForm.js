import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterForm.scss";

const RegisterForm = ({ setIsRegistered, BACKEND_URL }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    bio: "",
    location: null,
  });
  const [locations, setLocations] = useState(null);

  const navigate = useNavigate();

  //Get all locations
  const getLocations = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/locations`);
    setLocations(data);
  };

  useEffect(() => {
    try {
      getLocations();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "location") {
      setSelectedLocation(e.target.value);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.age ||
      !formData.location
    ) {
      setErrorMessage("You must fill in all the form fields");
      return;
    }

    if (formData.age < 18) {
      setErrorMessage("You must be at least 18 years old to register");
      return;
    }
    try {
      await axios.post(`${BACKEND_URL}/api/users/register`, {
        name: formData.name,
        email: formData.email,
        avatar_url: "https://source.boringavatars.com/beam/300/",
        password: formData.password,
        age: formData.age,
        bio: formData.bio,
        location_id: selectedLocation,
      });
      setIsRegistered(true);
      navigate("/login");
      await axios.post(`${BACKEND_URL}/api/profiles/resetColumn`, {});
    } catch (error) {
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
              placeholder="Name*"
              type="text"
              name="name"
              id="name"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form__group">
            <input
              className="form__input"
              placeholder="Email*"
              type="email"
              name="email"
              id="emailRegister"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form__group">
            <input
              className="form__input"
              placeholder="Password*"
              type="password"
              name="password"
              id="passwordRegister"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form__group">
            <input
              className="form__input"
              placeholder="Age*"
              type="age"
              name="age"
              id="age"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <select
            value={selectedLocation}
            onChange={handleChange}
            className="form__input form__input--select"
            name="location"
          >
            <option value="">Select a location</option>
            {locations &&
              locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city}
                </option>
              ))}
          </select>
          {errorMessage && <p className="form__error">{errorMessage}</p>}
          <button className="form__btn">Sign up</button>
        </form>
        <div className="logging__link-wrap">
          <p className="logging__que">Already have an account?</p>
          <Link to="/login" className="logging__link">
            <p className="logging__signup">Sign in</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
