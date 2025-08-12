package com.furniture.dao;

import com.furniture.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDao extends JpaRepository<Payment, Long> {

	// Spring Data JPA will automatically create the query for this method
	// based on the method name. It will find a Payment by its razorpayOrderId
	// field.
	Payment findByRazorpayOrderId(String orderId);
}