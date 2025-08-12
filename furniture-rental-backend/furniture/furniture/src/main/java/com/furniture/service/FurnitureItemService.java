package com.furniture.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.furniture.dto.FurnitureItemDto;
import com.furniture.entity.FurnitureItem;
import com.furniture.exception.ResourceNotFoundException;

public interface FurnitureItemService {

	void saveFurniturewithImage(FurnitureItemDto dto, MultipartFile imageFile) throws IOException;

	List<FurnitureItem> getByCategory(String category);

	FurnitureItem updateFurniture(Long id, FurnitureItemDto dto) throws ResourceNotFoundException;

	FurnitureItem getById(Long id);

	boolean deleteFurniture(Long id);

	List<FurnitureItemDto> getAll();

	FurnitureItem updateFurnitureAmt(Long id, FurnitureItemDto dto) throws ResourceNotFoundException;

//	Object addFurniture();

}
