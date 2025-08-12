package com.furniture.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.furniture.dao.UserDao;
import com.furniture.dto.SigninRequest;
import com.furniture.dto.SigninResponse;
import com.furniture.entity.User;
import com.furniture.exception.ResourceNotFoundException;
import com.furniture.security.JwtUtils;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/authusers")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

	private final JwtUtils jwtUtils;
	private final AuthenticationManager authenticationManager;
	private final UserDao userDao;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid SigninRequest request) {
		System.out.println("Attempting to sign in: " + request.getEmail());
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			User user;
			try {
				user = userDao.findByAuthentication_Email(request.getEmail())
						.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
			} catch (ResourceNotFoundException e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			String jwtToken = jwtUtils.generateJwtToken(authentication, user.getCustomerId());
			System.out.println("Authentication successful for: " + request.getEmail());
			return ResponseEntity.ok(
				new SigninResponse(
					jwtToken,
					"Successful Authentication!",
					user.getCustomerId(),
					user.getAuthentication().getRole().toString()
				)
			);
		} catch (AuthenticationException e) {
			System.out.println("Authentication failed: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		}
	}
}