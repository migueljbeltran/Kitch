package com.kitch.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "recipe_steps")
public class RecipeStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String instruction;

    @Column(name = "step_order")
    private int stepOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    public RecipeStep() {}

    public RecipeStep(String instruction, int stepOrder, Recipe recipe) {
        this.instruction = instruction;
        this.stepOrder = stepOrder;
        this.recipe = recipe;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInstruction() { return instruction; }
    public void setInstruction(String instruction) { this.instruction = instruction; }

    public int getStepOrder() { return stepOrder; }
    public void setStepOrder(int stepOrder) { this.stepOrder = stepOrder; }

    public Recipe getRecipe() { return recipe; }
    public void setRecipe(Recipe recipe) { this.recipe = recipe; }
}
