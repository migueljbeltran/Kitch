package com.kitch.repository;

import com.kitch.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query("SELECT DISTINCT r FROM Recipe r LEFT JOIN FETCH r.ingredients LEFT JOIN FETCH r.steps")
    List<Recipe> findAllWithDetails();

    @Query("SELECT r FROM Recipe r LEFT JOIN FETCH r.ingredients LEFT JOIN FETCH r.steps WHERE r.id = :id")
    Optional<Recipe> findByIdWithDetails(Long id);
}
