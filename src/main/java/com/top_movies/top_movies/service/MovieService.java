package com.top_movies.top_movies.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.top_movies.top_movies.model.Movie;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.InputStream;
import java.util.List;

@Service
public class MovieService {
    private List<Movie> movies;

    @PostConstruct
    public void loadMovies() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream is = getClass().getClassLoader().getResourceAsStream("movies.json");
            movies = objectMapper.readValue(is, new TypeReference<List<Movie>>() {});
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to load movies", e);
        }

    }

    public List<Movie> getMovies() {
        if (movies == null) {
            throw new IllegalStateException("Movies not loaded yet");
        }
        return movies;
    }

    public Movie getRandomMovie() {
        if (movies == null || movies.isEmpty()) {
            throw new IllegalStateException("Movies not loaded yet");
        }
        int randomIndex = (int) (Math.random() * movies.size());
        return movies.get(randomIndex);
    }
}
