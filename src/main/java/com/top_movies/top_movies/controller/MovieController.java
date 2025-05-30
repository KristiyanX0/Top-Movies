package com.top_movies.top_movies.controller;

import com.top_movies.top_movies.service.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/random")
    public String getRandomMovie() {
        return movieService.getRandomMovie().toString();
    }

    public String getAllMovies() {
        return movieService.getMovies().toString();
    }
}
