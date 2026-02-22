package com.kitch.controller;

import com.kitch.dto.ItemRequest;
import com.kitch.dto.ItemResponse;
import com.kitch.entity.ItemType;
import com.kitch.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopping")
public class ShoppingController {

    private final InventoryService service;

    public ShoppingController(InventoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<ItemResponse> list() {
        return service.findAll(ItemType.SHOPPING);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> get(@PathVariable Long id) {
        return service.findById(id, ItemType.SHOPPING)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ItemResponse> create(@Valid @RequestBody ItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request, ItemType.SHOPPING));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> update(@PathVariable Long id, @Valid @RequestBody ItemRequest request) {
        return service.update(id, request, ItemType.SHOPPING)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id, ItemType.SHOPPING)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
