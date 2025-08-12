package com.furniture.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.furniture.entity.Auth;

public interface AuthenticationDao extends JpaRepository<Auth, Long> {

	Optional<Auth> findByEmail(String email);

}
