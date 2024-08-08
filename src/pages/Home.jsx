import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Home() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Row>
      <Col className="my-4 text-center">
        <div className="home-wrapper">
          <h1>Welcome to Fitness Tracker App</h1>
          <p>
            We’re excited to have you join our community dedicated to health and
            wellness. With our app, you can easily track your workouts, monitor
            your nutrition, and set fitness goals that suit your lifestyle.
            Whether you’re a seasoned athlete or just starting your fitness
            journey, our user-friendly interface and personalized features will
            help you stay motivated and accountable. Get ready to take your
            fitness to the next level and embrace a healthier, stronger you!
            Let’s get started on this journey together!
          </p>
          {isLoggedIn ? (
            <Link className="btn btn-primary" to={"/workouts"}>
              Set your workouts
            </Link>
          ) : (
            <Link className="btn btn-primary" to={"/login"}>
              Login to start
            </Link>
          )}
        </div>
      </Col>
    </Row>
  );
}
