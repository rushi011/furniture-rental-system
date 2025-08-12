package com.furniture.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.furniture.dao.FurnitureItemDao;
import com.furniture.dto.FurnitureItemDto;
import com.furniture.entity.FurnitureItem;
import com.furniture.exception.ResourceNotFoundException;

@Service
@Transactional
public class FurnitureItemServiceImpl implements FurnitureItemService {

	@Autowired
	private FurnitureItemDao furnitureItemDao;

	@Override
	public void saveFurniturewithImage(FurnitureItemDto dto, MultipartFile imageFile) throws IOException {

		byte[] imageBytes = imageFile.getBytes();

		FurnitureItem item = new FurnitureItem();
		item.setName(dto.getName());
		item.setCategory(dto.getCategory());
		item.setDailyRate(dto.getDailyRate());
		item.setAvailability(dto.getAvailabilty());
		item.setFurnitureImage(imageBytes);

		furnitureItemDao.save(item);
	}

	@Override
	public List<FurnitureItem> getByCategory(String category) {

		return furnitureItemDao.findByCategory_Name(category);
	}

	public FurnitureItem updateFurniture(Long id, FurnitureItemDto dto) throws ResourceNotFoundException {
		FurnitureItem existingFurniture = furnitureItemDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Furniture not found with id" + id));
		existingFurniture.setName(dto.getName());
		existingFurniture.setCategory(dto.getCategory());
		existingFurniture.setDailyRate(dto.getDailyRate());
		existingFurniture.setAvailability(dto.getAvailabilty());
		return furnitureItemDao.save(existingFurniture);
	}

	@Override
	public FurnitureItem getById(Long id) {

		return furnitureItemDao.findById(id).orElseThrow(() -> new RuntimeException("Furniture not found"));
	}

	@Override
	public boolean deleteFurniture(Long id) {

		if (furnitureItemDao.existsById(id)) {
			furnitureItemDao.deleteById(id);
			return true;
		}
		return false;
	}

	public List<FurnitureItem> getAllFurnitureItems() {

		return furnitureItemDao.findAll();
	}

	@Override
	public FurnitureItem updateFurnitureAmt(Long id, FurnitureItemDto dto) throws ResourceNotFoundException {
		FurnitureItem item = furnitureItemDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Furniture not available with id " + id));
		item.setDailyRate(dto.getDailyRate());

		return furnitureItemDao.save(item);
	}

	@Override
	public List<FurnitureItemDto> getAll() {
		List<FurnitureItem> items = furnitureItemDao.findAll();
		return items.stream().map(item -> {
			String imageBase64 = item.getFurnitureImage() != null
				? Base64.getEncoder().encodeToString(item.getFurnitureImage())
				: null;
			return new FurnitureItemDto(
				item.getFurnitureId(),
				item.getName(),
				item.getCategory(),
				item.getDailyRate(),
				item.getAvailability(),
				imageBase64
			);
		}).collect(Collectors.toList());
	}

}
