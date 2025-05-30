import React, { useEffect, useState } from 'react';
import './App.css';

// Base API endpoint
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const PAGE_SIZE = 10;

// Component to render a single movie
function MovieItem({ movie }) {
  return (
    <li className="movie-item">
      <h3>{movie.title}</h3>
      <p>
        ({movie.year}) – Rating: <strong>{movie.rating}</strong>
      </p>
      <p>{movie.description}</p>
    </li>
  );
}

// Pagination controls
function Pagination({ page, pageCount, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button
        className="btn toggle-btn"
        onClick={onPrev}
        disabled={page <= 0}
      >
        Previous Page
      </button>
      <span className="page-info">
        Page {page + 1} of {pageCount}
      </span>
      <button
        className="btn toggle-btn"
        onClick={onNext}
        disabled={page >= pageCount - 1}
      >
        Next Page
      </button>
    </div>
  );
}

function App() {
  // ---- State ----
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [showMovies, setShowMovies] = useState(true);
  const [page, setPage] = useState(0);

  // ---- Constants ----
  const pageCount = Math.ceil(movies.length / PAGE_SIZE) || 1;

  // ---- Effects ----
  // Fetch the full movie list on mount
  useEffect(() => {
    fetch(`${API_URL}/movies/all`)
      .then(res => res.json())
      .then(setMovies)
      .catch(console.error);
  }, []);

  // ---- Handlers ----
  const fetchRandomMovie = () => {
    fetch(`${API_URL}/movies/random`)
      .then(res => res.json())
      .then(setRandomMovie)
      .catch(console.error);
  };

  const toggleMovies = () => setShowMovies(prev => !prev);
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 0));
  const handleNext = () => setPage(prev => Math.min(prev + 1, pageCount - 1));
  const clearRandom = () => setRandomMovie(null);

  // ---- Derived Data ----
  const start = page * PAGE_SIZE;
  const visibleMovies = movies.slice(start, start + PAGE_SIZE);

  // ---- Render ----
  return (
    <div className="container">
      <h1 className="title">🎬 Top Movies</h1>

      <div className="buttons">
        <button onClick={fetchRandomMovie} className="btn random-btn">
          Show Me A Random Movie
        </button>
        <button onClick={toggleMovies} className="btn toggle-btn">
          {showMovies ? 'Hide All Movies' : 'Show All Movies'}
        </button>
      </div>

      {randomMovie && (
        <div className="random-movie">
          {/* Close button to clear the random movie */}
          <button className="close-btn" onClick={clearRandom} aria-label="Close">
            ×
          </button>
          <h2>
            {randomMovie.title} <span>({randomMovie.year})</span>
          </h2>
          <p><strong>Rating:</strong> {randomMovie.rating}</p>
          <p>{randomMovie.description}</p>
        </div>
      )}

      {showMovies && (
        <>
          <ul className="movie-list">
            {visibleMovies.map((m, i) => (
              <MovieItem key={`${m.title}-${m.year}-${i}`} movie={m} />
            ))}
          </ul>

          <Pagination
            page={page}
            pageCount={pageCount}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </>
      )}
    </div>
  );
}

export default App;