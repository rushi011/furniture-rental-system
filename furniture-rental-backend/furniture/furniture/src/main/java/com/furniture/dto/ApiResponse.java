package com.furniture.dto;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ApiResponse {

	private LocalDateTime timeStamp;
	private String message;
	private HttpStatus statusCode;

	public ApiResponse(String message, HttpStatus statusCode) {
		super();
		this.message = message;
		this.timeStamp = LocalDateTime.now();
		this.statusCode = statusCode;
	}

}
