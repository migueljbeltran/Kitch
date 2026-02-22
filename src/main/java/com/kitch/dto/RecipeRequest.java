package com.kitch.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public class RecipeRequest {

    @NotBlank
    @Size(max = 255)
    private String name;
    private List<ItemRequest> ingredients;
    private List<String> steps;

    public RecipeRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<ItemRequest> getIngredients() { return ingredients; }
    public void setIngredients(List<ItemRequest> ingredients) { this.ingredients = ingredients; }

    public List<String> getSteps() { return steps; }
    public void setSteps(List<String> steps) { this.steps = steps; }
}
