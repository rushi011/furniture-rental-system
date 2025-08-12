package com.furniture.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.furniture.dao.UserDao;
import com.furniture.dto.UpdateUserDto;
import com.furniture.entity.User;
import com.furniture.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserDao customerDao;
	private final PasswordEncoder passwordEncoder;

	@Override
	public List<User> getAllCustomer() {

		return customerDao.findAll();
	}

	@Override
	public String addCustomer(User user) {
		try {
			if (user.getAuthentication() == null) {
				throw new RuntimeException("Authentication details are missing");
			}

			if (user.getEmail() == null) {
				throw new RuntimeException("Email cannot be null");
			}

			// Set required fields in the Auth object
			user.getAuthentication().setEmail(user.getEmail());
			user.getAuthentication().setPassword(passwordEncoder.encode(user.getAuthentication().getPassword()));

			customerDao.save(user);
			return "User Added Successfully";
		} catch (Exception e) {
			throw new RuntimeException("Failed to add user: " + e.getMessage(), e);
		}
	}

	@Override
	public User updateCustomer(Long customerId, UpdateUserDto dto) throws ResourceNotFoundException {
		User user = customerDao.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found" + customerId));
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setPhone(dto.getPhone());
		user.setAddress(dto.getAddress());
		return customerDao.save(user);
	}

	@Override
	public User getCustomerById(Long id) throws ResourceNotFoundException {

		return customerDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found by this id"));
	}

	@Override
	public void deleteCustomerById(Long id) {

		if (customerDao.existsById(id)) {// check if user exist
			customerDao.deleteById(id);
		} else {
			throw new RuntimeException("Customer not fount!!" + id);
		}
	}

}
