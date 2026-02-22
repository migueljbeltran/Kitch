package com.kitch.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ItemRequest {

    @NotBlank
    @Size(max = 255)
    private String product;
    @Size(max = 255)
    private String brand;
    @Size(max = 255)
    private String category;
    private int quantity;
    @Size(max = 255)
    private String expiry;

    public ItemRequest() {}

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
