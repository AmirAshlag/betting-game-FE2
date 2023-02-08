import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const Signup = ({ setShowLogin }) => {
   const [emptyError, setEmptyError] = useState(false);
   const [passwordError, setPasswordError] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState({
    userName: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  async function clickHandler() {
    setEmptyError(false)
    setPasswordError(false)
    console.log(Object.values(signUpInfo));
    if (!Object.values(signUpInfo).includes("")) {
      if ((signUpInfo.password === signUpInfo.repassword) && signUpInfo.password.length > 5) {
        try {
          console.log();
          const res =  await axios.post("http://localhost:8080/users/signup", signUpInfo);
          console.log(res)
          setShowLogin(true);
        } catch (e) {
          console.error(e);
        }
      } else{
        setPasswordError(true)
      }
    } else {
      setEmptyError(true)
    }
  }

  return (
    <div className="signup-body">
      <div className="signup">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Name"
              name="userName"
              onChange={(e) => {
                handleChange(e);
              }}
              value={signUpInfo.userName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
              value={signUpInfo.email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
              value={signUpInfo.password}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repeat Your Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="repassword"
              onChange={(e) => {
                handleChange(e);
              }}
              value={signUpInfo.repassword}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              clickHandler();
            }}
          >
            Submit
          </Button>
        </Form>
        <div
          className="switch-signup"
          onClick={() => {
            setShowLogin(true);
          }}
        >
          already have an account, login
        </div>
        {emptyError && (
          <div className="emptyError">Fill in all the required fields</div>
        )}
        {passwordError && (
          <div className="emptyError">
            Password doesn't match re-password or password to short
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
