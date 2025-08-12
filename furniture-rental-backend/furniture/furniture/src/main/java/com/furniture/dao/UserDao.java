package com.furniture.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.furniture.entity.User;

public interface UserDao extends JpaRepository<User, Long> {

	Optional<User> findByAuthentication_Email(String email);

}
