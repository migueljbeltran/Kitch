package com.kitch.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Item> ingredients = new LinkedHashSet<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("stepOrder ASC")
    private Set<RecipeStep> steps = new LinkedHashSet<>();

    public Recipe() {}

    public Recipe(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Item> getIngredients() { return ingredients; }
    public void setIngredients(Set<Item> ingredients) { this.ingredients = ingredients; }

    public Set<RecipeStep> getSteps() { return steps; }
    public void setSteps(Set<RecipeStep> steps) { this.steps = steps; }
}
