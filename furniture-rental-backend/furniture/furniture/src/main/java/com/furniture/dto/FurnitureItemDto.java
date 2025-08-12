package com.furniture.dto;

import lombok.Data;

import com.furniture.entity.Category;

import lombok.AllArgsConstructor;


@Data
@AllArgsConstructor
public class FurnitureItemDto {
    private Long furnitureId; // <-- add this
    private String name;
    private Category category;
    private Double dailyRate;
    private Boolean availabilty;
    private String imageBase64; // For frontend image display
}