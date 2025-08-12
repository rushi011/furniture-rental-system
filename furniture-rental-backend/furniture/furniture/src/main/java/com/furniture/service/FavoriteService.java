package com.furniture.service;

import java.util.List;

import com.furniture.entity.Favorite;

public interface FavoriteService {
    Favorite addFavorite(Long userId, Long furnitureItemId);
    void removeFavorite(Long userId, Long furnitureItemId);
    List<Favorite> getFavoritesByUser(Long userId);
    boolean isFavorite(Long userId, Long furnitureItemId);
}
