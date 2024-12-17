import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Movie.css";

export default function Movie() {
  const [movieList, setMovieList] = useState([]); // قائمة الأفلام
  const [genreList, setGenreList] = useState([]); // قائمة التصنيفات
  const [currentIndex, setCurrentIndex] = useState(0); // مؤشر البوستر
  const [favorites, setFavorites] = useState([]); // قائمة المفضلة
  const [searchQuery, setSearchQuery] = useState(""); // استعلام البحث
  const [selectedGenre, setSelectedGenre] = useState(""); // التصنيف المحدد
  const [page, setPage] = useState(1); // الصفحة الحالية لتحميل المزيد من الأفلام
  const [loading, setLoading] = useState(false); // حالة تحميل الأفلام

  // دالة جلب الأفلام مع تصفية البحث والتصنيف
  const getMovies = (genre = "", query = "", page = 1) => {
    setLoading(true); // تفعيل حالة التحميل
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=e3aec301dcfe16183f727e2ff9c6dda5&page=${page}`;
    
    // إذا كان هناك استعلام بحث
    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=e3aec301dcfe16183f727e2ff9c6dda5&page=${page}&query=${query}`;
    }

    // إذا كان هناك تصنيف
    if (genre && !query) {
      url += `&with_genres=${genre}`;
    }

    // جلب الأفلام حسب التصنيف Top Rated و Series
    if (genre === "top-rated") {
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=e3aec301dcfe16183f727e2ff9c6dda5&page=${page}`;
    }
    if (genre === "series") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=e3aec301dcfe16183f727e2ff9c6dda5&page=${page}&with_networks=213`; // شبكة الـ TV series
    }

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setMovieList((prevMovies) => (page === 1 ? json.results : [...prevMovies, ...json.results])); // إضافة الأفلام الجديدة للقائمة أو مسح القائمة في حالة البحث
        setLoading(false); // إيقاف حالة التحميل
      });
  };

  // دالة جلب التصنيفات
  const getGenres = () => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=e3aec301dcfe16183f727e2ff9c6dda5"
    )
      .then((res) => res.json())
      .then((json) => setGenreList(json.genres));
  };

  useEffect(() => {
    getMovies(selectedGenre, searchQuery, page); // تحميل الأفلام عند تغيير التصنيف أو البحث أو الصفحة
    getGenres();

    // استرجاع المفضلة من LocalStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, [selectedGenre, searchQuery, page]); // التحديث عند تغيير التصنيف أو البحث أو الصفحة

  useEffect(() => {
    // تغيير البوستر الرئيسي كل 3 ثوانٍ
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movieList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movieList]);

  const handleAddToFavorites = (movie) => {
    const updatedFavorites = favorites.find((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1); // زيادة الصفحة عند الضغط على زر Load More
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setMovieList([]); // مسح قائمة الأفلام القديمة عند البحث
    setPage(1); // إعادة تعيين الصفحة عند البحث
    getMovies(selectedGenre, searchQuery, 1); // تحميل الأفلام الخاصة بالبحث
  };

  return (
    <div className="container-fluid p-0">
      {/* البحث */}
      <div className="text-center my-3">
        <form
          onSubmit={handleSearchSubmit} // تنفيذ البحث عند تقديم النموذج
          className="d-flex justify-content-center mb-3"
        >
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // تحديث الاستعلام عند الكتابة
            onKeyDown={(e) => {
              if (e.key === "Enter") { // تفعيل البحث عند الضغط على Enter
                handleSearchSubmit(e);
              }
            }}
          />
          <button type="submit" className="btn search-btn ms-2">
            Search
          </button>
        </form>

        {/* زر التصنيفات مع Collapse */}
        <div className="text-center">
          <button
            className="btn genre-btn mb-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#genresCollapse"
            aria-expanded="false"
            aria-controls="genresCollapse"
          >
            Genres
          </button>
          <div className="collapse" id="genresCollapse">
            <div className="d-flex flex-wrap justify-content-center">
              <button
                className="btn genre-btn m-1"
                onClick={() => {
                  setSelectedGenre(""); // مسح التصنيف عند اختيار "الكل"
                  setMovieList([]); // مسح قائمة الأفلام القديمة
                  setPage(1); // إعادة تعيين الصفحة
                  getMovies(""); // جلب جميع الأفلام
                }}
              >
                All
              </button>
              {genreList.map((genre) => (
                <button
                  key={genre.id}
                  className="btn genre-btn m-1"
                  onClick={() => {
                    setSelectedGenre(genre.id); // تعيين التصنيف المحدد
                    setMovieList([]); // مسح قائمة الأفلام القديمة
                    setPage(1); // إعادة تعيين الصفحة
                    getMovies(genre.id); // جلب الأفلام حسب التصنيف
                  }}
                >
                  {genre.name}
                </button>
              ))}
              <button
                className="btn genre-btn m-1"
                onClick={() => {
                  setSelectedGenre("top-rated"); // تصنيف الأفلام الأعلى تقييمًا
                  setMovieList([]); // مسح قائمة الأفلام القديمة
                  setPage(1); // إعادة تعيين الصفحة
                  getMovies("top-rated"); // جلب الأفلام الأعلى تقييمًا
                }}
              >
                Top Rated
              </button>
              <button
                className="btn genre-btn m-1"
                onClick={() => {
                  setSelectedGenre("series"); // تصنيف الأفلام السلسلية
                  setMovieList([]); // مسح قائمة الأفلام القديمة
                  setPage(1); // إعادة تعيين الصفحة
                  getMovies("series"); // جلب الأفلام السلسلية
                }}
              >
                Series
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* البوستر الرئيسي */}
      {movieList.length > 0 && (
        <div
          className="random-movie position-relative text-white text-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieList[currentIndex].backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "70vh",
            transition: "background-image 1s ease-in-out, opacity 1s ease-in-out",
            opacity: 1,
          }}
        >
          <div className="overlay position-absolute top-0 start-0 w-100 h-100" />
          <div className="content position-absolute top-50 start-50 translate-middle text-shadow">
            <h1 className="fw-bold">{movieList[currentIndex].title}</h1>
            <p>{movieList[currentIndex].overview}</p>
          </div>
        </div>
      )}

      {/* قائمة الأفلام */}
      <div className="row mt-3 px-3">
        {movieList.map((movie) => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
            <Link to={`/movie/${movie.id}`} className="card-link">
              <div className="card movie-card">
                <img
                  className="card-img-top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <button
                  className="favorite-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToFavorites(movie);
                  }}
                >
                  {favorites.find((fav) => fav.id === movie.id) ? (
                    <FaHeart style={{ color: "red" }} />
                  ) : (
                    <FaRegHeart style={{ color: "white" }} />
                  )}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* زر Load More */}
      {!loading && (
        <div className="text-center mb-3">
          <button className="btn genre-btn" onClick={loadMoreMovies}>
            Load More
          </button>
        </div>
      )}
      {loading && (
        <div className="text-center mb-3">
          <button className="btn btn-secondary" disabled>
            Loading...
          </button>
        </div>
      )}
    </div>
  );
}
