
package com.furniture.controller;

import java.util.List;
import java.util.stream.Collectors;

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

import com.furniture.dto.RentalDto;
import com.furniture.entity.Rental;
import com.furniture.entity.User;
import com.furniture.exception.CustomerNotFoundException;
import com.furniture.service.RentalService;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class RentalController {

	@Autowired
	private RentalService rentalService;

	@GetMapping("/test")
	public ResponseEntity<String> test() {
		return ResponseEntity.ok("RentalController is active!");
	}

	@PostMapping("/addrental")
	public ResponseEntity<?> addRental(@RequestBody Rental rental) {
		User customer = rental.getCustomer();
		System.out.println("Received rental POST: " + rental);
		if (customer != null) {
			System.out.println("Received customerId: " + customer.getCustomerId());
		} else {
			System.out.println("No customer object received in rental POST");
		}
		if (customer != null && customer.getCustomerId() != null) {
			try {
				return ResponseEntity.status(HttpStatus.CREATED).body(rentalService.addRental(rental, customer));
			} catch (CustomerNotFoundException e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error: Invalid customer data. Please ensure 'customerId' is provided and not null.");
		}
	}

	@GetMapping("/allrentals")
	public ResponseEntity<?> getAllRental() {
		return ResponseEntity.ok(rentalService.getAllRentals());
	}

	@GetMapping("/getbyid/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {

		try {
			return ResponseEntity.ok(rentalService.getById(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
		}

	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateById(@PathVariable Long id, @RequestBody RentalDto dto) {
		try {
			String message = rentalService.updateRental(id, dto);
			return ResponseEntity.ok().body(message);
		} catch (CustomerNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
		}

	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
		boolean isDeleted = rentalService.deleteById(id);
		if (isDeleted)
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Rental Deleted Successfully!!");
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rental not availaible with id " + id);
	}

	@GetMapping("/customer/{customerId}")
	public ResponseEntity<?> getRentalsByCustomerId(@PathVariable Long customerId) {
		try {
			List<Rental> all = rentalService.getAllRentals();
			List<Rental> filtered = all.stream().filter(r -> r.getCustomer() != null
					&& r.getCustomer().getCustomerId() != null && r.getCustomer().getCustomerId().equals(customerId))
					.collect(Collectors.toList());
			return ResponseEntity.ok(filtered);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
		}
	}
}
