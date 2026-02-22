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
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<ItemResponse> list() {
        return service.findAll(ItemType.INVENTORY);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> get(@PathVariable Long id) {
        return service.findById(id, ItemType.INVENTORY)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ItemResponse> create(@Valid @RequestBody ItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request, ItemType.INVENTORY));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> update(@PathVariable Long id, @Valid @RequestBody ItemRequest request) {
        return service.update(id, request, ItemType.INVENTORY)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id, ItemType.INVENTORY)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/move-to-shopping")
    public ResponseEntity<List<ItemResponse>> moveToShopping() {
        return ResponseEntity.ok(service.moveZeroQuantityToShopping());
    }
}
