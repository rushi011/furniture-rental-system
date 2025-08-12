package com.furniture.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@EnableWebSecurity
@Configuration
@AllArgsConstructor
public class SecurityConfig {
	
	private final CustomJwtAuthenticationFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
	{
		http.csrf(customizer -> customizer.disable()) //Disable csrf protection
		.authorizeHttpRequests(request -> request
		       .requestMatchers(
			       "/authusers/signin",
			       "/furnitures/getallfurnitures",
			       "/user/register",
			       "/user/getbyid",
			       "/furnitures/getbyid",
			       "/furnitures/getbycategory",
			       "/furnitures/getallfurnitures",
			       "/api/rentals/**",
			       "/api/payments/**",
			       "/api/reviews/**",
			       "/api/categories/getbyid",
			       "/v*/api-doc*/**", 
			       "/swagger-ui/**", 
			       "/v**/api-docs/**"
			       )
		       .permitAll()
				.requestMatchers(HttpMethod.OPTIONS)
				.permitAll()
				.requestMatchers(
						"/user/update",
						"/payments/addpayment",
						"/api/favorites/add",
						"/api/favorites/remove",
						"/api/favorites"
						)
				.hasRole("USER") // Ensure that 'ROLE_USER' is checked
				.requestMatchers(
						"/user/getallusers",
						"/user/delete",
						"/furnitures/addfurniture",
						"/furnitures/delete",
						"/furnitures/update",
						"/furnitures/furnitures",
//						"/furnitures/updateamt",
						"/api/rentals/getbyid",
						"/api/rentals/update",
						"/api/rentals/delete",
						"/payments/getallpayments",
						"/payments/update",
						"/payments/delete",
						"/payments/rental",
						"/api/categories",
						"/api/categories/update",
						"/api/categories/delete",
						"/api/favorites/user",
						"/api/favorites/isFavorite")
				.hasRole("ADMIN") // Ensure that 'ROLE_ADMIN' is checked
				.anyRequest()
				.authenticated() // All other requests require authentication
				)
		// Stateless session management (since you're using JWT)
		.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		// Add JWT filter before the username-password filter
		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
		
	}
	
	// configure AuthMgr as a spring bean
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}

}
