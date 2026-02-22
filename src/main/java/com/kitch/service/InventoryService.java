package com.kitch.service;

import com.kitch.dto.ItemRequest;
import com.kitch.dto.ItemResponse;
import com.kitch.entity.Item;
import com.kitch.entity.ItemType;
import com.kitch.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    private final ItemRepository itemRepository;

    public InventoryService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<ItemResponse> findAll(ItemType type) {
        return itemRepository.findByItemType(type).stream()
                .map(ItemResponse::from)
                .collect(Collectors.toList());
    }

    public Optional<ItemResponse> findById(Long id, ItemType type) {
        return itemRepository.findByIdAndItemType(id, type)
                .map(ItemResponse::from);
    }

    public ItemResponse create(ItemRequest request, ItemType type) {
        Item item = new Item(
                request.getProduct(),
                request.getBrand(),
                request.getCategory(),
                request.getQuantity(),
                request.getExpiry(),
                type
        );
        return ItemResponse.from(itemRepository.save(item));
    }

    public Optional<ItemResponse> update(Long id, ItemRequest request, ItemType type) {
        return itemRepository.findByIdAndItemType(id, type).map(item -> {
            item.setProduct(request.getProduct());
            item.setBrand(request.getBrand());
            item.setCategory(request.getCategory());
            item.setQuantity(request.getQuantity());
            item.setExpiry(request.getExpiry());
            return ItemResponse.from(itemRepository.save(item));
        });
    }

    public boolean delete(Long id, ItemType type) {
        return itemRepository.findByIdAndItemType(id, type).map(item -> {
            itemRepository.delete(item);
            return true;
        }).orElse(false);
    }

    /**
     * Moves inventory items with quantity <= 0 to the shopping list.
     * Ported from the original InventoryService.moveZeroQtyToShopping().
     */
    @Transactional
    public List<ItemResponse> moveZeroQuantityToShopping() {
        List<Item> zeroItems = itemRepository.findByItemTypeAndQuantityLessThanEqual(ItemType.INVENTORY, 0);
        for (Item item : zeroItems) {
            item.setItemType(ItemType.SHOPPING);
            item.setQuantity(Math.max(item.getQuantity(), 1));
        }
        return itemRepository.saveAll(zeroItems).stream()
                .map(ItemResponse::from)
                .collect(Collectors.toList());
    }
}
