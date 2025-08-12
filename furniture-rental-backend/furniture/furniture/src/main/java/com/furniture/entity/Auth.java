package com.furniture.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "authentications")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Auth {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "authentication_id",nullable =false)
	private Long id;
	

	@Column(length = 50,nullable =false)
	private String email;
	
	@Column(length = 300,nullable =false)
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Role role; 
}
