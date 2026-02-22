package com.kitch.repository;

import com.kitch.entity.Item;
import com.kitch.entity.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByItemType(ItemType itemType);

    Optional<Item> findByIdAndItemType(Long id, ItemType itemType);

    List<Item> findByItemTypeAndQuantityLessThanEqual(ItemType itemType, int quantity);
}
