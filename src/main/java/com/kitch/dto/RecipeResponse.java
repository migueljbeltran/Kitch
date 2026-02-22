package com.kitch.dto;

import com.kitch.entity.Recipe;
import com.kitch.entity.RecipeStep;

import java.util.List;
import java.util.stream.Collectors;

public class RecipeResponse {

    private Long id;
    private String name;
    private List<ItemResponse> ingredients;
    private List<StepResponse> steps;

    public static RecipeResponse from(Recipe recipe) {
        RecipeResponse r = new RecipeResponse();
        r.id = recipe.getId();
        r.name = recipe.getName();
        r.ingredients = recipe.getIngredients().stream()
                .map(ItemResponse::from)
                .collect(Collectors.toList());
        r.steps = recipe.getSteps().stream()
                .map(StepResponse::from)
                .collect(Collectors.toList());
        return r;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<ItemResponse> getIngredients() { return ingredients; }
    public void setIngredients(List<ItemResponse> ingredients) { this.ingredients = ingredients; }

    public List<StepResponse> getSteps() { return steps; }
    public void setSteps(List<StepResponse> steps) { this.steps = steps; }

    public static class StepResponse {
        private Long id;
        private String instruction;
        private int stepOrder;

        public static StepResponse from(RecipeStep step) {
            StepResponse s = new StepResponse();
            s.id = step.getId();
            s.instruction = step.getInstruction();
            s.stepOrder = step.getStepOrder();
            return s;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getInstruction() { return instruction; }
        public void setInstruction(String instruction) { this.instruction = instruction; }

        public int getStepOrder() { return stepOrder; }
        public void setStepOrder(int stepOrder) { this.stepOrder = stepOrder; }
    }
}
