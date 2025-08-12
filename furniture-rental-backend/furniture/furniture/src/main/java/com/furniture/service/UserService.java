package com.furniture.service;

import java.util.List;

import com.furniture.dto.UpdateUserDto;
import com.furniture.entity.User;
import com.furniture.exception.ResourceNotFoundException;

public interface UserService {

	List<User> getAllCustomer();

	String addCustomer(User customer);

	User updateCustomer(Long customerId, UpdateUserDto dto) throws ResourceNotFoundException;

	User getCustomerById(Long id) throws ResourceNotFoundException;

	void deleteCustomerById(Long id);

}
