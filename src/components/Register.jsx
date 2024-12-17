import  { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
function Register({ goToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    console.log("Registration data:", data);
    alert("Registration successful!");
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: "url(/wallpaperflare.com_wallpaper.jpg)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container d-flex align-items-center justify-content-center h-100">
        <Form
          className=" p-4 rounded"
          style={{ width: "300px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address"
                }
              })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </Form.Group>

          <Form.Group controlId="formBasicUsername" className="mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-danger">{errors.username.message}</p>}
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
                  message: "Password must be at least 3 characters long"
                },
                validate: (value) =>
                  /[A-Za-z]/.test(value) && /[0-9]/.test(value) || "Password must contain at least one letter and one number"
              })}
            />
            <Form.Check
              type="checkbox"
              label="Show Password"
              onChange={handleTogglePassword}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
          </Form.Group>

          <Button variant="success" type="submit" className="mt-4 w-100">
            Register
          </Button>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Button variant="primary" onClick={goToLogin} className="mt-2 w-50">
              Login
            </Button>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Register;
