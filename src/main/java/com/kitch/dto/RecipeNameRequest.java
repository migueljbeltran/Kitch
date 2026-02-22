package com.kitch.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RecipeNameRequest {

    @NotBlank
    @Size(max = 255)
    private String name;

    public RecipeNameRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
