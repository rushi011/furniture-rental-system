package com.furniture.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.furniture.dto.UpdateUserDto;
import com.furniture.entity.User;
import com.furniture.exception.ResourceNotFoundException;
import com.furniture.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

	@Autowired
	private UserService customerService;

	@GetMapping("/getallusers")
	public ResponseEntity<?> getAllCustomer() {
		return ResponseEntity.status(HttpStatus.OK).body(customerService.getAllCustomer());
	}

//	register customer
	@PostMapping("/register")
	public ResponseEntity<?> addCustomer(@RequestBody User customer) {

		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.addCustomer(customer));

	}

//	fetch details by id
	@GetMapping("/getbyid/{id}")
	public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
		try {
			return ResponseEntity.ok(customerService.getCustomerById(id));
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
		}
	}

	@PutMapping("/update/{customerId}")
	public ResponseEntity<?> updateCustomer(@PathVariable Long customerId, @RequestBody UpdateUserDto dto) {
		User updatedCust;
		try {
			updatedCust = customerService.updateCustomer(customerId, dto);
			return ResponseEntity.ok(updatedCust);
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
		}

	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteCustomerById(@PathVariable Long id) {

		customerService.deleteCustomerById(id);
		return ResponseEntity.ok("Customer deleted successfully!!");

	}
}
