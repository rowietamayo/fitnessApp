import { useContext, useEffect, useState } from "react";
import { Button, Card, CardFooter, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch("https://fitnessapp-api-ln8u.onrender.com/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registered Successfully") {
          setEmail("");
          setPassword("");

          Swal.fire({
            title: "Registration Successful",
            icon: "success",
            text: "Thank you for registering!",
            customClass: {
              confirmButton: "sweet-warning",
            },
          }).then(() => {
            navigate("/login");
          });
        } else if (data.error === "Email invalid") {
          Swal.fire({
            title: "Invalid Email Format",
            icon: "error",
            text: "Invalid email format.",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else if (data.error === "Password must be atleast 8 characters") {
          Swal.fire({
            title: "Password Invalid",
            icon: "error",
            text: "Password must be atleast 8 characters long.",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else {
          Swal.fire({
            title: "Something went wrong.",
            icon: "error",
            text: "Please try again later or contact us for assistance.",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        }
      });
  }

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return isLoggedIn ? (
    <Navigate to="/login" />
  ) : (
    <Form onSubmit={registerUser}>
      <h1 className="my-4 text-center">Register</h1>
      <div className="form-wrapper">
        <Card className="w-100">
          <Form.Group className="p-3">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mx-3 mb-4">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <CardFooter className="text-muted">
            <Button
              className="w-100"
              variant={isActive ? "primary" : "danger"}
              type="submit"
              id="regBtn"
              disabled={!isActive}
            >
              Please Enter your Registration details
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Form>
  );
}
