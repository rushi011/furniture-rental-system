package com.furniture.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private Double amountPaid;
    private LocalDate paymentDate;

    @Column(length = 50)
    private String method; // e.g., "Card", "UPI"

    @Column(length = 50)
    private String status; // Our new field for "SUCCESS" or "FAILURE"

    @ManyToOne
    private Rental rental;

    // Fields for Razorpay
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}