package com.furniture.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.furniture.dto.FurnitureItemDto;
import com.furniture.entity.FurnitureItem;
import com.furniture.exception.ResourceNotFoundException;
import com.furniture.service.FurnitureItemService;

@RestController
@RequestMapping("/furnitures")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FurnitureItemController {

	@Autowired
	private FurnitureItemService furnitureItemService;

//	@PostMapping("/add")
//	public ResponseEntity<?> addFurniture(@RequestBody FurnitureItem furnitureItem)
//	{
//		
//		return ResponseEntity.status(HttpStatus.CREATED).body(furnitureItemService.addFurniture());
//	}

	@PostMapping(value = "/addfurniture")
	public ResponseEntity<?> saveFurniturewithImage(@ModelAttribute FurnitureItemDto dto,
			@RequestPart MultipartFile imageFile) {
		try {
			furnitureItemService.saveFurniturewithImage(dto, imageFile);
			return new ResponseEntity<>("Furniture and image uploaded successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("Error uploading furniture and image", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getbycategory/{category}")
	public ResponseEntity<?> getByCategory(@PathVariable String category) {
		List<FurnitureItem> items = furnitureItemService.getByCategory(category);
		return ResponseEntity.status(HttpStatus.OK).body(items);

	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateFurniture(@PathVariable("id") Long id, @RequestBody FurnitureItemDto dto) {
		try {
			if (dto.getName() == null || dto.getCategory() == null
					|| dto.getDailyRate() <= 0) {
				return ResponseEntity.badRequest().body(Map.of("error", "Invalid furniture data"));
			}
			FurnitureItem updatedFurniture = furnitureItemService.updateFurniture(id, dto);
			return ResponseEntity.ok(updatedFurniture);
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(Map.of("error", "Furniture not found with id" + id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Failed to update furniture: " + e.getMessage()));
		}
	}

//	@PutMapping("/updateamt/{id}")
//	public ResponseEntity<?> updateAmount(@PathVariable Long id, @RequestBody FurnitureItemDto dto) {
//		try {
//			FurnitureItem item = furnitureItemService.updateFurnitureAmt(id, dto);
//			return ResponseEntity.ok(item);
//		} catch (ResourceNotFoundException e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
//		}
//
//	}

	@GetMapping("/getbyid/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {

		FurnitureItem item = furnitureItemService.getById(id);
		if (id != null) {
			return ResponseEntity.status(HttpStatus.OK).body(item);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Furniture not found with id " + id);

	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteFurnitureById(@PathVariable Long id) {
		boolean isDeleted = furnitureItemService.deleteFurniture(id);

		if (isDeleted) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Product deletd successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with id " + id);
		}
	}

	@GetMapping("/getallfurnitures")
	public ResponseEntity<?> getAll() {
		List<FurnitureItemDto> items = furnitureItemService.getAll();
		if (items != null) {
			return ResponseEntity.status(HttpStatus.OK).body(items);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Products not found ");
	}

}
