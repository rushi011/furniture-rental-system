package com.furniture.service;

import com.furniture.entity.Payment;

public interface PaymentService {

	Payment savePayment(Payment payment);

	boolean verifySignature(String orderId, String paymentId, String signature);

	void updatePaymentStatus(String orderId, String status);
}