package com.furniture.service;

import java.util.List;

import com.furniture.dto.RentalDto;
import com.furniture.entity.Rental;
import com.furniture.entity.User;
import com.furniture.exception.CustomerNotFoundException;

public interface RentalService {

	String addRental(Rental rental, User customer) throws CustomerNotFoundException;

	List<Rental> getAllRentals();

	Rental getById(Long id) ;

	String updateRental(Long id, RentalDto dto) throws CustomerNotFoundException;

	boolean deleteById(Long id);

}
