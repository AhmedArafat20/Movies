import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Movie from "./components/Movie";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import Login from "./components/Login"; 
import Register from "./components/Register";
import Favorites from "./components/Favorites";  
import Footer from "./components/Footer"; 
import "./index.css";
import "./App.css";

export default function App() {
  const [favoriteMovies, setFavoriteMovies] = useState([]); // حفظ الأفلام المفضلة
  const [currentPage, setCurrentPage] = useState("login");

  const updateFavoriteMovies = (movie) => {
    // تحقق إذا كان الفيلم موجودًا في المفضلة بالفعل
    if (favoriteMovies.some(fav => fav.id === movie.id)) {
      // إذا كان موجودًا، قم بإزالته
      setFavoriteMovies(favoriteMovies.filter(fav => fav.id !== movie.id));
    } else {
      // إذا لم يكن موجودًا، قم بإضافته
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  return (
    <Router>
      <div>
        <Navbar favoriteCount={favoriteMovies.length} /> {/* تحديث عدد الأفلام المفضلة */}
        <Routes>
          <Route
            path="/"
            element={<Movie updateFavoriteMovies={updateFavoriteMovies} />}
          />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/login" element={<Login goToRegister={() => setCurrentPage("register")} />} />
          <Route path="/register" element={<Register goToLogin={() => setCurrentPage("login")} />} />
          <Route path="/" element={<Movie />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
