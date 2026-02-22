package com.kitch.service;

import com.kitch.dto.*;
import com.kitch.entity.*;
import com.kitch.repository.ItemRepository;
import com.kitch.repository.RecipeRepository;
import com.kitch.repository.RecipeStepRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final ItemRepository itemRepository;
    private final RecipeStepRepository recipeStepRepository;

    public RecipeService(RecipeRepository recipeRepository, ItemRepository itemRepository, RecipeStepRepository recipeStepRepository) {
        this.recipeRepository = recipeRepository;
        this.itemRepository = itemRepository;
        this.recipeStepRepository = recipeStepRepository;
    }

    public List<RecipeResponse> findAll() {
        return recipeRepository.findAllWithDetails().stream()
                .map(RecipeResponse::from)
                .collect(Collectors.toList());
    }

    public Optional<RecipeResponse> findById(Long id) {
        return recipeRepository.findByIdWithDetails(id).map(RecipeResponse::from);
    }

    @Transactional
    public RecipeResponse create(RecipeRequest request) {
        Recipe recipe = new Recipe(request.getName());
        recipe = recipeRepository.save(recipe);

        if (request.getIngredients() != null) {
            for (ItemRequest ir : request.getIngredients()) {
                Item ingredient = new Item(ir.getProduct(), ir.getBrand(), ir.getCategory(), ir.getQuantity(), ir.getExpiry(), ItemType.INGREDIENT);
                ingredient.setRecipe(recipe);
                recipe.getIngredients().add(ingredient);
            }
        }

        if (request.getSteps() != null) {
            int order = 1;
            for (String instruction : request.getSteps()) {
                RecipeStep step = new RecipeStep(instruction, order++, recipe);
                recipe.getSteps().add(step);
            }
        }

        return RecipeResponse.from(recipeRepository.save(recipe));
    }

    public Optional<RecipeResponse> updateName(Long id, String name) {
        return recipeRepository.findById(id).map(recipe -> {
            recipe.setName(name);
            return RecipeResponse.from(recipeRepository.save(recipe));
        });
    }

    public boolean delete(Long id) {
        return recipeRepository.findById(id).map(recipe -> {
            recipeRepository.delete(recipe);
            return true;
        }).orElse(false);
    }

    // --- Ingredient sub-resource ---

    public Optional<ItemResponse> addIngredient(Long recipeId, ItemRequest request) {
        return recipeRepository.findById(recipeId).map(recipe -> {
            Item ingredient = new Item(request.getProduct(), request.getBrand(), request.getCategory(), request.getQuantity(), request.getExpiry(), ItemType.INGREDIENT);
            ingredient.setRecipe(recipe);
            recipe.getIngredients().add(ingredient);
            recipeRepository.save(recipe);
            return ItemResponse.from(ingredient);
        });
    }

    public Optional<ItemResponse> updateIngredient(Long recipeId, Long ingredientId, ItemRequest request) {
        return itemRepository.findById(ingredientId)
                .filter(i -> i.getItemType() == ItemType.INGREDIENT && i.getRecipe() != null && i.getRecipe().getId().equals(recipeId))
                .map(item -> {
                    item.setProduct(request.getProduct());
                    item.setBrand(request.getBrand());
                    item.setCategory(request.getCategory());
                    item.setQuantity(request.getQuantity());
                    item.setExpiry(request.getExpiry());
                    return ItemResponse.from(itemRepository.save(item));
                });
    }

    public boolean deleteIngredient(Long recipeId, Long ingredientId) {
        return recipeRepository.findById(recipeId).map(recipe -> {
            boolean removed = recipe.getIngredients().removeIf(
                    i -> i.getId().equals(ingredientId) && i.getItemType() == ItemType.INGREDIENT);
            if (removed) {
                recipeRepository.save(recipe);
            }
            return removed;
        }).orElse(false);
    }

    // --- Step sub-resource ---

    public Optional<RecipeResponse.StepResponse> addStep(Long recipeId, String instruction) {
        return recipeRepository.findById(recipeId).map(recipe -> {
            int maxOrder = recipe.getSteps().stream().mapToInt(RecipeStep::getStepOrder).max().orElse(0);
            RecipeStep step = new RecipeStep(instruction, maxOrder + 1, recipe);
            recipe.getSteps().add(step);
            recipeRepository.save(recipe);
            return RecipeResponse.StepResponse.from(step);
        });
    }

    public Optional<RecipeResponse.StepResponse> updateStep(Long recipeId, Long stepId, String instruction) {
        return recipeStepRepository.findById(stepId)
                .filter(s -> s.getRecipe().getId().equals(recipeId))
                .map(step -> {
                    step.setInstruction(instruction);
                    return RecipeResponse.StepResponse.from(recipeStepRepository.save(step));
                });
    }

    public boolean deleteStep(Long recipeId, Long stepId) {
        return recipeRepository.findById(recipeId).map(recipe -> {
            boolean removed = recipe.getSteps().removeIf(s -> s.getId().equals(stepId));
            if (removed) {
                recipeRepository.save(recipe);
            }
            return removed;
        }).orElse(false);
    }
}
