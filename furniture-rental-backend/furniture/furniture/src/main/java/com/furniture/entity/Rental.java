package com.furniture.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rentals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rental {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rentalId;

    private LocalDate rentalDate;
    private LocalDate returnDate;
    private Double totalAmount;

    @ManyToOne
//    @JoinColumn(name = "customer_id")
    private User customer;


}
