package com.furniture.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PaymentRequestDto {
	@NotBlank
	private Double amount;
}
