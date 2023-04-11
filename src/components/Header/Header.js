import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <header className="header">
        <Link to="/" className="header__link">
          <h1 className="header__logo">Wonderly</h1>
        </Link>
      </header>
    </>
  );
};

export default Header;
