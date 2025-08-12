package com.furniture.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.furniture.entity.FurnitureItem;

public interface FurnitureItemDao extends JpaRepository<FurnitureItem, Long> {

	List<FurnitureItem> findByCategory_Name(String name);

}
