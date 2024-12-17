import  { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
function Login({ goToRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    console.log("Login data:", data);
    alert("Login successful!");
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: "url(/wallpaperflare.com_wallpaper.jpg)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container d-flex align-items-center justify-content-center h-50 mt-5">
        <Form className="bg-red " onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password must be at least 3 characters long",
                },
              })}
            />
            <Form.Check
              type="checkbox"
              label="Show Password"
              onChange={handleTogglePassword}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Login
          </Button>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={goToRegister}
              style={{ padding: 0, textDecoration: "none" }}
              className="mb-1"
            >
              Register here
            </Button>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
