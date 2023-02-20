import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext2 } from "../../Context/UserContext/UserContext";

const Login = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const { setCurrentUser } = useContext(UserContext2);

  async function clickHandler() {
    setError(false);
    const login = { email: email, password: password };
    if (email && password) {
      try {
        const res = await axios.post(
          "http://localhost:8080/users/login",
          login,
          { withCredentials: true }
        );
        if (res.status == 200) {
          navigate('/')
        }
        console.log(res.data);
        setCurrentUser(res.data)
        setEmail("");
        setPassword("");
      } catch (e) {
        console.error(e);
        setError(true);
      }
    } else {
      setError(true);
    }
  }
  return (
    <div className="login-body">
      <div className="login">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
            setShowLogin(false);
          }}
        >
          dont have an account, sign up
        </div>
        {error && <div className="emptyError">login data invalid</div>}
      </div>
    </div>
  );
};

export default Login;
