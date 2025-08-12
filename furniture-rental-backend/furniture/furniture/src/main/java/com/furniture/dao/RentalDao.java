package com.furniture.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.furniture.entity.Rental;

public interface RentalDao extends JpaRepository<Rental, Long> {

}
