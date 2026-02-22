package com.kitch.dto;

import com.kitch.entity.Item;

public class ItemResponse {

    private Long id;
    private String product;
    private String brand;
    private String category;
    private int quantity;
    private String expiry;

    public ItemResponse() {}

    public static ItemResponse from(Item item) {
        ItemResponse r = new ItemResponse();
        r.id = item.getId();
        r.product = item.getProduct();
        r.brand = item.getBrand();
        r.category = item.getCategory();
        r.quantity = item.getQuantity();
        r.expiry = item.getExpiry();
        return r;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProduct() { return product; }
    public void setProduct(String product) { this.product = product; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getExpiry() { return expiry; }
    public void setExpiry(String expiry) { this.expiry = expiry; }
}
