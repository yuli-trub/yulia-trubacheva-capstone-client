import { Link } from "react-router-dom";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <>
      <main className="homepage">
        <section className="homepage__about">
          <h2 className="homepage__subtitle">ABOUT US</h2>
          <p className="homepage__description">
            Welcome to Wonderly, the social network app designed to enhance your
            solo travel experience! Our app is all about creating meaningful
            connections with like-minded travelers worldwide, discovering new
            destinations, exploring local events, and making lifelong friends
            along the way.
          </p>

          <p className="homepage__description">
            At Wonderly, we believe that solo travel doesn't have to mean
            traveling alone. We're dedicated to creating a community of
            travelers who share similar interests and passions, and we're
            excited to be a part of your journey. So why travel solo when you
            can explore, connect, and make memories together with Wonderly?
          </p>
        </section>
        <div className="homepage__hero">
          <div className="homepage__catch">
            {/* <h1 className="homepage__logo">Wonderly</h1> */}
            <h3 className="homepage__slogan">
              Join us today and start your next adventure!
            </h3>
          </div>
          <div className="homepage__links">
            <Link to="/login" className="homepage__link">
              Sign in
            </Link>
            <Link to="/login" className="homepage__link">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
