import { useState } from "react";
import { Link } from "react-router-dom"; 
import logo from "../assets/55555.jpg"; 

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-red">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo} 
            alt="Logo"
            className="d-inline-block align-middle"
            style={{ width: "40px", height: "40px", marginRight: "15px" }} 
          />
          <span>Movies</span> 
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {/* تم تعديل الرابط هنا ليأخذ المستخدم مباشرة إلى صفحة الفيفوريت */}
            <li className="nav-item">
              <Link className="nav-link" to="/Favorites">
                Favorites
              </Link>
            </li>
            <li className="nav-item btn-primary">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
