package com.furniture.service;

import com.furniture.dao.FavoriteDao;
import com.furniture.dao.FurnitureItemDao;
import com.furniture.dao.UserDao;
import com.furniture.entity.Favorite;
import com.furniture.entity.FurnitureItem;
import com.furniture.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteServiceImpl implements FavoriteService {
    private final FavoriteDao favoriteDao;
    private final UserDao userDao;
    private final FurnitureItemDao furnitureItemDao;

    @Override
    public Favorite addFavorite(Long userId, Long furnitureItemId) {
        User user = userDao.findById(userId).orElseThrow();
        FurnitureItem item = furnitureItemDao.findById(furnitureItemId).orElseThrow();
        if (favoriteDao.existsByUserAndFurnitureItem(user, item)) {
            throw new IllegalStateException("Already favorited");
        }
        Favorite favorite = Favorite.builder()
                .user(user)
                .furnitureItem(item)
                .createdAt(LocalDateTime.now())
                .build();
        return favoriteDao.save(favorite);
    }

    @Override
    public void removeFavorite(Long userId, Long furnitureItemId) {
        User user = userDao.findById(userId).orElseThrow();
        FurnitureItem item = furnitureItemDao.findById(furnitureItemId).orElseThrow();
        favoriteDao.deleteByUserAndFurnitureItem(user, item);
    }

    @Override
    public List<Favorite> getFavoritesByUser(Long userId) {
        User user = userDao.findById(userId).orElseThrow();
        return favoriteDao.findByUser(user);
    }

    @Override
    public boolean isFavorite(Long userId, Long furnitureItemId) {
        User user = userDao.findById(userId).orElseThrow();
        FurnitureItem item = furnitureItemDao.findById(furnitureItemId).orElseThrow();
        return favoriteDao.existsByUserAndFurnitureItem(user, item);
    }
}
