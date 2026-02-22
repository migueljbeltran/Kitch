package com.kitch.controller;

import com.kitch.dto.*;
import com.kitch.service.RecipeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @GetMapping
    public List<RecipeResponse> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponse> get(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RecipeResponse> create(@Valid @RequestBody RecipeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeResponse> update(@PathVariable Long id, @Valid @RequestBody RecipeNameRequest request) {
        return service.updateName(id, request.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    // --- Ingredients ---

    @PostMapping("/{id}/ingredients")
    public ResponseEntity<ItemResponse> addIngredient(@PathVariable Long id, @Valid @RequestBody ItemRequest request) {
        return service.addIngredient(id, request)
                .map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/ingredients/{iid}")
    public ResponseEntity<ItemResponse> updateIngredient(@PathVariable Long id, @PathVariable Long iid, @Valid @RequestBody ItemRequest request) {
        return service.updateIngredient(id, iid, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/ingredients/{iid}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Long id, @PathVariable Long iid) {
        return service.deleteIngredient(id, iid)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    // --- Steps ---

    @PostMapping("/{id}/steps")
    public ResponseEntity<RecipeResponse.StepResponse> addStep(@PathVariable Long id, @Valid @RequestBody StepRequest request) {
        return service.addStep(id, request.getInstruction())
                .map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/steps/{sid}")
    public ResponseEntity<RecipeResponse.StepResponse> updateStep(@PathVariable Long id, @PathVariable Long sid, @Valid @RequestBody StepRequest request) {
        return service.updateStep(id, sid, request.getInstruction())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/steps/{sid}")
    public ResponseEntity<Void> deleteStep(@PathVariable Long id, @PathVariable Long sid) {
        return service.deleteStep(id, sid)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
