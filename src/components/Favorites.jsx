import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "./Movie.css";
export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // استرجاع الأفلام المفضلة عند تحميل الصفحة
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Favorites</h1>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
              <div className="card movie-card">
                <img
                  className="card-img-top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <button
                  className="favorite-btn"
                  onClick={() => handleRemoveFromFavorites(movie.id)}
                >
                  <FaHeart style={{ color: "red" }} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center">No Fav Movies</h4>
        )}
      </div>
      <div className="text-center mt-4">
        <Link to="/" className="btn home-btn">Back To Home</Link>
      </div>
    </div>
  );
}
