import { Link } from "react-router-dom";
import "./NoAuthMessage.scss";

const NoAuthMessage = () => {
  return (
    <>
      <div className="auth">
        <h3 className="auth__warn">Not signed in</h3>
        <Link to="/login" className="auth__signin">
          <button className="auth__button">Sign in</button>
        </Link>
        <div className="auth__link-wrap">
          <p className="auth__que">Don't have an account?</p>
          <Link to="/register" className="auth__link">
            <p className="auth__signup">Sign up</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoAuthMessage;
