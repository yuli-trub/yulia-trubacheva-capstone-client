import { Link } from "react-router-dom";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <>
      <main className="homepage">
        <div className="homepage__hero">
          <div className="homepage__links">
            <Link to="/login" className="homepage__link">
              Sign in
            </Link>
            <Link to="/login" className="homepage__link">
              Sign up
            </Link>
          </div>
        </div>
        <section className="homepage__about">
          <p className="homepage__description"></p>
          <p className="homepage__description"></p>
          <p className="homepage__description"></p>
        </section>
      </main>
    </>
  );
};

export default HomePage;
