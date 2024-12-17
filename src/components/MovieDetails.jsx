import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from './Loader';
import "./Movie.css";
export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);  // إضافة للمفضلة
  const [rating, setRating] = useState(null);  // إضافة لتقييم الفيلم
  const [ageRating, setAgeRating] = useState("");  // إضافة للأعمار المناسبة
  const [runtime, setRuntime] = useState(null);  // إضافة لمدة الفيلم
  const [productionCountries, setProductionCountries] = useState([]);  // إضافة لدول الإنتاج
  const [languages, setLanguages] = useState([]);  // إضافة للغة
  const [genres, setGenres] = useState([]);  // إضافة للنوع
  const [classification, setClassification] = useState("");  // إضافة للتصنيف

  useEffect(() => {
    // Fetch movie details
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=e3aec301dcfe16183f727e2ff9c6dda5`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setGenres(data.genres);
        setProductionCountries(data.production_countries);
        setLanguages(data.spoken_languages);
        setRuntime(data.runtime);
        setRating(data.vote_average);  // تخصيص التقييم
        setAgeRating(data.adult ? "18+" : "All ages");  // تخصيص الأعمار المناسبة
        setClassification(data.popularity);  // التصنيف على حسب الشعبية (أو يمكن استخدام بيانات أخرى)
        setLoading(false);
      });

    // Fetch trailer
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e3aec301dcfe16183f727e2ff9c6dda5`
    )
      .then((res) => res.json())
      .then((data) => {
        const officialTrailer = data.results.find((video) => video.type === "Trailer");
        setTrailer(officialTrailer ? officialTrailer.key : null);
      });

    // Fetch cast
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e3aec301dcfe16183f727e2ff9c6dda5`
    )
      .then((res) => res.json())
      .then((data) => setCast(data.cast));

    // Fetch recommended movies
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=e3aec301dcfe16183f727e2ff9c6dda5`
    )
      .then((res) => res.json())
      .then((data) => setRecommendedMovies(data.results));
  }, [movieId]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite); // Toggle favorite state
  };

  if (loading) return <Loader />;

  return (
    <div className="container mt-5">
      <h1 className="text-center">{movie.title}</h1>
      <div className="row mt-4">
        <div className="col-md-4 text-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h3>Overview</h3>
          <p>{movie.overview || "No overview available."}</p>


          {/* New fields */}
          <div className="row mt-4">
            <div className="col-md-6">
            <h4>Genres</h4>
          <p>{genres.map(genre => genre.name).join(", ")}</p>
          <h4>Release Date</h4>
          <p>{movie.release_date}</p>
              <h4>Age Rating</h4>
              <p>{ageRating}</p>
              <h4>Runtime</h4>
              <p>{runtime} minutes</p>
            </div>
            <div className="col-md-6">
              <h4>Language</h4>
              <p>{languages.map(language => language.name).join(", ")}</p>
              <h4>Production Countries</h4>
              <p>{productionCountries.map(country => country.name).join(", ")}</p>
              <h4>Rating</h4>
              <p>{rating} / 10</p>
              <h4>Classification</h4>
              <p>{classification}</p>
            </div>
          </div>

          {/* Add to Favorites */}
          <button onClick={handleFavorite} className="btn genre-btn mt-3">
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      {trailer && (
        <div className="mt-4">
          <h4>Trailer</h4>
          <iframe
            width="900"
            height="400" // أكبر ارتفاع للتريلر ليأخذ عرض الصفحة بالكامل
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="mt-4">
        <h4>Cast</h4>
        <div className="row">
          {cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="col-6 col-md-3 text-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="img-fluid rounded-circle mb-2"
                style={{ width: '80px', height: '80px' }}
              />
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>

      {recommendedMovies.length > 0 && (
        <div className="mt-4">
          <h4>Recommended Movies</h4>
          <div className="row">
            {recommendedMovies.slice(0, 6).map((movie) => (
              <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <div className="card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
