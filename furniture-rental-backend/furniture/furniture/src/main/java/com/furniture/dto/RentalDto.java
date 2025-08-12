package com.furniture.dto;

import java.time.LocalDate;

import com.furniture.entity.User;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentalDto {

	private Long rentalId;

	@NotBlank
    private LocalDate rentalDate;
	
	@NotBlank
    private LocalDate returnDate;
	
	@NotBlank
    private Double totalAmount;

	@NotBlank
    private User customer;
}
