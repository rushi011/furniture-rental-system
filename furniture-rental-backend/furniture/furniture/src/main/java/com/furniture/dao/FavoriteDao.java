package com.furniture.dao;

import com.furniture.entity.Favorite;
import com.furniture.entity.User;
import com.furniture.entity.FurnitureItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FavoriteDao extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);
    List<Favorite> findByFurnitureItem(FurnitureItem furnitureItem);
    boolean existsByUserAndFurnitureItem(User user, FurnitureItem furnitureItem);
    void deleteByUserAndFurnitureItem(User user, FurnitureItem furnitureItem);
}
