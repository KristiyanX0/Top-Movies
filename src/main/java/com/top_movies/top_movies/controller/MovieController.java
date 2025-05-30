package com.top_movies.top_movies.controller;

import com.top_movies.top_movies.model.Movie;
import com.top_movies.top_movies.service.MovieService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/random")
    public Movie getRandomMovie() {
        return movieService.getRandomMovie();
    }

    @GetMapping("/all")
    public List<Movie> getAllMovies() {
        return movieService.getMovies();
    }

    @GetMapping("/range/years")
    public List<Movie> getMovieBetween(Integer start, Integer end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Both 'start' and 'end' parameters are required.");
        }
        if (start > end) {
            throw new IllegalArgumentException("Invalid range: 'start' must be less than or equal to 'end'.");
        }
        return movieService.getMoviesBetween(start, end);
    }

    @GetMapping("/range/rating")
    public List<Movie> getRating(Integer minimum) {
        if (minimum == null) {
            minimum = 0; // Default minimum rating if not provided
        }
        return movieService.getRating(minimum);
    }
}
