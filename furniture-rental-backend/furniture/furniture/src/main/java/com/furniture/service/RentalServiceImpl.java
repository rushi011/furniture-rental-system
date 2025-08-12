package com.furniture.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.furniture.dao.RentalDao;
import com.furniture.dao.UserDao;
import com.furniture.dto.RentalDto;
import com.furniture.entity.Rental;
import com.furniture.entity.User;
import com.furniture.exception.CustomerNotFoundException;

@Service
@Transactional
public class RentalServiceImpl implements RentalService {

	@Autowired
	private RentalDao rentalDao;

	@Autowired
	private UserDao customerDao;

	@Override
	public String addRental(Rental rental, User customer) throws CustomerNotFoundException {
		if (customer.getCustomerId() != null) {
			System.out.println("Adding rental for customer: " + customer.getCustomerId());
			customer = customerDao.findById(customer.getCustomerId())
				.orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
			rental.setCustomer(customer);
			rentalDao.save(rental);
			System.out.println("Rental and rental items saved for customer: " + customer.getCustomerId());
			return "rental added successfully!!";
		}
		return "something went wrong";
	}

	@Override
	public List<Rental> getAllRentals() {

		return rentalDao.findAll();
	}

	@Override
	public Rental getById(Long id) {
		Rental rental = rentalDao.findById(id).orElseThrow(() -> new RuntimeException("Rental not found"));

		return rental;
	}

	@Override
	public String updateRental(Long id, RentalDto dto) throws CustomerNotFoundException {
		Rental existingRental = rentalDao.findById(id)
				.orElseThrow(() -> new RuntimeException("Rental not found with id" + id));

		existingRental.setRentalDate(dto.getRentalDate());
		existingRental.setReturnDate(dto.getReturnDate());
		existingRental.setTotalAmount(dto.getTotalAmount());

		if (dto.getCustomer() != null && dto.getCustomer().getCustomerId() != null) {
			User customer = customerDao.findById(dto.getCustomer().getCustomerId()).orElseThrow(
					() -> new CustomerNotFoundException("Customer not found with ID: " + dto.getCustomer().getCustomerId()));
			existingRental.setCustomer(customer);
		}
		rentalDao.save(existingRental);
		return "Rental updated successfully for ID" + id;
	}

	@Override
	public boolean deleteById(Long id) {
		if (rentalDao.existsById(id)) {
			rentalDao.deleteById(id);
			return true;
		}
		return false;

	}
}
