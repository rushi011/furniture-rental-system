package com.furniture.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "furniture_items")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FurnitureItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long furnitureId;
		@Column(length = 50)
		private String name;
		private Double dailyRate;
		private Boolean availability;

		@ManyToOne
		private Category category;

		@Lob
		@Column(name = "furniture_image", columnDefinition = "LONGBLOB")
		private byte[] furnitureImage;
}
