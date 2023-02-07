import "/Users/amirashlag/Betting-Game-project-FE/my-app/src/pages/LoggedOut/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = ({ setShowLogin }) => {
  return (
    <div className="login">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="switch-signup" onClick={()=>{setShowLogin(false)}}>dont have an account, sign up</div>
    </div>
  );
};

export default Login
